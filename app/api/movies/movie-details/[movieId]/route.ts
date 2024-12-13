import { NextRequest, NextResponse } from "next/server";

import { CategoryType } from "@/types/enums/category-type.enum";

import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/lib/utils/api/getApi";

const API_KEY = process.env.MOVIES_APIKEY;
const BASE_URL_MOVIES = process.env.BASE_URL_MOVIES;

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
    const response = await getApi(
      `${BASE_URL_MOVIES}/${movieId}?api_key=${API_KEY}&language=en-GB&region=GB`,
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
