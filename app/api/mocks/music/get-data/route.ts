import { NextRequest, NextResponse } from "next/server";
import { musicSliceMock } from "@/__mocks__/music.mocks";
const data = {
  data: {
    albums: musicSliceMock.music,
  },
};
export const GET = async (req: NextRequest) => {
  // console.log(data);
  return NextResponse.json(data, { status: 200 });
};
