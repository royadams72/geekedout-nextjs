import { NextResponse } from "next/server";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";
import { CategoryType } from "@/types/enums/category-type.enum";

export async function GET() {
  try {
    const response = await getApiHelper(ENV.BASE_URL_GAMES, CategoryType.GAMES);

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`games API Error: ${error.statusCode} - ${error.message}`);
      return NextResponse.json(
        `There was an error requesting games data: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected Error games API: ${error}`);
      return NextResponse.json(`Unexpected Error games API: ${error}`, {
        status: 500,
      });
    }
  }
}
