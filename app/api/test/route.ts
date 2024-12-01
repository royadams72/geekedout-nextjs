// app/api/test/route.ts
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const response = NextResponse.json({ message: "Testing Cookie" });

  // Set a simple cookie to verify if it's saved
  response.cookies.set("test_cookie", "12345", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });

  return response;
};
