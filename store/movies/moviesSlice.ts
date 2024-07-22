import { createAppSlice } from "@/store/createAppSlice";
import { Movie, MoviesStore } from "@/shared/interfaces/movies";
import { StateLoading } from "@/shared/enums/loading";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { Paths } from "@/shared/enums/paths.enums";

export interface MoviesSliceState {
  movies: MoviesStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  moviesLoaded: boolean;
}

const initialState: MoviesSliceState = {
  movies: {} as MoviesStore,
  status: StateLoading.IDLE,
  moviesLoaded: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const moviesSlice = createAppSlice({
  name: "movies",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    getMovies: create.asyncThunk(
      async () => {
        const response = await getMoviesApi();
        // The value we return becomes the `fulfilled` action payload
        return response.data;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.movies = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
    moviesLoaded: create.reducer((state, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.moviesLoaded = action.payload;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectMovies: (movies) => movies.movies.results as Movie[],
    selectStatus: (movies) => movies.status,
    selectMoviesLoaded: (movies) => movies.moviesLoaded,
  },
});

const getMoviesApi = async () => {
  const response = await fetch("http://localhost:3000/api/movies/all-movies");
  const data = await response.json();
  return data;
};

// Action creators are generated for each case reducer function.
export const { getMovies, moviesLoaded } = moviesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectMovies, selectStatus, selectMoviesLoaded } =
  moviesSlice.selectors;

export const moviesReducer = moviesSlice.reducer;

export const selectMoviesPreview = createSelector(
  selectMovies,
  (arr: Movie[]) => {
    return arr?.map((movie) => {
      return {
        category: CategoryType.Movies,
        id: movie.id,
        imageLarge: movie.poster_path
          ? `${Paths.MOVIES_CDN_IMAGES}w400${movie.poster_path}`
          : IMAGE_NOT_FOUND.SM,
        imageSmall: movie.poster_path
          ? `${Paths.MOVIES_CDN_IMAGES}w300${movie.poster_path}`
          : IMAGE_NOT_FOUND.SM,
        title: movie.title,
      };
    });
  }
);
