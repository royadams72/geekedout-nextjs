import Redis from "ioredis";

import { setComicDetailsServerSide } from "../features/comics/comicsSlice";
import { setGameDetailsServerSide } from "../features/games/gamesSlice";
import { getMovieDetailServerSide } from "../features/movies/moviesSlice";
import { getMusicDetailsServerSide } from "../features/music/musicSlice";

import { CategoryType } from "@/shared/enums/category-type.enum";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const saveSessionData = async (sessionId: string, data: any) => {
  await redis.set(`session:${sessionId}`, JSON.stringify(data));
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
    const categoriesData = data.state;
    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }
    let selectedData: any;
    switch (categoryName) {
      case CategoryType.Comics:
        selectedData = await setComicDetailsServerSide(
          categoriesData.comics,
          id as string
        );
        break;
      case CategoryType.Games:
        selectedData = await setGameDetailsServerSide(
          categoriesData.games,
          id as string
        );
        break;
      case CategoryType.Movies:
        selectedData = getMovieDetailServerSide(id as number);
        break;
      case CategoryType.Music:
        selectedData = getMusicDetailsServerSide(id as string);
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
