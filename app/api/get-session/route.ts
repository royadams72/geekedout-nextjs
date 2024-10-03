import { NextResponse } from "next/server";
import { getSessionIdFromCookie } from "../get-set-data/functions";

export async function GET() {
  try {
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) {
      throw new Error("There was no sessionId found");
    }
    return NextResponse.json({ sessionId: sessionId || "" });
  } catch (error) {
    console.error(`There was an error requesting sessionId data:${error}`);
    throw error;
  }
}
