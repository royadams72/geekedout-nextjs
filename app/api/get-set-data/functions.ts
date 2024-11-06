import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;
const GET_SET_DATA_API = process.env.GET_SET_DATA_API;

export const getCategoryData = async (
  categoryName: string,
  id?: string | number
) => {
  const idString = id ? `&id=${id}` : "";
  const sessionId = getSessionIdFromCookie();
  // Edgecase: If somehow cookie is lost navigate to first page where the app automatically will put the sessionId back
  // TODO: Possibly add sessionId to session storage as well, on app init, as a fallback and only redirect if necessary
  if (!sessionId) {
    return { redirect: `${BASE_URL}/?redirected=true` };
  }
  try {
    const response = await fetch(
      `${BASE_URL}/${GET_SET_DATA_API}/category-get-data?categoryName=${categoryName}${idString}`,
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
      console.error(`HTTP error! Status: ${response.status}`);
      return NextResponse.json(
        { error: `HTTP error! Status: ${response.status}` },
        { status: 404 }
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const getSessionIdFromCookie = () => {
  const cookieHeader = cookies();
  const sessionId = cookieHeader.get("sessionId")?.value;
  return sessionId;
};

export const ensureBrowserSessionServerSide = async (
  existingSessionId?: string
) => {
  const sessionId = getSessionIdFromCookie();
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
