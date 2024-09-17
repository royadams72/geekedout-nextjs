import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getValidToken = async (req: NextRequest): Promise<any> => {
  const tokenCookie = req.cookies.get("spotify_token");
  const now = Date.now();
  console.log("getValidToken called========", req.cookies.get("spotify_token"));
  // Check if the token is cached in the cookie and is still valid
  if (tokenCookie) {
    const { token, expiry } = JSON.parse(tokenCookie.value);

    if (expiry > now) {
      console.log("Using cached token===", token);
      return token;
    }
  }

  const response = await refreshToken();
  const refreshedTokenCookie = response.cookies.get("spotify_token");

  if (refreshedTokenCookie) {
    const { token } = JSON.parse(refreshedTokenCookie.value);
    return token;
  }
  throw new Error("Failed to retrieve a valid token after refresh");
};

export const refreshToken = async (): Promise<any> => {
  const now = Date.now();
  const tokenResponse = await fetch(`https://accounts.spotify.com/api/token`, {
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
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.json();
    console.log(`Failed to fetch token: ${error.error_description}`);

    throw new Error(`Failed to fetch token: ${error.error_description}`);
  }

  const data = await tokenResponse.json();
  const token = data.access_token;
  const expiry = now + data.expires_in * 1000;

  const response = NextResponse.next();
  response.cookies.set("spotify_token", JSON.stringify({ token, expiry }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: data.expires_in,
    path: "/",
  });

  console.log(
    "New token stored in cookie===",
    response.cookies.get("spotify_token")
  );

  return response;
};
