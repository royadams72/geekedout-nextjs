import Redis from "ioredis";
import {
  ComicsSliceState,
  setComicDetailsServerSide,
} from "./features/comics/comicsSlice";
import {
  GamesSliceState,
  setGameDetailsServerSide,
} from "./features/games/gamesSlice";
import { getMovieDetailServerSide } from "./features/movies/moviesSlice";
import { uiDataSlice } from "./features/uiData/uiDataSlice";
import { CategoryType } from "@/shared/enums/category-type.enum";
import {
  getMusicDetailsServerSide,
  MusicSliceState,
} from "./features/music/musicSlice";
import { UiData } from "@/shared/interfaces/uiData";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const saveCategoriesToCache = async (categoriesData: any) => {
  console.log("saveCategoriesToCache===", categoriesData.movies);
  await redis.set("categoriesData", JSON.stringify(categoriesData));
};

export const getCategoriesFromCache = async () => {
  const data: any = await redis.get("categoriesData");

  return JSON.parse(data);
};

export const updateUiDataInCache = async (data: any) => {
  try {
    const store: any = await getCategoriesFromCache();
    const uiData = {
      ...store.uiData,
      ...data,
    };
    console.log(uiData);

    // console.log("updateUiDataInCache====", {
    //   ...store,
    //   uiData: { ...uiData },
    // });
    await saveCategoriesToCache({
      ...store,
      uiData: { ...uiData },
    });
    // await redis.set(field, JSON.stringify(data));
    console.log(`Successfully updated Redis with field: `);
  } catch (error) {
    console.error(`Error updating Redis with field: `, error);
  }
};

export const getCategoryByNameFromCache = async (categoryName: string) => {
  try {
    const data = await getCategoriesFromCache();
    const categoriesData = data.state;
    if (!categoriesData || !categoriesData[categoryName]) {
      throw new Error(`Category ${categoryName} does not exist`);
    }

    let preloadedState: any;
    const uiData = categoriesData.uiData as UiData;
    if (categoryName === CategoryType.Music) {
      preloadedState = {
        music: categoriesData.music as MusicSliceState,
        uiData,
      };
    } else if (categoryName === CategoryType.Comics) {
      preloadedState = {
        comics: categoriesData.music as ComicsSliceState,
        uiData,
      };
    } else if (categoryName === CategoryType.Games) {
      preloadedState = {
        gamse: categoriesData.games as GamesSliceState,
        uiData,
      };
    } else if (categoryName === CategoryType.Movies) {
      preloadedState = {
        movies: categoriesData.movies as GamesSliceState,
        uiData,
      };
    } else {
      throw new Error(`Unknown category: ${categoryName}`);
    }
    return preloadedState;
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
