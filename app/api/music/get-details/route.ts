import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/lib/utils/api/getApi";
import { CategoryType } from "@/types/enums/category-type.enum";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  try {
    const response = await getApi(
      `${BASE_URL_MUSIC}/albums/${id}`,
      CategoryType.MUSIC,
      req
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
