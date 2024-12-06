import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/lib/actions/getCookie";
import { getCategoryByName, getItem } from "@/lib/redis/redis";
import { ApiError } from "@/utils/helpers";
import { checkSpotifyCookie } from "../../music/token/getToken";
import { CategoryType } from "@/shared/enums/category-type.enum";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("categoryName") as string;
  const id = searchParams.get("id");
  const sessionId = (await getCookie("sessionId")) as string;
  const { cookieData } = await checkSpotifyCookie(request);
  // console.log("cookieData in get route", cookieData);

  const addCookieIfMusic =
    categoryName === CategoryType.Music ? cookieData : undefined;

  try {
    let categoryData;
    if (id && categoryName) {
      categoryData = await getItem(sessionId, categoryName, id);
    } else {
      categoryData = await getCategoryByName(
        sessionId,
        categoryName,
        addCookieIfMusic
      );
    }

    if (!categoryData) {
      const data = await categoryData.json();
      throw new ApiError(
        categoryData.status,
        data.error.message || "category data API error"
      );
    }

    return NextResponse.json(categoryData);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting category data: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        `There was an error requesting category data: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected Error category data API: ${error}`);
      return NextResponse.json(`Unexpected Error category data API: ${error}`, {
        status: 500,
      });
    }
  }
}
