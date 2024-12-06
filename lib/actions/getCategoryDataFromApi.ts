import { NextResponse } from "next/server";

import { getCookie } from "@/lib/actions/getCookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_SET_DATA_API = process.env.NEXT_PUBLIC_GET_SET_DATA_API;

export const getCategoryDataFromApi = async (
  categoryName: string,
  id?: string | number
) => {
  const idString = id ? `&id=${id}` : "";
  const sessionId = await getCookie("sessionId");
  const spotify_token = await getCookie("spotify_token");
  // console.log("sessionId::::::::", sessionId);

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
        headers: {
          "Content-Type": "application/json",
          Cookie: `sessionId=${sessionId};spotify_token=${spotify_token}`,
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
    // console.log("getCat:", data);

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
