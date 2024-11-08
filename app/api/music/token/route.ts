// app/api/music/token/route.ts
import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export async function POST(req: NextRequest) {
  const now = Date.now();
  try {
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
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
      throw new Error("Failed to fetch token");
    }

    const data = await tokenResponse.json();
    const token = data.access_token;
    const expiry = now + data.expires_in * 1000;

    const response = NextResponse.json({ token, expiry });
    response.cookies.set("spotify_token", JSON.stringify({ token, expiry }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 1 / 86400,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
