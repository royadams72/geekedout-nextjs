import { NextRequest, NextResponse } from "next/server";

import { saveSessionData } from "@/lib/redis/redis";

import { ensureBrowserSessionServerSide } from "../functions";

export async function POST(request: NextRequest) {
  try {
    const categoriesData = await request.json();
    const {
      state: {
        uiData: { sessionId },
      },
    } = categoriesData;
    const maxAttempts = 4;

    // for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (sessionId) {
      const { response } = ensureBrowserSessionServerSide(sessionId);
      await saveSessionData(sessionId, categoriesData);
      return response;
    }
    // }
    return NextResponse.json(
      { error: "Session ID is required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
