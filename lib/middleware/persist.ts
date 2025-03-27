import { createListenerMiddleware } from "@reduxjs/toolkit";

const SET_DATA_API = process.env.NEXT_PUBLIC_SET_DATA_API;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const persistStoreClientSide = (state: string) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("redux-store", state);
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }
};

export const persisterMiddleware = createListenerMiddleware();
persisterMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    if (currState.uiData !== prevState.uiData) {
      persistStoreClientSide(JSON.stringify(currState));
      return true;
    }
    return false;
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    let {
      uiData: { sessionId },
    } = state;

    if (sessionId) {
      try {
        const res = await fetch(`${BASE_URL}/${SET_DATA_API}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state }),
        });

        if (!res.ok) {
          console.error(`HTTP error! Status: ${res.status}`);
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      } catch (error) {
        console.error(`There was an error persist middleware: ${error}`);
        Response.json(`There was an error persist middleware: ${error}`, {
          status: 500,
        });
      }
    }
  },
});
