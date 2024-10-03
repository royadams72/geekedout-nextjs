import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest, NextResponse } from "next/server";
import { getValidToken, refreshToken } from "@/app/api/music/token/getToken";

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  const data = await getAlbumDetails(req, id);
  return NextResponse.json(data, { status: 200 });
};

const getAlbumDetails = async (req: NextRequest, id: string) => {
  let token = await getValidToken(req);
  let response = await fetchAlbum(id, token);

  if (response.status === 401) {
    const refreshResponse = await refreshToken();
    const refreshedTokenCookie = refreshResponse.cookies.get("spotify_token");

    if (refreshedTokenCookie) {
      try {
        token = JSON.parse(refreshedTokenCookie.value).token;
      } catch (error) {
        throw new Error("Invalid token format in refreshed token");
      }
    } else {
      throw new Error("Failed to refresh token");
    }

    response = await fetchAlbum(id, token);
  }
  const album = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch album details: ${album.error.message}`);
  }

  return album;
};

const fetchAlbum = async (id: string, token: string) => {
  const res = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};
