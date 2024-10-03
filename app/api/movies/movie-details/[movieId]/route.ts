import { NextRequest, NextResponse } from "next/server";

import { BASE_URL_MOVIES } from "@/shared/constants/urls";

const api_key = process.env.MOVIES_APIKEY;

export async function GET(
  request: NextRequest,
  {
    params: { movieId },
  }: {
    params: { movieId: string };
  }
) {
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
      throw new Error(`Failed to fetch movie details: ${data.error.message}`);
    }
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`There has been an error fetching movie data: ${error}`);

    return NextResponse.json(
      { error: `Failed to fetch movie data: ${error}` },
      { status: 500 }
    );
  }
}
