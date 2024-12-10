import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const checkSpotifyCookie = async (req: NextRequest): Promise<any> => {
  const requestCookie = req.cookies.get("spotify_token");

  if (isExpiredOrNull(requestCookie)) {
    console.log("Refreshing token");
    const response = await refreshToken();
    const cookieData = response.cookies.get("spotify_token");
    const cookieValue = parseAndGetToken(cookieData);

    return { cookieData, cookieValue };
  } else {
    const cookieValue = parseAndGetToken(requestCookie);
    console.log("Do not refresh cookie:::", cookieValue);
    return { cookieValue };
  }
};

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

const parseAndGetToken = (cookieData: any) => {
  const parsedToken = JSON.parse(cookieData.value);
  const { access_token: cookieValue } = parsedToken;
  return cookieValue;
};

const isExpiredOrNull = (cookie: any) => {
  const now = Date.now();

  if (!cookie || cookie?.value === "undefined" || cookie?.value === "null") {
    return true;
  } else if (cookie) {
    const tokenCookie = JSON.parse(cookie?.value);
    if (tokenCookie && tokenCookie?.access_token && tokenCookie?.expiry) {
      const { expiry } = tokenCookie;
      // console.log("expiry > now:::", expiry < now);
      if (expiry < now) {
        return true;
      }
    }
  }
  return false;
};
