import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/app/api/getApi";
import { CategoryType } from "@/types/enums/category-type.enum";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const GET = async (req: NextRequest) => {
  // console.log("revalidating in music");
  try {
    const response = await getApi(
      `${BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      CategoryType.MUSIC,
      req
    );

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
