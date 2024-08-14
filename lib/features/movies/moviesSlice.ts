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
    getMovieDetail: create.asyncThunk(
      async (id: number) => {
        const movie = await getMovie(id);
        return movie;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.selectedMovie = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
    getMovies: create.asyncThunk(
      async () => {
        const response = await getMoviesApi();
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

export const getMoviesApi = async () => {
  const response = await fetch("http://localhost:3000/api/movies/all-movies");
  const data = await response.json();
  return data.data;
};

export const getMovie = async (id: number) => {
  const response = await fetch(
    `http://localhost:3000/api/movies/movie-details/${id}`
  );
  const m = await response.json();
  const movie = mapMovieDetail(m, id);
  return movie;
};

export const {
  getMovieDetail,
  clearMovieDetails,
  setMovies,
  setMovieDetails,
  getMovies,
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
