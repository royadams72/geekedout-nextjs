import { createSelector, PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import { Movie, MoviesStore } from "@/types/interfaces/movies";
import { CategoryType } from "@/types/enums/category-type.enum";
import { ImageNotFound } from "@/types/enums/image-not-found.enum";
import { ImagePaths } from "@/types/enums/paths.enums";

import { isEmpty } from "@/lib/utils/validation";

export interface MoviesSliceState {
  movies: MoviesStore;
}

export const initialState: MoviesSliceState = {
  movies: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

export const moviesSlice = createAppSlice({
  name: CategoryType.MOVIES,
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MoviesStore>) => {
      state.movies = action.payload;
    },
  },
  selectors: {},
});

export const { setMovies } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;

export const selectMovies = createSelector(
  (state: RootState) => state?.movies?.movies?.results || [],
  (items) => items.filter((item) => item !== null)
);

export const selectMoviesPreviews = createSelector(
  selectMovies,
  (movies: Movie[]) =>
    movies?.map((movie) => ({
      category: CategoryType.MOVIES,
      id: movie.id,
      imageLarge: movie.poster_path
        ? `${ImagePaths.MOVIES_CDN_IMAGES}w400${movie.poster_path}`
        : ImageNotFound.MED_250x250,
      imageSmall: movie.poster_path
        ? `${ImagePaths.MOVIES_CDN_IMAGES}w300${movie.poster_path}`
        : ImageNotFound.SM,
      title: movie.title,
    }))
);
