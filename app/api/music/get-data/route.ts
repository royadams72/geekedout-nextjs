import { NextRequest, NextResponse } from "next/server";

import {
  checkSpotifyCookie,
  setCookieString,
} from "@/app/api/music/token/getToken";

import { ApiError } from "@/lib/utils/error";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const GET = async (req: NextRequest) => {
  const cookieData = await checkSpotifyCookie(req);

  try {
    const response = await fetch(
      `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieData.access_token}`,
        },
      }
    );
    console.log(cookieData.access_token);

    const data = await response.json();
    const res = NextResponse.json(data.albums, { status: 200 });
    if (cookieData.updated) {
      const cookieString = await setCookieString(cookieData);
      res.headers.set("Set-Cookie", cookieString);
    }

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error.message || "music API error"
      );
    }

    return res;
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
