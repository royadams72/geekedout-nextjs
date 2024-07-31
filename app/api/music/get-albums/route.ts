import { BASE_URL_MUSIC } from "@/shared/constants/urls";

import { NextRequest } from "next/server";

let token: string | null;
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  token = searchParams.get("token");
  const data = await getAllAlbums();
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAllAlbums = async () => {
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
