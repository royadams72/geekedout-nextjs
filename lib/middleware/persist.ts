import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/config";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    // console.log("persist action===", );

    return JSON.stringify(currState) !== JSON.stringify(prevState);
  },

  effect: async (action, listenerApi) => {
    const state: any = listenerApi.getState();
    console.log("persist==", state.movies);

    await fetch(`${appConfig.url.BASE_URL}/api/category-store-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });
  },
});
