import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { isEmpty, isNotEmpty } from "@/utils/helpers";

import {
  Comic,
  ComicDetail,
  ComicStore,
  Items,
  Price,
} from "@/shared/interfaces/comic";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_DATA_FOLDER } from "@/shared/constants/urls";
import { RootState } from "@/lib/store/store";

export interface ComicsSliceState {
  comics: ComicStore;
}

const initialState: ComicsSliceState = {
  comics: { count: 0, limit: 0, offset: 0, results: [] },
};

export const comicsSlice = createAppSlice({
  name: CategoryType.Comics,
  initialState,
  reducers: {
    setComics: (state, action: PayloadAction<ComicStore>) => {
      state.comics = action.payload;
    },
  },
  selectors: {},
});

export const { setComics } = comicsSlice.actions;
export const comicsReducer = comicsSlice.reducer;

export const selectComicsArray = createSelector(
  (state: RootState) => state.comics.comics.results || [],
  (results) => results.filter((item) => item !== null)
);

export const selectComicsPreviews = createSelector(
  selectComicsArray,
  (comic: Comic[]) =>
    comic?.map((comic: Comic) => {
      const isImages = comic.images && isNotEmpty(comic.images[0]);

      return {
        category: CategoryType.Comics,
        id: comic.id,
        title: comic.title,
        imageLarge: isImages
          ? `${comic.images[0].path}.jpg`
          : IMAGE_NOT_FOUND.MED_250x250,
        imageSmall: isImages
          ? `${comic.images[0].path}/standard_fantastic.jpg`
          : IMAGE_NOT_FOUND.SM,
      };
    })
);

export const setComicDetails = async (
  comicStore: ComicsSliceState,
  id: string
): Promise<ComicDetail | {}> => {
  return mapComicDetail(comicStore, id);
};

export const mapComicDetail = (
  comics: ComicsSliceState,
  id: string
): ComicDetail | {} => {
  const results = comics.comics.results || [];
  const item: Comic | undefined = results.find(
    (comic: Comic) => comic.id?.toString() === id
  );

  if (!item) {
    return {};
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
    category: CategoryType.Comics,
    id,
  };

  return selectedItem;
};

export const getComicsStore = async (): Promise<ComicsSliceState> => {
  let comicStore: ComicStore | {};

  try {
    comicStore = await getComicsApi();

    if (!comicStore || isEmpty(comicStore)) {
      comicStore = {};
    }
  } catch (error) {
    console.error("Failed to fetch comic details:", error);
    comicStore = {};
  }

  return {
    comics: comicStore as ComicStore,
  };
};

const getComicsApi = async (): Promise<ComicStore> => {
  const response = await fetch(
    `${appConfig.url.BASE_URL}/api/comics/${GET_DATA_FOLDER}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data: ComicStore = await response.json();

  return data;
};
