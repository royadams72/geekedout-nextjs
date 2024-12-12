import { NextRequest, NextResponse } from "next/server";

import {
  checkSpotifyCookie,
  setCookieString,
} from "@/lib/utils/api/music/getToken";
import { ApiError } from "@/lib/utils/error";
import { getMusic } from "@/lib/utils/api/music/getMusic";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const GET = async (req: NextRequest) => {
  try {
    const response = await getMusic(
      `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      req
    );

    console.log("getting details");
    return response;
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
