import { BASE_URL_MUSIC } from "@/shared/constants/urls";

import { NextRequest } from "next/server";
import { getValidToken } from "@/app/api/music/token/getToken";

export const GET = async (req: NextRequest) => {
  const data = await getAllAlbums(req);
  // console.log(
  //   "spotify_token in GET getAllAlbums=============================",
  //   req.cookies.get("spotify_token")
  // );
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAllAlbums = async (req: NextRequest) => {
  const token = await getValidToken(req);

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
    throw new Error(`Failed to fetch albums: ${data.error.message}`);
  }

  return data;
};
