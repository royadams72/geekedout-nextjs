import { CookieNames } from "@/shared/enums/cookie-names.enum";
import { getCookie } from "../actions/getCookie";
import { getStoreData } from "../db/redis";

export const getCategoryFromDB = async (categoryName: string) => {
  try {
    const sessionId = await getCookie(CookieNames.SESSION_ID);
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
