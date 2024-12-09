import { NextRequest, NextResponse } from "next/server";
import { checkSpotifyCookie } from "@/app/api/music/token/getToken";
import { ApiError } from "@/lib/utils/error";

const BASE_URL_MUSIC = process.env.BASE_URL_MUSIC;

export const POST = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  const data = await getAlbumDetails(req, id);
  return NextResponse.json(data, { status: 200 });
};

const getAlbumDetails = async (req: NextRequest, id: string) => {
  let response: any;

  const { cookieData, cookieValue } = await checkSpotifyCookie(req);
  console.log("cookieData:", cookieValue);

  try {
    response = await fetchAlbum(id, cookieValue);

    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        data.error.message || "music details API error"
      );
    }

    const returnedData = { ...data, cookieData };
    // console.log("cookieData in returnes data", returnedData);

    return returnedData;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(
        `There was an error requesting music details: ${error.statusCode} - ${error.message}`
      );
      return NextResponse.json(
        { error: `Failed to fetch music details: ${error.message}` },
        { status: error.statusCode }
      );
    } else {
      console.error(`Unexpected music details API Error: ${error}`);
      return NextResponse.json(
        { error: `Unexpected music API details Error: ${error}` },
        { status: 500 }
      );
    }
  }
};

const fetchAlbum = async (id: string, cookieValue: string) => {
  const res = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookieValue}`,
    },
  });

  return res;
};
