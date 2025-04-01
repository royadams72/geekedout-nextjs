import { configureStore } from "@reduxjs/toolkit";

import { movieSliceMock } from "@/__mocks__/movies/movies.mocks";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { ImageNotFound } from "@/types/enums/image-not-found.enum";

import { MoviesStore } from "@/types/interfaces/movies";
import {
  initialState as moviesInitialState,
  moviesSlice,
  MoviesSliceState,
  selectMoviesPreviews,
  setMovies,
} from "./moviesSlice";

let moviesReducer = () => movieSliceMock;

const makeStore = () => {
  return configureStore({
    reducer: moviesReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(movieSliceMock.movies),
  })
) as jest.Mock;

let consoleErrorMock: any;

describe("movieSlice", () => {
  let store: any;
  let moviesStore: MoviesStore;
  let state: MoviesSliceState;

  beforeEach(() => {
    store = makeStore();
    moviesStore = movieSliceMock.movies;
    state = store.getState();

    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should handle setMovies action", () => {
    const newState = moviesSlice.reducer(
      moviesInitialState,
      setMovies(moviesStore)
    );

    expect(newState.movies).toEqual(moviesStore);
  });

  it("should handle selectMoviesPreviews", () => {
    const originalArray = rootStateMock.movies.movies.results;

    const previewMovie = selectMoviesPreviews(rootStateMock);

    expect(previewMovie[0].title).toEqual(originalArray[0].title);
  });

  it("should handle selectMoviesPreviews when no image", () => {
    const clonedState = {
      ...rootStateMock,
      movies: {
        movies: {
          ...rootStateMock.movies.movies,
          results: [
            {
              ...rootStateMock.movies.movies.results[0],
              poster_path: "",
            },
          ],
        },
      },
    };

    const previewMovie = selectMoviesPreviews(clonedState);

    expect(previewMovie[0].imageSmall).toEqual(ImageNotFound.SM);
    expect(previewMovie[0].imageLarge).toEqual(ImageNotFound.MED_250x250);
  });
});
