import { NextResponse } from "next/server";
import { saveCategoriesToCache } from "@/lib/redis"; // Import your cache methods

// Named export for handling POST requests
export async function POST(request: Request) {
  try {
    // Parse the request body
    const categoriesData = await request.json();

    console.log("Request Headers:", request.headers);
    console.log("Request Body:", categoriesData);

    // Save data to cache
    await saveCategoriesToCache(categoriesData);

    // Return success response
    return NextResponse.json({
      message: "Categories data stored successfully",
    });
  } catch (error) {
    console.error("Failed to store data:", error);

    // Return error response
    return NextResponse.json(
      { error: "Failed to store data" },
      { status: 500 }
    );
  }
}
