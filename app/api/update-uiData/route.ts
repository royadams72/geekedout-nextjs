import { NextResponse } from "next/server";
import { updateUiDataInCache } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const updateData = await request.json();

    console.log("POST=======", updateData);
    await updateUiDataInCache(updateData);

    return NextResponse.json({
      message: "Categories data stored successfully",
    });
  } catch (error) {
    console.error("Failed to store data:", error);

    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
