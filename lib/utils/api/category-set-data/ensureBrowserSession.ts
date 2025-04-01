import { NextResponse } from "next/server";

import { getCookie } from "@/lib/actions/getCookie";

export const ensureBrowserSession = async (existingSessionId?: string) => {
  const sessionId = await getCookie("sessionId");
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

    if (!sessionId || sessionId !== existingSessionId) {
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
