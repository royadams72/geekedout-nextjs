import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/appConfig";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    return JSON.stringify(currState) !== JSON.stringify(prevState);
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();

    await fetch(
      `${appConfig.url.BASE_URL}/api/get-set-data/category-store-data/`,
      {
        method: "POST",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      }
    );
  },
});
