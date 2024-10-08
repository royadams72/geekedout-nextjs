import { NextRequest, NextResponse } from "next/server";
import { getSessionIdFromCookie } from "../functions";
import {
  getCategoryByNameFromCache,
  getItemFromCache,
  getSessionData,
} from "@/lib/redis/redis";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("categoryName") || undefined;
  const id = searchParams.get("id");
  const getAll = searchParams.get("getAll");
  const sessionId = getSessionIdFromCookie() as string;
  console.log(categoryName, id);

  try {
    let categoryData;
    if (getAll) {
      categoryData = await getSessionData(sessionId);
    } else if (id && categoryName) {
      categoryData = await getItemFromCache(
        sessionId,
        categoryName as string,
        id
      );
    } else {
      categoryData = await getCategoryByNameFromCache(
        sessionId,
        categoryName as string
      );
    }

    if (!categoryData) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    return NextResponse.json(categoryData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
