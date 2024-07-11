import { createAppSlice } from "@/store/createAppSlice";
import { Movie, MoviesStore } from "@/shared/interfaces/movies";
import { StateLoading } from "@/shared/constants/loading";

export interface MoviesSliceState {
  movies: MoviesStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
}

const initialState: MoviesSliceState = {
  movies: {} as MoviesStore,
  status: StateLoading.IDLE,
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
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectMovies: (movies) => movies.movies.results as Movie[],
    selectStatus: (movies) => movies.status,
  },
});

const getMoviesApi = async () => {
  const response = await fetch("http://localhost:3000/api/movies/all-movies");
  const data = await response.json();
  return data;
};

// Action creators are generated for each case reducer function.
export const { getMovies } = moviesSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectMovies, selectStatus } = moviesSlice.selectors;

export const moviesReducer = moviesSlice.reducer;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());

//     if (currentValue % 2 === 1 || currentValue % 2 === -1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };
