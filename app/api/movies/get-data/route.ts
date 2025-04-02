import { NextResponse } from "next/server";

import { ApiError } from "@/lib/utils/error";

import { ENV } from "@/lib/services/envService";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

import { CategoryType } from "@/types/enums/category-type.enum";

const pageNum = "1";

export async function GET() {
  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_MOVIES}/now_playing?api_key=${ENV.MOVIES_APIKEY}&language=en-GB&pageNum=${pageNum}&region=GB`,
      CategoryType.MOVIES
    );

    // const data = await response.json();
    // return NextResponse.json(data, { status: 200 });
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting movies data: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        `There was an error requesting movies data: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected Error movies API: ${error}`);
      return NextResponse.json(`Unexpected Error movies API: ${error}`, {
        status: 500,
      });
    }
  }
}
