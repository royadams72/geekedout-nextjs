import { NextResponse } from "next/server";
import { BASE_URL_MOVIES } from "@/shared/constants/urls";

const pageNum = "1";
const api_key = process.env.MOVIES_APIKEY;

export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL_MOVIES}/now_playing?api_key=${api_key}&language=en-GB&pageNum=${pageNum}&region=GB`
    );
    const data = await response.json();
    console.log("movies:", data);
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${data.error.message}`);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error(`There has been an error fetching movies data: ${error}`);

    return NextResponse.json(
      { error: `Failed to fetch movies data: ${error}` },
      { status: 500 }
    );
  }
}
