import { NextRequest, NextResponse } from "next/server";
import { saveSessionData } from "@/lib/redis/redis";
import { ensureBrowserSession } from "@/app/api/get-set-data/ensureBrowserSession";

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

    const { response: sessionResponse } = await ensureBrowserSession(sessionId);
    await saveSessionData(sessionId, categoriesData);

    return sessionResponse;
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
