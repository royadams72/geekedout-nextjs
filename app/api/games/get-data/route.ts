import { NextResponse } from "next/server";
import { ApiError } from "@/utils/helpers";

const BASE_URL_GAMES = process.env.BASE_URL_GAMES as string;

export async function GET() {
  try {
    const res = await fetch(BASE_URL_GAMES);
    const data = await res.json();

    if (!res.ok) {
      console.error(`Failed to fetch games: ${data.error.message}`);
      throw new ApiError(res.status, data.error.message || "API error");
    }
    return NextResponse.json(data, { status: 200 });
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
