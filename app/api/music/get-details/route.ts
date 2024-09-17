import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest } from "next/server";
import { getValidToken, refreshToken } from "@/app/api/music/token/getToken";

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  const data = await getAlbumDetails(req, id);
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAlbumDetails = async (req: NextRequest, id: string) => {
  let token = await getValidToken(req);

  let response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    console.log("refreshing token=");

    const refreshResponse = await refreshToken();
    const refreshedTokenCookie = refreshResponse.cookies.get("spotify_token");
    if (refreshedTokenCookie) {
      token = JSON.parse(refreshedTokenCookie.value).token;
    }

    response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  const album = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch album details: ${album.error.message}`);
  }

  return album;
};
