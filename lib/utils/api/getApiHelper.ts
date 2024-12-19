import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/lib/utils/error";
import {
  checkSpotifyCookie,
  setCookieString,
} from "@/lib/utils/api/music/getToken";
import { CategoryType } from "@/types/enums/category-type.enum";

export const getApiHelper = async (
  url: string,
  apiName: string,
  req = {} as NextRequest
) => {
  const revalidate = 300;
  const isMusicCategory = apiName === CategoryType.MUSIC;
  const isProduction = process.env.NODE_ENV === "production";
  const cacheControlStr = isProduction
    ? `s-maxage=300, stale-while-revalidate`
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

  const data = await response.json();

  const returndedData = data.albums || data.data || data;
  const res = NextResponse.json(returndedData, { status: 200 });
  // console.log(returndedData.games);

  // res?.headers.set("Cache-Control", cacheControlStr);
  if (isMusicCategory && cookieData.updated) {
    const cookieString = await setCookieString(cookieData);
    res?.headers.set("Set-Cookie", cookieString);
  }
  // console.log("headers", apiName, res?.headers);

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error.message || `${apiName} API error`
    );
  }
  return res;
};
