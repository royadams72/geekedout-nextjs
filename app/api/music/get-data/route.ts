import { NextRequest, NextResponse } from "next/server";

import { CategoryType } from "@/types/enums/category-type.enum";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

export const GET = async (req: NextRequest) => {
  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_MUSIC}/browse/new-releases?limit=20&country=GB`,
      CategoryType.MUSIC,
      req
    );

    // const data = await response.json();
    // return NextResponse.json(data, { status: 200 });
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
