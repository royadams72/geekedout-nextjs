import { NextRequest, NextResponse } from "next/server";

import { saveSessionData } from "@/lib/redis/redis";

import { createOrUpdateSession, getSessionIdFromCookie } from "../functions";

export async function POST(request: NextRequest) {
  const existingSessionId = getSessionIdFromCookie();
  const { sessionId, response } = createOrUpdateSession(existingSessionId);
  console.log("sessionId in set data ===", sessionId);

  try {
    const { sessionId: payloadSessionId, ...categoriesData } =
      await request.json();
    if (!categoriesData) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    await saveSessionData(payloadSessionId || sessionId, categoriesData);
    return response;
    // return NextResponse.json(categoriesData);
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
