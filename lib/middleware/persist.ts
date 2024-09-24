import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/appConfig";
import { GET_SET_DATA_API } from "@/shared/constants/urls";

export const persisterMiddleware = createListenerMiddleware();
persisterMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    return JSON.stringify(currState) !== JSON.stringify(prevState);
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();

    try {
      const res = await fetch(
        `${appConfig.url.BASE_URL}/${GET_SET_DATA_API}/category-set-data`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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
  },
});
