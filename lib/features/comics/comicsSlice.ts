import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import {
  Comic,
  ComicDetail,
  ComicStore,
  Items,
  Price,
} from "@/shared/interfaces/comic";

import { StateLoading } from "@/shared/enums/loading";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

export interface ComicsSliceState {
  comics: ComicStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
}

const initialState: ComicsSliceState = {
  comics: {} as ComicStore,
  status: StateLoading.IDLE,
};

export const comicsSlice = createAppSlice({
  name: CategoryType.Comics,
  initialState,
  reducers: {
    setComics: (state, action: PayloadAction<ComicStore>) => {
      state.comics = action.payload;
    },
  },
  selectors: {
    selectComicsArray: (comics) => comics.comics.results as Comic[],
    selectStatus: (comics) => comics.status,
  },
});

export const { setComics } = comicsSlice.actions;

export const { selectComicsArray, selectStatus } = comicsSlice.selectors;

export const comicsReducer = comicsSlice.reducer;

export const setComicDetailsServerSide = async (
  serverSideStore: ComicsSliceState,
  id: string
): Promise<ComicDetail | null> => {
  return mapComicDetail(serverSideStore, id);
};

export const mapComicDetail = (
  comics: ComicsSliceState,
  id: string
): ComicDetail | null => {
  // console.log("mapComicDetail===", comics);
  const results = comics.comics.results || [];
  const item: Comic | undefined = results.find(
    (comic: Comic) => comic.id?.toString() === id
  );

  if (!item) {
    return null;
  }

  const {
    description,
    pageCount,
    prices,
    title: name,
    urls: [{ url: clickThrough }],
    images: [{ path, extension }],
    dates: [{ date: onsaleDate }],
    creators: { items: creators },
  } = item;

  const selectedItem: ComicDetail = {
    onsaleDate: onsaleDate || "TBA",
    creators: creators.map((c: Items) => ({
      name: c.name,
      role: c.role || "unknown",
    })),
    description: description || "No Description",
    image: `${path}.${extension}`,
    pageCount,
    printPrice: prices.find((c: Price) => c.type === "printPrice")?.price,
    clickThrough,
    name,
    category: "Comics",
    id,
  };

  return selectedItem;
};

export const getComicsStore = async (): Promise<ComicsSliceState> => {
  let comicStore: ComicStore;
  let status = StateLoading.LOADING;

  try {
    comicStore = await getComicsApi();

    if (!comicStore) {
      status = StateLoading.FAILED;
      throw new Error("Data was not loaded");
    }

    status = StateLoading.IDLE;
  } catch (error) {
    status = StateLoading.FAILED;
    console.error("Failed to fetch comic details:", error);
    throw error;
  }

  return {
    comics: comicStore,
    status,
  };
};

const getComicsApi = async (): Promise<ComicStore> => {
  const response = await fetch("http://localhost:3000/api/comics/get-data", {
    method: "GET",
    credentials: "include",
  });
  const data: ComicStore = await response.json();
  return data;
};

export const selectComicsPreviews = createSelector(
  selectComicsArray,
  (arr: Comic[]) => {
    return arr?.map((comic) => {
      const isImages = comic.images && comic.images.length > 0;
      return {
        category: CategoryType.Comics,
        id: comic.id,
        title: comic.title,
        imageLarge: isImages
          ? `${comic.images[0].path}.jpg`
          : IMAGE_NOT_FOUND.SM,
        imageSmall: isImages
          ? `${comic.images[0].path}/standard_fantastic.jpg`
          : IMAGE_NOT_FOUND.MED_250x250,
      };
    });
  }
);
