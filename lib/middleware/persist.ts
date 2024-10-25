import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/appConfig";
import { GET_SET_DATA_API } from "@/shared/constants/urls";

let debounceTimeout: NodeJS.Timeout | null = null;
const delayTime = 300;

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    stopTimer();
  });
}

const stopTimer = () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
  }
};

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

    stopTimer();

    debounceTimeout = setTimeout(async () => {
      if (sessionId) {
        try {
          const res = await fetch(
            `${appConfig.url.BASE_URL}/${GET_SET_DATA_API}/category-set-data`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Cookie: `sessionId=${sessionId}`,
              },
              body: JSON.stringify({ state }),
            }
          );

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
        } catch (error) {
          console.error(`There was an error: ${error}`);
          throw error;
        }
      }
    }, delayTime);
  },
});
