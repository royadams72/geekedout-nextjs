import { ENV } from "@/lib/services/envService";
import { CookieNames } from "@/types/enums/cookie-names.enum";
import { getCookie } from "@/lib/actions/getCookie";
import { getDBData } from "@/lib/db/redis";

export const getCategoryFromDB = async (categoryName: string) => {
  const sessionId = await getCookie(CookieNames.SESSION_ID);

  try {
    if (!sessionId) {
      return { redirect: `${ENV.BASE_URL}/?redirected=true` };
    }
    const data = await getDBData(sessionId as string);
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
