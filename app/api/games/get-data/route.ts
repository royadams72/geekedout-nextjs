import { NextResponse } from "next/server";
import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/app/api/getApi";
import { CategoryType } from "@/types/enums/category-type.enum";

const BASE_URL_GAMES = process.env.BASE_URL_GAMES as string;

export async function GET() {
  // console.log("revalidating in games");
  try {
    const response = await getApi(BASE_URL_GAMES, CategoryType.GAMES);

    return response;
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
