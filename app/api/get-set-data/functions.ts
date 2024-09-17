import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { v4 as uuidv4 } from "uuid";

import { appConfig } from "@/shared/constants/appConfig";

export const getCategoryData = async (
  categoryName: string,
  id?: string | number
) => {
  const idString = id ? `&id=${id}` : "";
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/api/get-set-data/category-get-data?categoryName=${categoryName}${idString}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionId=${getSessionIdFromCookie()}`,
        },
      }
    );

    // console.log("Getting data.....", `sessionId=${getSessionIdFromCookie()}`);
    console.log("Getting data.....", response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.categoryData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

export const getSessionIdFromCookie = () => {
  const cookieHeader = cookies();
  const sessionId = cookieHeader.get("sessionId")?.value;
  return sessionId;
};

export const createOrUpdateSession = (existingSessionId?: string) => {
  const sessionId = existingSessionId || uuidv4();
  const response = NextResponse.json({
    message: existingSessionId
      ? "Session already exists"
      : "Session created and data retrieved",
  });

  if (!existingSessionId) {
    response.cookies.set("sessionId", sessionId, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  console.log("sessionId in getSessionIdFromCookie() ===", sessionId);

  return { sessionId, response };
};
