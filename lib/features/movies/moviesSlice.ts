import { createAppSlice } from "@/lib/createAppSlice";
import { Movie, MovieDetail, MoviesStore } from "@/shared/interfaces/movies";
import { StateLoading } from "@/shared/enums/loading";
import { createSelector, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { Paths } from "@/shared/enums/paths.enums";

export interface MoviesSliceState {
  movies: MoviesStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  selectedMovie: MovieDetail;
}

const initialState: MoviesSliceState = {
  movies: {} as MoviesStore,
  status: StateLoading.IDLE,
  selectedMovie: {} as MovieDetail,
};

export const moviesSlice = createAppSlice({
  name: "movies",
  initialState,

  reducers: (create) => ({
    setMovies: create.reducer((state, action: PayloadAction<MoviesStore>) => {
      state.movies = action.payload;
    }),
    setMovieDetails: create.reducer(
      (state, action: PayloadAction<MovieDetail>) => {
        state.selectedMovie = action.payload;
      }
    ),
    clearMovieDetails: create.reducer((state) => {
      state.selectedMovie = {} as MovieDetail;
    }),
  }),

  selectors: {
    selectMovies: (movies) => movies?.movies?.results as Movie[],
    selectStatus: (movies) => movies.status,
    selectMovieDetails: (movies) => movies.selectedMovie,
  },
});

export const getMoviesStore = async (): Promise<MoviesSliceState> => {
  let moviesStore;
  let status = StateLoading.IDLE;
  try {
    status = StateLoading.LOADING;

    moviesStore = await getAllMoviesApi();

    if (!moviesStore) {
      status = StateLoading.FAILED;
      throw new Error(`data was not loaded`);
    }

    status = StateLoading.IDLE;
  } catch (error) {
    status = StateLoading.FAILED;
    console.error("Failed to fetch data:", error);
    throw error;
  }
  return {
    movies: moviesStore,
    status,
    selectedMovie: {} as MovieDetail,
  };
};

export const getMovieDetailServerSide = async (
  id: number
): Promise<MovieDetail> => {
  let selectedMovie;

  try {
    selectedMovie = await getMovieApi(id);

    if (!selectedMovie) {
      throw new Error(`data was not loaded`);
    }
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
  return selectedMovie;
};

const getAllMoviesApi = async () => {
  const response = await fetch("http://localhost:3000/api/movies/all-movies");
  const data = await response.json();
  return data.data;
};

const getMovieApi = async (id: number) => {
  const response = await fetch(
    `http://localhost:3000/api/movies/movie-details/${id}`
  );
  const m = await response.json();
  const movie = mapMovieDetail(m, id);
  return movie;
};

export const {
  clearMovieDetails,
  setMovies,
  setMovieDetails,
  // getMovies,
} = moviesSlice.actions;

export const { selectMovies, selectStatus, selectMovieDetails } =
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

function mapMovieDetail(movie: Movie, id: number) {
  const {
    title: name,
    release_date,
    poster_path,
    homepage,
    imdb_id,
    genres: g,
    overview,
  }: any = movie;

  const genres = g.map((arrayItem: any) => arrayItem.name);
  const selectedItem: MovieDetail = {
    category: "Movies",
    genres,
    homepage,
    id,
    imdb_link: `http://www.imdb.com/title/${imdb_id}`,
    image: `https://image.tmdb.org/t/p/w300${poster_path}`,
    name,
    overview,
    release_date,
  };
  console.log(movie);
  return selectedItem;
}
