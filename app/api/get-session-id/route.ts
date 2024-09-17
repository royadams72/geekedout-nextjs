import { NextRequest, NextResponse } from "next/server";
import { getSessionIdFromCookie } from "../get-set-data/functions";

export async function GET(request: NextRequest) {
  const sessionId = getSessionIdFromCookie();
  return NextResponse.json({ sessionId });
}
