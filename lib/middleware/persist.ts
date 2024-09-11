import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/appConfig";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    // console.log(
    //   "action==",
    //   action,
    //   "currState.uiData.selectedData=====",
    //   currState.uiData.selectedData,
    //   "isNot equal==",
    //   JSON.stringify(currState) !== JSON.stringify(prevState)
    // );
    return JSON.stringify(currState) !== JSON.stringify(prevState);
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();

    await fetch(`${appConfig.url.BASE_URL}/api/category-store-data/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state }),
    });
  },
});
