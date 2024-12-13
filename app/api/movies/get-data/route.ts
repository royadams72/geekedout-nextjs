import { NextResponse } from "next/server";
import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/lib/utils/api/getApi";
import { CategoryType } from "@/types/enums/category-type.enum";

const pageNum = "1";
const API_KEY = process.env.MOVIES_APIKEY;
const BASE_URL_MOVIES = process.env.BASE_URL_MOVIES;

export async function GET() {
  try {
    const response = await getApi(
      `${BASE_URL_MOVIES}/now_playing?api_key=${API_KEY}&language=en-GB&pageNum=${pageNum}&region=GB`,
      CategoryType.MOVIES
    );

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
