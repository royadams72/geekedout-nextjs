import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { v4 as uuidv4 } from "uuid";

import { appConfig } from "@/shared/constants/appConfig";

export const getCategoryData = async (
  categoryName: string,
  id?: string | number
) => {
  const idString = id ? `&id=${id}` : "";
  const sessionId = getSessionIdFromCookie();
  // Edgecase: If somehow cookie is lost navigate to first page where the app automatically will put the sessionId into back
  // TODO: Possibly add sessionId to session storage, on app init, as a fallback and only redirect if necessary
  if (!sessionId) {
    return { redirect: `${appConfig.url.BASE_URL}/?redirected=true` };
  }
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/api/get-set-data/category-get-data?categoryName=${categoryName}${idString}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionId=${sessionId}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
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

export const ensureBrowserSession = (existingSessionId?: string) => {
  const sessionId = getSessionIdFromCookie();
  let response: any;

  if (!existingSessionId) {
    response = NextResponse.json({
      message: "Session undefined",
    });
    return response;
  }

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
      expires: new Date(Date.now() + 86400 * 1000),
    });
  }

  return { sessionId, response };
};
