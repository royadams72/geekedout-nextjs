import { NextResponse } from "next/server";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

import { CategoryType } from "@/types/enums/category-type.enum";

export async function GET() {
  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_COMICS}/issues/?api_key=${ENV.COMIC_VINE_APIKEY}&limit=50&sort=date_added:desc&format=json`,
      CategoryType.COMICS
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`comics API Error: ${error.statusCode} - ${error.message}`);
      return NextResponse.json(
        `There was an error requesting comic data: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error("Unexpected Error comics API:", error);
      return NextResponse.json(`Unexpected Error comics API: ${error}`, {
        status: 500,
      });
    }
  }
}
