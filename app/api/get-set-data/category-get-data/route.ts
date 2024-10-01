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
  // console.log("categoryData===", getAll);
  // if (!categoryName) {
  //   return NextResponse.json(
  //     { error: "Category name is required" },
  //     { status: 400 }
  //   );
  // }
  const sessionId = getSessionIdFromCookie() as string;
  try {
    let categoryData = getAll
      ? await getSessionData(sessionId)
      : id
      ? await getItemFromCache(sessionId, categoryName as string, id)
      : await getCategoryByNameFromCache(sessionId, categoryName as string);

    if (!categoryData) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    // console.log("categoryData===", categoryData);
    return NextResponse.json(categoryData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    return NextResponse.json(
      { error: "Failed to retrieve data" },
      { status: 500 }
    );
  }
}
