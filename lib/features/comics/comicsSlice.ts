import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";

import { isNotEmpty } from "@/lib/utils/validation";

import {
  Comic,
  ComicDetail,
  ComicStore,
  Items,
  Price,
} from "@/shared/interfaces/comic";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { ImageNotFound } from "@/shared/enums/image-not-found.enum";
import { RootState } from "@/lib/store/store";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_DATA_FOLDER = process.env.NEXT_PUBLIC_GET_DATA_FOLDER;
export interface ComicsSliceState {
  comics: ComicStore;
}

const initialState: ComicsSliceState = {
  comics: { count: 0, limit: 0, offset: 0, results: [] },
};

export const comicsSlice = createAppSlice({
  name: CategoryType.COMICS,
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
        category: CategoryType.COMICS,
        id: comic.id,
        title: comic.title,
        imageLarge: isImages
          ? `${comic.images[0].path}.jpg`
          : ImageNotFound.MED_250x250,
        imageSmall: isImages
          ? `${comic.images[0].path}/standard_fantastic.jpg`
          : ImageNotFound.SM,
      };
    })
);
