import { NextRequest, NextResponse } from "next/server";

import { CategoryType } from "@/types/enums/category-type.enum";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ movieId: string }>;
  }
) {
  const { movieId } = await params;
  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_MOVIES}/${movieId}?api_key=${ENV.MOVIES_APIKEY}&language=en-GB&region=GB`,
      CategoryType.MOVIES
    );

    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting movies details: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        `There was an error requesting movies details: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected Error movies details API: ${error}`);
      return NextResponse.json(
        `Unexpected Error movies details API: ${error}`,
        {
          status: 500,
        }
      );
    }
  }
}
