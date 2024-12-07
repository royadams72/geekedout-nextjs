import Redis from "ioredis";

import { setComicDetailsFromRedis } from "@/lib/features/comics/comicsSlice";
import { setGameDetailsFromRedis } from "../features/games/gamesSlice";
import { getMovieDetailsFromApi } from "../features/movies/moviesSlice";
import { getMusicDetailsFromApi } from "../features/music/musicSlice";

import { CategoryType } from "@/shared/enums/category-type.enum";

const redis_url = process.env.REDIS_URL || "localhost:6379";
const redis = new Redis(redis_url);

export const saveSessionData = async (sessionId: string, data: any) => {
  const sessionTTL = 86400;
  try {
    const response = await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (response !== "OK") {
      throw new Error(
        `Could not save data saveSessionData() ${process.env.REDIS_HOST}`
      );
    }
  } catch (error) {
    return { message: "Error getting data:", error };
  }
};

export const getStoreData = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
};

export const getCategoryByName = async (
  sessionId: string,
  categoryName: string,
  cookieData?: any
) => {
  try {
    const data = await getStoreData(sessionId);
    const categoriesData = data?.state;
    let returnedData;
    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    return categoriesData[categoryName];
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null;
  }
};

export const getItem = async (
  sessionId: string,
  categoryName: string,
  id: string | number
) => {
  try {
    let selectedData: any;
    const data = await getStoreData(sessionId);
    const categoriesData = data.state;

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    switch (categoryName) {
      case CategoryType.Comics:
        selectedData = await setComicDetailsFromRedis(
          categoriesData.comics,
          id as string
        );
        break;
      case CategoryType.Games:
        selectedData = await setGameDetailsFromRedis(
          categoriesData.games,
          id as string
        );
        break;
      case CategoryType.Movies:
        selectedData = getMovieDetailsFromApi(id as number);
        break;
      case CategoryType.Music:
        selectedData = getMusicDetailsFromApi(id as string);
        break;
      default:
        break;
    }

    return selectedData;
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null;
  }
};

export default redis;
