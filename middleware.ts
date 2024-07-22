import { NextRequest, NextResponse } from "next/server";

export default function middlewareWatcher(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  console.log("request========", request);

  return NextResponse.next();
}
