import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/utils/error";
import {
  checkSpotifyCookie,
  setCookieString,
} from "@/lib/utils/api/music/getToken";
import { CategoryType } from "@/types/enums/category-type.enum";

let cachedData = null;
let lastUpdated = 0;
export const getApi = async (
  url: string,
  apiName: string,
  req = {} as NextRequest
) => {
  const now = Date.now();
  let cookieData = null;
  let headers = {};
  const isMusicCategory = apiName === CategoryType.MUSIC;

  if (isMusicCategory) {
    cookieData = await checkSpotifyCookie(req);
    headers = { Authorization: `Bearer ${cookieData.access_token}` };
  }

  // if (!cachedData || now - lastUpdated > 120000) {
  // lastUpdated = now;
  console.log(`Fetching fresh data for ${apiName} ...`);
  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  const data = await response.json();
  const returndedData = data.albums || data.data || data;
  const res = NextResponse.json(returndedData, { status: 200 });

  if (isMusicCategory && cookieData.updated) {
    const cookieString = await setCookieString(cookieData);
    res?.headers.set("Set-Cookie", cookieString);
  }

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error.message || `${apiName} API error`
    );
  }
  return res;
  // } else {
  //   console.log(`Serving cached data...`);
  // }
};
