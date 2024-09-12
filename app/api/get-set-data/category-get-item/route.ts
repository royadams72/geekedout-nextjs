// app/api/fetch-category/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  getCategoryByNameFromCache,
  getItemFromCache,
} from "@/lib/redis/redis";

import { generateSessionId, getSessionIdFromCookie } from "../functions";

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

  let sessionId = getSessionIdFromCookie();
  console.log("sessionId in get data ===", sessionId);
  // TODO create function for this
  if (!sessionId) {
    sessionId = generateSessionId();
    const response = NextResponse.json({
      message: "Session created and data retrieved from get data",
    });
    response.cookies.set("sessionId", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax", // Ensures the cookie is sent with cross-site requests
      secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
    });
    return response;
  }

  try {
    const categoryData = await getItemFromCache(
      sessionId,
      categoryName,
      id as string | number
    );

    if (!categoryData) {
      return NextResponse.json(
        { error: "No data found for the category" },
        { status: 404 }
      );
    }

    return NextResponse.json(categoryData);
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return NextResponse.json(
      { error: "Failed to retrieve category data" },
      { status: 500 }
    );
  }
}
