import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { refreshSpotifyToken } from "@/app/api/music/token/getToken";
import { comicsSlice } from "../features/comics/comicsSlice";
import { uiDataSlice } from "../features/uiData/uiDataSlice";
import { loadState, RootState, makeStore as realMakeStore } from "./store";

jest.mock("@/app/api/music/token/getToken", () => ({
  refreshSpotifyToken: jest.fn(),
}));

let rootReducers = combineReducers({
  comics: comicsSlice.reducer,
  uiData: uiDataSlice.reducer,
});

const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};

fdescribe("store", () => {
  let store: any;
  let state: RootState;

  beforeEach(() => {
    // jest.clearAllMocks();
    store = makeStore();
    state = store.getState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call getItem", () => {
    const ls = jest.spyOn(Storage.prototype, "getItem");
    const preloadedState = loadState();
    console.log(preloadedState);
  });

  it("should call getItem", () => {
    const ls = jest.spyOn(Storage.prototype, "getItem");
    const pre = JSON.stringify(state);

    ls.mockImplementationOnce(() => pre);
    const preloadedState = loadState();

    expect(preloadedState).toBeTruthy();
  });

  it("should call getItem", () => {
    store = null;
    state = {} as any;

    store = realMakeStore();

    expect(store.getState()).toBeTruthy();
  });
});
