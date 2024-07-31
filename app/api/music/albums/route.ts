// "use server";

import { getAllAlbums } from "@/lib/features/music/musicSlice";
import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest, NextResponse } from "next/server";
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let token: string;
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action") as string;
  const id = searchParams.get("id") || null || undefined;
  const data = await handleAlbums(action, id);
  return new Response(JSON.stringify({ data }), { status: 200 });
};
export const handleAlbums = async (action: string, id?: string) => {
  const getToken = async (): Promise<string> => {
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
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
    const data = await response.json();
    token = data.access_token;
    return data.access_token;
  };

  const getAllAlbums = async () => {
    const token = await getToken();

    const response = await fetch(
      `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw { status: response.status, ...data }; // Properly handle error with status
    }

    return data;
  };

  const getAlbumDetails = async (id: any) => {
    const token = await getToken();
    console.log();

    const response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const album = await response.json();

    if (!response.ok) {
      throw { status: response.status, ...album }; // Properly handle error with status
    }

    return album;
  };

  if (action === "getAll") {
    return await getAllAlbums();
  } else if (action === "getDetails" && id) {
    const data = await getAlbumDetails(id);
    console.log(data);

    return data;
  }
};
