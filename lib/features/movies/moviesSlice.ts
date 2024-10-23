import { createSelector, PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import {
  Movie,
  MappedMovieDetail,
  MoviesStore,
} from "@/shared/interfaces/movies";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { IMAGE_PATHS } from "@/shared/enums/paths.enums";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_DATA_FOLDER } from "@/shared/constants/urls";

export interface MoviesSliceState {
  movies: MoviesStore;
}

const initialState: MoviesSliceState = {
  movies: {
    dates: { maximum: "", minimum: "" },
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
  },
};

const MOVIES_API = "api/movies";

export const moviesSlice = createAppSlice({
  name: CategoryType.Movies,
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MoviesStore>) => {
      state.movies = action.payload;
    },
  },
  selectors: {},
});

export const getMoviesStore = async (): Promise<MoviesSliceState> => {
  let moviesStore: MoviesStore;
  try {
    moviesStore = await getAllMoviesApi();
    if (!moviesStore) {
      throw new Error(`Data was not loaded`);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
  return {
    movies: moviesStore,
  };
};

export const getMovieDetails = async (
  id: number
): Promise<MappedMovieDetail> => {
  try {
    const selectedMovie = await getMovieApi(id);
    if (!selectedMovie) {
      throw new Error(`Data was not loaded`);
    }
    return selectedMovie;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
};

const getAllMoviesApi = async () => {
  const response = await fetch(
    `${appConfig.url.BASE_URL}/${MOVIES_API}/${GET_DATA_FOLDER}`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  const data = await response.json();
  return data;
};

const getMovieApi = async (id: number) => {
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/${MOVIES_API}/movie-details/${id}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${data.error.message}`);
    }
    return mapMovieDetail(data, id);
  } catch (error) {
    console.error(`Unable to load details: ${error}`);
    throw error;
  }
};

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
      category: CategoryType.Movies,
      id: movie.id,
      imageLarge: movie.poster_path
        ? `${IMAGE_PATHS.MOVIES_CDN_IMAGES}w400${movie.poster_path}`
        : IMAGE_NOT_FOUND.SM,
      imageSmall: movie.poster_path
        ? `${IMAGE_PATHS.MOVIES_CDN_IMAGES}w300${movie.poster_path}`
        : IMAGE_NOT_FOUND.SM,
      title: movie.title,
    }))
);

function mapMovieDetail(movie: Movie, id: number): MappedMovieDetail {
  const {
    title: name,
    release_date,
    poster_path,
    homepage,
    imdb_id,
    genres,
    overview,
  } = movie;

  const genreNames = genres?.map((genre: { name: string }) => genre.name) || [];

  return {
    category: CategoryType.Movies,
    genres: genreNames,
    homepage: homepage!,
    id,
    imdb_link: `http://www.imdb.com/title/${imdb_id}`,
    image: `https://image.tmdb.org/t/p/w300${poster_path}`,
    name,
    overview,
    release_date,
  };
}
