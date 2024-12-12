import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../../error";
import { checkSpotifyCookie, setCookieString } from "./getToken";

export const getMusic = async (
  url: string,
  req: NextRequest,
  detailsRoute = false
) => {
  const cookieData = await checkSpotifyCookie(req);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieData.access_token}`,
    },
  });

  const data = await response.json();
  const returndedData = detailsRoute ? data : data.albums;
  console.log("returndedData:", returndedData);

  const res = NextResponse.json(returndedData, { status: 200 });

  if (cookieData.updated) {
    const cookieString = await setCookieString(cookieData);
    res.headers.set("Set-Cookie", cookieString);
  }
  if (!response.ok) {
    throw new ApiError(
      response.status,
      data.error.message || `music ${detailsRoute ? "details" : ""}API error`
    );
  }
  return res;
};
