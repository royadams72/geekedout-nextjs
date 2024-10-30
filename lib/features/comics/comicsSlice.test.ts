import { configureStore } from "@reduxjs/toolkit";

import { comicSliceMock, comicsMock } from "@/__mocks__/comics/comics.mocks";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { ComicDetail, ComicStore } from "@/shared/interfaces/comic";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

import {
  comicsSlice,
  ComicsSliceState,
  getComicsStore,
  selectComicsPreviews,
  setComicDetails,
  setComics,
} from "@/lib/features/comics/comicsSlice";

let comicsReducer = () => comicSliceMock;

const makeStore = () => {
  return configureStore({
    reducer: comicsReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(comicsMock),
  })
) as jest.Mock;

describe("comicSlice", () => {
  let store: any;
  let comicStore: ComicStore;
  let state: ComicsSliceState;

  beforeEach(() => {
    store = makeStore();
    comicStore = comicsMock;
    state = store.getState();
  });

  it("should handle setComics action", () => {
    const initialState = {
      comics: { count: 0, limit: 0, offset: 0, results: [] },
    };

    const newState = comicsSlice.reducer(initialState, setComics(comicStore));

    expect(newState.comics).toEqual(comicStore);
  });

  it("should handle selectComicsPreviews", () => {
    const originalArray = rootStateMock.comics.comics.results;

    const previewComics = selectComicsPreviews(rootStateMock);

    expect(previewComics[0].title).toEqual(originalArray[0].title);
  });

  it("should handle selectComicsPreviews when no image", () => {
    const clonedState = {
      ...rootStateMock,
      comics: {
        comics: {
          ...rootStateMock.comics.comics,
          results: [
            {
              ...rootStateMock.comics.comics.results[0],
              images: [],
              thumbnail: {},
            },
          ],
        },
      },
    };

    const previewComics = selectComicsPreviews(clonedState);

    expect(previewComics[0].imageSmall).toEqual(IMAGE_NOT_FOUND.SM);
    expect(previewComics[0].imageLarge).toEqual(IMAGE_NOT_FOUND.MED_250x250);
  });

  it("should map item for details page via setComicDetails", async () => {
    const originalArrayItem1 = state.comics.results[0];

    const mappedData = (await setComicDetails(
      state,
      originalArrayItem1?.id?.toString() as string
    )) as ComicDetail;

    expect(mappedData?.name).toEqual(originalArrayItem1.title);
  });

  it("should return an empty object if cannot be mapped", async () => {
    const originalArrayItem1 = state.comics.results[0];
    const clonedState = {
      ...comicSliceMock,
      comics: {
        ...comicSliceMock.comics,
        results: [],
      },
    };

    const mappedData = await setComicDetails(
      clonedState,
      originalArrayItem1.id as string
    );

    expect(mappedData).toEqual({});
  });

  it("should fetch and return the comics store", async () => {
    const initialState = {
      comics: { count: 0, limit: 0, offset: 0, results: [] },
    };
    state = initialState;

    state = await getComicsStore();

    expect(state.comics.results.length).toBe(8);
    expect(state.comics.results[0].title).toBe(
      "Avengers Assemble (2024) #1 (Variant)"
    );
  });

  it("should empty object if the API fails", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("API Error"))
    );

    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getComicsStore();

    expect(result).toEqual({ comics: {} });

    consoleErrorMock.mockRestore();
  });

  it("should empty object if the the response not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      status: 500,
      json: async () => ({}),
    });

    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const result = await getComicsStore();

    expect(result).toEqual({ comics: {} });

    consoleErrorMock.mockRestore();
  });
});
