import { NextRequest, NextResponse } from "next/server";
import { createOrUpdateSession } from "../get-set-data/functions";

export async function GET(request: NextRequest) {
  const { sessionId, response } = createOrUpdateSession();
  return NextResponse.json({ sessionId, response });
}
