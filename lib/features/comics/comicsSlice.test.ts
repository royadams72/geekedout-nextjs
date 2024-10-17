import { configureStore } from "@reduxjs/toolkit";

import { comicSliceMock, comicsMock } from "@/__mocks__/comics/comics.mocks";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { ComicStore } from "@/shared/interfaces/comic";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

import {
  ComicsSliceState,
  selectComicsPreviews,
  setComicDetails,
  setComics,
} from "@/lib/features/comics/comicsSlice";

// let sessionId = "0b6b4eee-6802-47b3-9e9e-73bbc759f5e1";
let comicsReducer = () => comicSliceMock;

// Redux store creation function
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
    store.dispatch(setComics(comicStore));
    expect(state.comics.results.length).toBeGreaterThanOrEqual(1);
    expect(state.comics.results[0].title).toEqual(
      "Avengers Assemble (2024) #1 (Variant)"
    );
  });

  it("should handle selectComicsPreviews", () => {
    const originalArray = rootStateMock.comics.comics.results;

    const previewComics = selectComicsPreviews(rootStateMock);

    expect(previewComics[0].title).toEqual(originalArray[0].title);
  });

  it("should handle selectComicsPreviews when no image", () => {
    const clonedState = JSON.parse(JSON.stringify(rootStateMock));
    // const originalArray = rootStateMock.comics.comics.results;
    clonedState.comics.comics.results[0].thumbnail = {};
    clonedState.comics.comics.results[0].images = [{}];

    const previewComics = selectComicsPreviews(clonedState);

    expect(previewComics[0].imageSmall).toEqual(IMAGE_NOT_FOUND.SM);
    expect(previewComics[0].imageLarge).toEqual(IMAGE_NOT_FOUND.MED_250x250);
  });

  it("should handle setComicDetails for details page", async () => {
    let mappedData = await setComicDetails(state, "121402");
    const originalArrayItem1 = state.comics.results[0];

    expect(mappedData?.name).toEqual(originalArrayItem1.title);

    let clonedState = JSON.parse(JSON.stringify(state));
    clonedState.comics.results = [];
    mappedData = await setComicDetails(clonedState, "121402");
    console.log(mappedData);

    expect(mappedData).toEqual(null);
  });
});
