import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { comicSliceMock, comicsMock } from "@/__mocks__/comics/comics.mocks";
import { ComicsSliceState, setComics } from "@/lib/features/comics/comicsSlice";
import { ComicStore } from "@/shared/interfaces/comic";

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

fdescribe("ComicCategory Component", () => {
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
});
