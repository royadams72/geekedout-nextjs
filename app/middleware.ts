import { NextRequest } from "next/server";

export function middlewareWatcher(request: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  console.log("request========", request);

  return request;
}
