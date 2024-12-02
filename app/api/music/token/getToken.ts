import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getValidToken = async (tokenCookie: any): Promise<any> => {
  const now = Date.now();

  if (tokenCookie && tokenCookie?.value !== "undefined") {
    const { expiry } = JSON.parse(tokenCookie!.value);

    if (expiry > now) {
      return tokenCookie;
    }
  }

  const response = await refreshToken();
  const refreshedTokenCookie = response.cookies.get("spotify_token");

  if (refreshedTokenCookie) {
    try {
      return refreshedTokenCookie;
    } catch (error) {
      throw new Error(
        `Failed to retrieve a valid token after refresh refreshToken(): ${error}`
      );
    }
  }

  return response;
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
    const response = NextResponse.next();

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
