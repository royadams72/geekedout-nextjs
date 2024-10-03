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

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const { sessionId: returnedSessionId, response } =
      await ensureBrowserSessionServerSide(sessionId);

    if (response && response.status !== 200) {
      return response;
    }
    await saveSessionData(returnedSessionId as string, categoriesData);

    return NextResponse.json({ message: "Data saved successfully to redis" });
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
