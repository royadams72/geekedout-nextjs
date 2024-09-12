import { createAppSlice } from "@/lib/store/createAppSlice";
import { Movie, MovieDetail, MoviesStore } from "@/shared/interfaces/movies";
import { StateLoading } from "@/shared/enums/loading";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { Paths } from "@/shared/enums/paths.enums";

export interface MoviesSliceState {
  movies: MoviesStore;
  status: StateLoading;
}

const initialState: MoviesSliceState = {
  movies: {} as MoviesStore,
  status: StateLoading.IDLE,
};

export const moviesSlice = createAppSlice({
  name: CategoryType.Movies,
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MoviesStore>) => {
      state.movies = action.payload;
    },
  },
  selectors: {
    selectMovies: (movies) => movies.movies.results as Movie[],
    selectStatus: (movies) => movies.status,
  },
});

export const getMoviesStore = async (): Promise<MoviesSliceState> => {
  let moviesStore: MoviesStore;
  let status = StateLoading.LOADING;
  try {
    moviesStore = await getAllMoviesApi();
    if (!moviesStore) {
      status = StateLoading.FAILED;
      throw new Error(`Data was not loaded`);
    }
    status = StateLoading.IDLE;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    status = StateLoading.FAILED;
    throw error;
  }
  return {
    movies: moviesStore,
    status,
  };
};

export const getMovieDetailServerSide = async (
  id: number
): Promise<MovieDetail> => {
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
  const response = await fetch("http://localhost:3000/api/movies/get-data", {
    method: "GET",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const getMovieApi = async (id: number) => {
  const response = await fetch(
    `http://localhost:3000/api/movies/movie-details/${id}`,
    {
      method: "GET",
    }
  );
  const m = await response.json();
  return mapMovieDetail(m, id);
};

export const { setMovies } = moviesSlice.actions;

export const { selectMovies, selectStatus } = moviesSlice.selectors;

export const moviesReducer = moviesSlice.reducer;

export const selectMoviesPreview = createSelector(
  selectMovies,
  (arr: Movie[]) => {
    return arr?.map((movie) => ({
      category: CategoryType.Movies,
      id: movie.id,
      imageLarge: movie.poster_path
        ? `${Paths.MOVIES_CDN_IMAGES}w400${movie.poster_path}`
        : IMAGE_NOT_FOUND.SM,
      imageSmall: movie.poster_path
        ? `${Paths.MOVIES_CDN_IMAGES}w300${movie.poster_path}`
        : IMAGE_NOT_FOUND.SM,
      title: movie.title,
    }));
  }
);

function mapMovieDetail(movie: Movie, id: number): MovieDetail {
  const {
    title: name,
    release_date,
    poster_path,
    homepage,
    imdb_id,
    genres,
    overview,
  } = movie;

  const genreNames = genres.map((genre: { name: string }) => genre.name);

  return {
    category: "Movies",
    genres: genreNames,
    homepage,
    id,
    imdb_link: `http://www.imdb.com/title/${imdb_id}`,
    image: `https://image.tmdb.org/t/p/w300${poster_path}`,
    name,
    overview,
    release_date,
  };
}
