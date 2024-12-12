import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/utils/error";
import { getMusic } from "@/lib/utils/api/music/getMusic";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  try {
    const response = await getMusic(
      `${BASE_URL_MUSIC}/albums/${id}`,
      req,
      true
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting music details: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        { error: `Failed to fetch music details: ${error.message}` },
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected music details API Error: ${error}`);
      return NextResponse.json(
        { error: `Unexpected music API details Error: ${error}` },
        { status: 500 }
      );
    }
  }
};
