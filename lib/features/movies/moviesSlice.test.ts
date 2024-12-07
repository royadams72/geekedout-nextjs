import { configureStore } from "@reduxjs/toolkit";

import { movieSliceMock } from "@/__mocks__/movies/movies.mocks";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

import { MovieDetail, MoviesStore } from "@/shared/interfaces/movies";
import {
  getMovieDetailsFromApi,
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

    expect(previewMovie[0].imageSmall).toEqual(IMAGE_NOT_FOUND.SM);
    expect(previewMovie[0].imageLarge).toEqual(IMAGE_NOT_FOUND.MED_250x250);
  });

  it("should map item for details page via getMovieDetailsFromApi", async () => {
    const originalArrayItem1 = state.movies.results[0];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(movieSliceMock.movies.results[0]),
    });
    const mappedData = (await getMovieDetailsFromApi(
      originalArrayItem1?.id
    )) as MovieDetail;

    expect(mappedData?.name).toEqual(originalArrayItem1.title);
  });

  it("should return an empty object if cannot be mapped", async () => {
    const originalArrayItem1 = state.movies.results[0];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      json: () => ({}),
    });
    const mappedData = await getMovieDetailsFromApi(originalArrayItem1.id);

    expect(mappedData).toEqual({});
  });
});
