import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const checkSpotifyCookie = async (req: NextRequest): Promise<any> => {
  const requestCookie = req.cookies.get("spotify_token");
  // console.log(requestCookie);

  if (isExpiredOrNull(requestCookie)) {
    const response = await refreshToken();
    const cookieData = response.cookies.get("spotify_token");
    // console.log("isExpiredOrNull:::", cookieData);
    const parsedToken = JSON.parse(cookieData.value);
    const { access_token: cookieValue } = parsedToken;

    return { cookieData, cookieValue };
  } else {
    const parsedToken = JSON.parse(requestCookie!.value);
    const { access_token: cookieValue } = parsedToken;
    console.log("Do not refresh cookie:::", cookieValue);
    return { cookieValue };
  }
};

// export const getValidToken = async (tokenCookie: any): Promise<any> => {
//   const response = await refreshToken();
//   const refreshedTokenCookie = response.cookies.get("spotify_token");

//   if (refreshedTokenCookie) {
//     try {
//       return refreshedTokenCookie;
//     } catch (error) {
//       throw new Error(
//         `Failed to retrieve a valid token after refresh refreshToken(): ${error}`
//       );
//     }
//   }
//   return response;
// };

export const refreshToken = async (): Promise<any> => {
  const now = Date.now();
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

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(
        `Failed to fetch token refreshToken(): ${error.error_description}`
      );
    }
    const { access_token, expires_in } = await tokenResponse.json();
    const expiry = now + expires_in * 1000;

    const response = NextResponse.json(
      { access_token, message: "Token set successfully" },
      { status: 200 }
    );

    response.cookies.set(
      "spotify_token",
      JSON.stringify({ access_token, expiry }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: expires_in,
        path: "/",
      }
    );
    return response;
  } catch (error) {
    throw new Error(`Failed to refresh token refreshToken(): ${error}`);
  }
};

const parseCookie = (cookieDate: any) => {
  // console.log("requestCookie in pareCookie", cookieDate);

  return JSON.parse(cookieDate!.value);
};

const isExpiredOrNull = (cookie: any) => {
  const tokenCookie = parseCookie(cookie);

  const now = Date.now();

  if (cookie?.value === "undefined" || cookie?.value === "null" || null) {
    return true;
  } else if (tokenCookie && tokenCookie?.access_token && tokenCookie?.expiry) {
    const { expiry } = tokenCookie;
    // console.log("expiry > now:::", expiry < now);

    if (expiry < now) {
      return true;
    }
  }
  return false;
};
