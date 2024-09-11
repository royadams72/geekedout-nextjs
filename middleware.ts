import { NextRequest, NextResponse } from "next/server";
import { appConfig } from "./shared/constants/config";
const BASE_URL = appConfig.url.BASE_URL;
export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const referer = (request.headers.get("referer") || "").replace(BASE_URL, "");

  console.log("pathname ===", pathname);
  console.log("referer ===", referer);

  // if (pathname === "/") {
  //   await updateUiDataServerSide({ isFirstPage: true });
  // } else if (pathname !== "/" && referer === "/") {
  //   await updateUiDataServerSide({ isFirstPage: false });
  // }

  return NextResponse.next();
}

// const updateUiDataServerSide = async (data: any) => {
//   await fetch(`${BASE_URL}/api/update-uiData/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
// };

// const fetchCurrentState = async () => {
//   // Implement this function based on how you can fetch the current state
//   // Example: Fetch state from an API endpoint or server-side logic
//   const response = await fetch(`${BASE_URL}/api/category-get-data/`, {
//     method: "GET",
//   });
//   if (!response.ok) {
//     throw new Error("Failed to fetch current state");
//   }
//   return response.json();
// };

// const updateCategoryStoreData = async (state: any) => {
//   try {
//     const response = await fetch(`${BASE_URL}/api/category-store-data/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(state),
//     });

//     if (!response.ok) {
//       console.error("Failed to store category data:", response.statusText);
//     }
//   } catch (error) {
//     console.error("Error storing category data:", error);
//   }
// };
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images).*)",
  ],
};
