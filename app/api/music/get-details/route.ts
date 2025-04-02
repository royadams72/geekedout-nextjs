import { NextRequest, NextResponse } from "next/server";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

import { CategoryType } from "@/types/enums/category-type.enum";

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_MUSIC}/albums/${id}`,
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
