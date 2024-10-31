import { NextResponse } from "next/server";
import { BASE_URL_MOVIES } from "@/shared/constants/urls";
import { ApiError } from "@/utils/helpers";

const pageNum = "1";
const api_key = process.env.MOVIES_APIKEY;

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL_MOVIES}/now_playing?api_key=${api_key}&language=en-GB&pageNum=${pageNum}&region=GB`
    );
    const data = await response.json();

    if (!response.ok) {
      console.error("No data found movies GET");
      throw new ApiError(
        response.status,
        data.error.message || "movies API error"
      );
    }

    return NextResponse.json(data, { status: 200 });
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
