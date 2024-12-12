import { NextRequest } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const checkSpotifyCookie = async (req: NextRequest): Promise<any> => {
  const requestCookie = req.cookies.get("spotify_token");

  if (isExpiredOrNull(requestCookie)) {
    const cookieData = await refreshToken();
    console.log("refreshing token:", { ...cookieData, updated: true });
    return { ...cookieData, updated: true };
  } else {
    const access_token = parseAndGetToken(requestCookie);
    const cookieData = {
      access_token,
      updated: false,
    };

    return cookieData;
  }
};

export const refreshToken = async (): Promise<any> => {
  try {
    const tokenResponse = await fetch(
      `https://accounts.spotify.com/api/token`,
      {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }),
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${clientID}:${clientSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const response = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error(
        `Failed to fetch token refreshToken(): ${response.error_description}`
      );
    }

    return response;
  } catch (error) {
    throw new Error(`Failed to refresh token refreshToken(): ${error}`);
  }
};

const parseAndGetToken = (cookieData: any) => {
  const parsedToken = JSON.parse(cookieData.value);
  const { access_token } = parsedToken;
  return access_token;
};

const isExpiredOrNull = (cookie: any) => {
  const now = Date.now();

  if (!cookie || cookie?.value === "undefined" || cookie?.value === "null") {
    return true;
  } else if (cookie) {
    const tokenCookie = JSON.parse(cookie?.value);
    if (tokenCookie && tokenCookie?.access_token && tokenCookie?.expiry) {
      const { expiry } = tokenCookie;

      if (expiry < now) {
        return true;
      }
    }
  }
  return false;
};

export const setCookieString = async (cookieData: any) => {
  const now = Date.now();
  const { access_token, expires_in } = cookieData;
  const expiry = now + expires_in * 1000;
  const expiryDate = new Date(expiry).toUTCString();
  const cookieValue = encodeURIComponent(
    JSON.stringify({
      access_token,
      expiry,
    })
  );

  const cookieString = `spotify_token=${cookieValue}; Path=/; Expires=${expiryDate}; Max-Age=${expires_in}; HttpOnly; ${
    process.env.NODE_ENV === "production" ? "Secure;" : ""
  }`;

  return cookieString;
};
