// lib/redis.js
import Redis from "ioredis";
import {
  mapComicDetail,
  setComicDetailsServerSide,
} from "./features/comics/comicsSlice";
import {
  mapGameDetail,
  setGameDetailsServerSide,
} from "./features/games/gamesSlice";
import { getMovieDetailServerSide } from "./features/movies/moviesSlice";

// Replace with your Redis server details
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const saveCategoriesToCache = async (categoriesData: any) => {
  // console.log("categoriesData====", categoriesData);

  await redis.set("categoriesData", JSON.stringify(categoriesData));
};

// Get multiple categories from Redis
export const getCategoriesFromCache = async () => {
  const data: any = await redis.get("categoriesData");
  return JSON.parse(data);
};

// Function to update a single category
export const updateCategoryInCache = async (
  categoryName: string,
  updatedDataCategory: any
) => {
  try {
    // Fetch current categories data
    const categoriesData = await getCategoriesFromCache();

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    // Update the category data
    categoriesData[categoryName] = {
      ...categoriesData[categoryName],
      ...updatedDataCategory,
    };

    // Save the updated categories data back to Redis
    await saveCategoriesToCache(categoriesData);
  } catch (error) {
    console.error("Error updating category in cache:", error);
  }
};

export const getCategoryByNameFromCache = async (categoryName: string) => {
  try {
    const categoriesData = await getCategoriesFromCache();
    // console.log(categoriesData);

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    // Return the requested category
    return categoriesData[categoryName];
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null; // Or handle as needed
  }
};

export const getItemFromCache = async (
  categoryName: string,
  id: string | number
) => {
  try {
    let categoriesData = await getCategoriesFromCache();

    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }
    let selectedData: any;
    switch (categoryName) {
      case "comics":
        selectedData = await setComicDetailsServerSide(
          categoriesData.comics,
          id as string
        );
        categoriesData = {
          ...categoriesData,
          comics: {
            ...categoriesData.comics,
            selectedComic: selectedData,
          },
        };
        // item = mapComicDetail(categoriesData[categoryName], id as string);
        break;
      case "games":
        selectedData = await setGameDetailsServerSide(
          categoriesData.games,
          id as string
        );
        categoriesData = {
          ...categoriesData,
          games: {
            ...categoriesData.games,
            selectedGame: selectedData,
          },
        };
        break;
      case "movies":
        selectedData = getMovieDetailServerSide(id as number);
        categoriesData = {
          ...categoriesData,
          movies: {
            ...categoriesData.movies,
            selectedMovie: selectedData,
          },
        };
        break;
      default:
        break;
    }
    // Return the requested category data
    console.log(categoriesData);

    return selectedData;
  } catch (error) {
    console.error("Error getting category from cache:", error);
    return null; // Or handle as needed
  }
};

export default redis;
