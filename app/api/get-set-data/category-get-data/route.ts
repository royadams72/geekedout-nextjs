import { NextRequest, NextResponse } from "next/server";
import { getSessionIdFromCookie } from "../functions";
import {
  getCategoryByNameFromCache,
  getItemFromCache,
} from "@/lib/redis/redis";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categoryName = searchParams.get("categoryName");
  const id = searchParams.get("id");

  if (!categoryName) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }
  const sessionId = getSessionIdFromCookie() as string;
  try {
    const categoryData = id
      ? await getItemFromCache(sessionId, categoryName, id)
      : await getCategoryByNameFromCache(sessionId, categoryName);

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
