import { v4 as uuidv4 } from "uuid";

import cookie from "cookie";
import { NextRequest } from "next/server";

export const getSessionIdFromCookie = (request: NextRequest) => {
  const cookies = cookie.parse(request.headers.get("cookie") || "");
  console.log("getSessionIdFromCookie in cpmoing cookie==", cookies);

  return cookies.sessionId || null;
};

export const generateSessionId = () => uuidv4();
