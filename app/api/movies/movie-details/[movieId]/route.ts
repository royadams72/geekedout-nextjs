import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/utils/helpers";

const api_key = process.env.MOVIES_APIKEY;
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
    const response = await fetch(
      `${BASE_URL_MOVIES}/${movieId}?api_key=${api_key}&language=en-GB&region=GB`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error.message || "movies details API error"
      );
    }

    return NextResponse.json(data, { status: 200 });
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
