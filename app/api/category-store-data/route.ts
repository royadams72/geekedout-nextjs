import { NextResponse } from "next/server";
import { saveCategoriesToCache } from "@/lib/redis";

export async function POST(request: Request) {
  try {
    const categoriesData = await request.json();

    await saveCategoriesToCache(categoriesData);

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
