import { NextRequest, NextResponse } from "next/server";

import { checkSpotifyCookie } from "@/app/api/music/token/getToken";

import { ApiError } from "@/lib/utils/error";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const GET = async (req: NextRequest) => {
  const data = await getAllAlbums(req);
  return NextResponse.json(data, { status: 200 });
};

const getAllAlbums = async (req: NextRequest) => {
  const { cookieData, cookieValue } = await checkSpotifyCookie(req);

  try {
    const response = await fetch(
      `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieValue}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error.message || "music API error"
      );
    }
    const returnedData = { ...data.albums, cookieData };
    return returnedData;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting music data: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        { error: `Failed to fetch music data: ${error.message}` },
        { status: error.statusCode }
      );
    } else {
      console.error("Unexpected music API Error:", error);
      return NextResponse.json(
        { error: `Unexpected music API Error:: ${error}` },
        { status: 500 }
      );
    }
  }
};
