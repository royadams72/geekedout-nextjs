import Redis from "ioredis";
import { setComicDetailsServerSide } from "./features/comics/comicsSlice";
import { setGameDetailsServerSide } from "./features/games/gamesSlice";
import { getMovieDetailServerSide } from "./features/movies/moviesSlice";
import { uiDataSlice } from "./features/uiData/uiDataSlice";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { getMusicDetailsServerSide } from "./features/music/musicSlice";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const saveCategoriesToCache = async (categoriesData: any) => {
  // console.log("saveCategoriesToCache===", categoriesData);
  await redis.set("categoriesData", JSON.stringify(categoriesData));
};

export const getCategoriesFromCache = async () => {
  const data: any = await redis.get("categoriesData");

  return JSON.parse(data);
};

// export const updateCategoryInCache = async (
//   categoryName: string,
//   updatedDataCategory: any
// ) => {
//   try {
//     const categoriesData = await getCategoriesFromCache();

//     if (!categoriesData || !categoriesData[categoryName]) {
//       throw new Error(`Category ${categoryName} does not exist`);
//     }

//     categoriesData[categoryName] = {
//       ...categoriesData[categoryName],
//       ...updatedDataCategory,
//     };

//     await saveCategoriesToCache(categoriesData);
//   } catch (error) {
//     console.error("Error updating category in cache:", error);
//   }
// };

export const getCategoryByNameFromCache = async (categoryName: string) => {
  try {
    const data = await getCategoriesFromCache();
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
  categoryName: string,
  id: string | number
) => {
  try {
    const data = await getCategoriesFromCache();
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
