import { NextResponse } from "next/server";

import { getSessionId } from "@/lib/actions/getSessionId";

export const ensureBrowserSession = async (existingSessionId?: string) => {
  const sessionId = await getSessionId();
  let response;

  if (!existingSessionId) {
    response = NextResponse.json({
      message: "Session undefined",
    });
  } else {
    response = NextResponse.json({
      message: sessionId
        ? "Session already exists"
        : "Session created and data retrieved",
    });

    if (!sessionId) {
      response.cookies.set("sessionId", existingSessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
    }
  }
  return { sessionId, response };
};
