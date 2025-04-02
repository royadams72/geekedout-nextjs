import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({ message: "This is static data" });
  res.headers.set("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
  console.log("Test route", res?.headers.get("Cache-Control"));
  return res;
}
