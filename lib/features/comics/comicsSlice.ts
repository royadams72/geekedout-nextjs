import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { ImageNotFound } from "@/types/enums/image-not-found.enum";
import { CategoryType } from "@/types/enums/category-type.enum";
import { Comic, ComicStore } from "@/types/interfaces/comic";
import { Preview } from "@/types/interfaces/preview";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

export interface ComicsSliceState {
  comics: ComicStore;
}

export const initialState: ComicsSliceState = {
  comics: {
    error: "",
    limit: 0,
    offset: 0,
    number_of_page_results: 0,
    number_of_total_results: 0,
    status_code: 0,
    results: [],
  },
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
    comic?.map((comic: Comic): Preview => {
      const comicImage = comic?.image?.small_url;
      let comicName = comic?.name || comic?.volume?.name;

      return {
        category: CategoryType.COMICS,
        id: comic.id,
        title: comicName,
        imageLarge: comicImage || ImageNotFound.MED_250x250,
      };
    })
);
