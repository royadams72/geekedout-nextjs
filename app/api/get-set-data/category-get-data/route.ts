import { NextRequest, NextResponse } from "next/server";
import { getSessionId } from "../ensureBrowserSession";
import {
  getCategoryByNameFromCache,
  getItemFromCache,
  getSessionData,
} from "@/lib/redis/redis";
import { ApiError } from "@/utils/helpers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("categoryName") as string;
  const id = searchParams.get("id");
  const getAll = searchParams.get("getAll");
  const sessionId = (await getSessionId()) as string;

  try {
    let categoryData;
    if (getAll) {
      categoryData = await getSessionData(sessionId);
    } else if (id && categoryName) {
      categoryData = await getItemFromCache(sessionId, categoryName, id);
    } else {
      categoryData = await getCategoryByNameFromCache(sessionId, categoryName);
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
