import Redis from "ioredis";

import { setComicDetails } from "@/lib/features/comics/comicsSlice";
import { setGameDetails } from "../features/games/gamesSlice";
import { getMovieDetails } from "../features/movies/moviesSlice";
import { getMusicDetails } from "../features/music/musicSlice";

import { CategoryType } from "@/shared/enums/category-type.enum";
// const redis_url = process.env.REDIS_URL as string;
// const redis = new Redis(redis_url);
// Updated redis host in env var2
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD || undefined,
  tls: process.env.NODE_ENV === "production" ? {} : undefined,
});

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

export const getSessionData = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
};

export const getCategoryByNameFromCache = async (
  sessionId: string,
  categoryName: string
) => {
  try {
    const data = await getSessionData(sessionId);
    const categoriesData = data.state;

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    return categoriesData[categoryName];
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null;
  }
};

export const getItemFromCache = async (
  sessionId: string,
  categoryName: string,
  id: string | number
) => {
  try {
    const data = await getSessionData(sessionId);

    let selectedData: any;
    const categoriesData = data.state;

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    switch (categoryName) {
      case CategoryType.Comics:
        selectedData = await setComicDetails(
          categoriesData.comics,
          id as string
        );
        break;
      case CategoryType.Games:
        selectedData = await setGameDetails(categoriesData.games, id as string);
        break;
      case CategoryType.Movies:
        selectedData = getMovieDetails(id as number);
        break;
      case CategoryType.Music:
        selectedData = getMusicDetails(id as string);
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
