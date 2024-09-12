import { cookies } from "next/headers";

import { v4 as uuidv4 } from "uuid";

import { appConfig } from "@/shared/constants/appConfig";

export const getCategoryData = async (categoryName: string) => {
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/api/get-set-data/category-get-data?categoryName=${categoryName}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionId=${getSessionIdFromCookie()}`,
        },
      }
    );
    console.log("getSessionIdFromCookie()=====", getSessionIdFromCookie());

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("getCategoryData()==", data);
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

export const generateSessionId = () => uuidv4();
