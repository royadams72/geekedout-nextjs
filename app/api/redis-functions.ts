import { appConfig } from "@/shared/constants/appConfig";
import { cookies } from "next/headers";
const sessionId = "ccd1e804-dfdc-41a5-a12e-ff43207976d0";
export const getCategoryData = async (categoryName: string) => {
  const cookieHeader = cookies().toString();
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/api/get-set-data/category-get-data?categoryName=${categoryName}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("getCategoryData()==", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};
