import { NextRequest, NextResponse } from "next/server";

import { ApiError } from "@/lib/utils/error";
import {
  checkSpotifyCookie,
  setCookieString,
} from "@/lib/utils/api/music/getToken";
import { ENV } from "@/lib/services/envService";

import { CategoryType } from "@/types/enums/category-type.enum";

export const getApiHelper = async (
  url: string,
  apiName: string,
  req = {} as NextRequest
) => {
  const isMusicCategory = apiName === CategoryType.MUSIC;
  const cacheControlStr =
    ENV.IS_PRODUCTION && !isMusicCategory
      ? `s-maxage100, stale-while-revalidate=60`
      : "no-store";
  let cookieData = null;
  let headers = {};

  if (isMusicCategory) {
    cookieData = await checkSpotifyCookie(req);
    headers = { Authorization: `Bearer ${cookieData.access_token}` };
  }

  const response = await fetch(url, {
    method: "GET",
    headers,
  });

  let data = {} as any;
  try {
    data = await response.json();
  } catch (e) {
    console.error("Error parsing JSON:", e);
    throw new ApiError(response.status, "Invalid JSON response from API");
  }

  const returndedData = data.albums || data.data || data;
  const res = NextResponse.json(returndedData, { status: 200 });

  res?.headers.set("Cache-Control", cacheControlStr);

  console.log(res?.headers.get("Cache-Control"));

  if (isMusicCategory && cookieData.updated) {
    const cookieString = await setCookieString(cookieData);
    res?.headers.set("Set-Cookie", cookieString);
  }

  if (!response.ok) {
    throw new ApiError(response.status, data.error || `${apiName} API error`);
  }
  return res;
};
