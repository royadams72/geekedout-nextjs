import { NextRequest, NextResponse } from "next/server";
import { albumsArray, musicSliceMock } from "@/__mocks__/music.mocks";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;
  const album = albumsArray.filter((item) => {
    return item.id === id;
  });
  const data = {
    data: {
      data: {
        albums: musicSliceMock.music,
      },
    },
  };
  // console.log(data);
  return NextResponse.json(data, { status: 200 });
};
