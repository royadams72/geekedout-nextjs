import { NextRequest, NextResponse } from "next/server";

import { saveSessionData } from "@/lib/redis/redis";

import { getSessionIdFromCookie, generateSessionId } from "../functions";

export async function POST(request: NextRequest) {
  try {
    let sessionId = getSessionIdFromCookie();
    console.log("sessionId in store cat==", sessionId);

    if (!sessionId) {
      sessionId = generateSessionId();
      const response = NextResponse.json({
        message: "Session created and data retrieved from get store",
      });
      response.cookies.set("sessionId", sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax", // Ensures the cookie is sent with cross-site requests
        secure: process.env.NODE_ENV === "production", // Ensure cookies are secure in production
      });
      return response;
    }

    const categoriesData = await request.json();

    await saveSessionData(sessionId, categoriesData);

    return NextResponse.json({
      message: "Categories data stored successfully",
    });
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
