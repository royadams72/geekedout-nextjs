import { NextRequest, NextResponse } from "next/server";
import {
  checkSpotifyCookie,
  setCookieString,
} from "@/app/api/music/token/getToken";
import { ApiError } from "@/lib/utils/error";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const POST = async (req: NextRequest) => {
  let response: any;
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const cookieData = await checkSpotifyCookie(req);

  try {
    response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cookieData.access_token}`,
      },
    });

    const data = await response.json();
    const res = NextResponse.json(data, { status: 200 });

    if (cookieData.updated) {
      console.log("cookieData.updated:", cookieData.updated);
      const cookieString = await setCookieString(cookieData);
      res.headers.set("Set-Cookie", cookieString);
    }
    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error.message || "music details API error"
      );
    }

    return res;
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
