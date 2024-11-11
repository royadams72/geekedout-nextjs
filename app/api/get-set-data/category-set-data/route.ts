// Set the maximum duration for the function
export const maxDuration = 60;

// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import { saveSessionData } from "@/lib/redis/redis";
import { ensureBrowserSessionServerSide } from "../functions";

// Define the POST handler
export async function POST(request: NextRequest) {
  // Set CORS headers
  const response = NextResponse.next();
  response.headers.set("Access-Control-Allow-Origin", "*"); // Replace '*' with your frontend's URL if not using '*'
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight OPTIONS request
  if (request.method === "OPTIONS") {
    return response;
  }

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

    const { response: sessionResponse } = await ensureBrowserSessionServerSide(
      sessionId
    );
    await saveSessionData(sessionId, categoriesData);

    // Merge the session response with the CORS headers
    sessionResponse.headers.set(
      "Access-Control-Allow-Origin",
      "https://geekedout-nextjs.vercel.app"
    );
    sessionResponse.headers.set(
      "Access-Control-Allow-Methods",
      "POST, OPTIONS"
    );
    sessionResponse.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    return sessionResponse;
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { message: `Failed to store data: ${error}` },
      { status: 500 }
    );
  }
}
