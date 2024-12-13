import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { comicsSlice } from "../features/comics/comicsSlice";
import { uiDataSlice } from "../features/uiData/uiDataSlice";
import { loadState, RootState, makeStore as realMakeStore } from "./store";

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
    store = makeStore();
    state = store.getState();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should call getItem", () => {
    const ls = jest.spyOn(Storage.prototype, "getItem");
    const preloadedState = loadState();
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
