import { NextRequest, NextResponse } from "next/server";

export const loggerMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    // console.log("dispatching", action);
    let result = next(action);
    // console.log("next state", storeAPI.getState().comics.comics);
    return result;
  };

// export function middlewareWatcher(request: NextRequest) {
//   // return NextResponse.redirect(new URL('/home', request.url))
//   console.log("request========", request);

//   return request;
// }
