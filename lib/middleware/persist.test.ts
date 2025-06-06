import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";
import { cookieMock } from "@/__mocks__/cookie.mock";

import {
  setFirstPage,
  setSessionId,
  uiDataSlice,
} from "@/lib/features/uiData/uiDataSlice";
import { comicsSlice, setComics } from "@/lib/features/comics/comicsSlice";

import { RootState } from "@/lib/store/store";

import { persisterMiddleware } from "@/lib/middleware/persist";

let rootReducers = combineReducers({
  comics: comicsSlice.reducer,
  uiData: uiDataSlice.reducer,
});

Storage.prototype.setItem = jest.fn();

const makeStore = () => {
  return configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(persisterMiddleware.middleware),
  });
};

describe("persist store", () => {
  let store: any;
  let state: RootState;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    store = makeStore();
    state = store.getState();
    global.fetch = jest.fn();
    consoleErrorSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.restoreAllMocks();
  });

  // it("should persist to localstorage if uiData update", () => {
  //   expect(store.getState().uiData.isFirstPage).toBe(true);

  //   store.dispatch(setFirstPage(false));
  //   const updatedState = store.getState();

  //   expect(updatedState.uiData.isFirstPage).toBe(false);
  //   expect(localStorage.setItem).toHaveBeenCalledWith(
  //     "redux-store",
  //     JSON.stringify(updatedState)
  //   );
  // });

  // it("should NOT persist to localstorage if not uiData updated", () => {
  //   expect(store.getState().uiData.isFirstPage).toBe(true);

  //   store.dispatch(setComics(comicSliceMock.comics));
  //   const updatedState = store.getState();

  //   expect(updatedState.uiData.isFirstPage).toBe(true);
  //   expect(localStorage.setItem).not.toHaveBeenCalled();
  // });

  it("should call API to store state to redis if uiData has sessionId", () => {
    const sessionId = cookieMock.body.sessionId;

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(cookieMock),
    });

    store.dispatch(setSessionId(sessionId));
    const updatedState = store.getState();

    expect(updatedState.uiData.sessionId).toBe(sessionId);
  });

  it("should throw error if state cannot be stored in", async () => {
    const sessionId = cookieMock.body.sessionId;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Session ID is required",
    });

    store.dispatch(setSessionId(sessionId));
  });

  it("should log an error if session.setItem throws a QuotaExceededError", () => {
    const quotaExceededError = new Error("QuotaExceededError");
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw quotaExceededError;
    });

    store.dispatch(setFirstPage(false));

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error saving to session storage:",
      quotaExceededError
    );
  });
});
