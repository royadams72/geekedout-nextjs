import { CookieNames } from "@/types/enums/cookie-names.enum";
import { getCookie } from "../actions/getCookie";
import { getStoreData } from "../db/redis";

export const getCategoryFromDB = async (categoryName: string) => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const sessionId = await getCookie(CookieNames.SESSION_ID);
    if (!sessionId) {
      return { redirect: `${BASE_URL}/?redirected=true` };
    }
    const data = await getStoreData(sessionId as string);
    const categoriesData = data?.state;
    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    return categoriesData[categoryName];
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null;
  }
};
