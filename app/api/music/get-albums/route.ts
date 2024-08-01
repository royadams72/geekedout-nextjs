import { BASE_URL_MUSIC } from "@/shared/constants/urls";

import { NextRequest } from "next/server";
import { getValidToken } from "@/app/api/music/token/getToken";

let token: string | null;
export const GET = async (req: NextRequest) => {
  const data = await getAllAlbums();
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAllAlbums = async () => {
  const token = await getValidToken();

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
