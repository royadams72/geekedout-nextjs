import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest } from "next/server";

import { getValidToken } from "@/app/api/music/token/getToken";

let id: string | null;

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  id = searchParams.get("id") as string;

  const data = await getAlbumDetails(id);
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAlbumDetails = async (id: string) => {
  const token = await getValidToken();

  const response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const album = await response.json();
  console.log("getAlbumDetails============================album", album);
  if (!response.ok) {
    throw new Error(`Failed to fetch album details: ${album.error.message}`);
  }

  return album;
};
