import { NextResponse } from "next/server";
import { getCategoriesFromCache } from "@/lib/redis";

export async function GET() {
  // console.log("POST=======");

  try {
    // const categoriesData = await request.json();

    await getCategoriesFromCache();

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
