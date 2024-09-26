import { NextResponse } from "next/server";
import { getSessionIdFromCookie } from "../get-set-data/functions";

export async function GET() {
  const sessionId = getSessionIdFromCookie(); // Call the shared function to get the cookie

  return NextResponse.json({ sessionId: sessionId || "" });
}
