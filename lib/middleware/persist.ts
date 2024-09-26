import { createListenerMiddleware } from "@reduxjs/toolkit";

import { appConfig } from "@/shared/constants/appConfig";
import { GET_SET_DATA_API } from "@/shared/constants/urls";
import { useServerSideCookie } from "../hooks/useServerSideCookie";
const ensureBrowserSessionCilentSide = (sessionId: string) => {
  console.log("ensureBrowserSessionCilentSide===", sessionId);
  if (!localStorage.getItem("sessionId")) {
    localStorage.setItem("sessionId", sessionId);
  }
};
export const persisterMiddleware = createListenerMiddleware();
persisterMiddleware.startListening({
  predicate: (action, currState: any, prevState: any) => {
    return JSON.stringify(currState) !== JSON.stringify(prevState);
  },

  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as any;
    const sessionId = state?.uiData?.sessionId;
    const response = await fetch("/api/get-session", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    const serverSession = data.sessionId;
    console.log("sessionId==", sessionId, "serverSession==", serverSession);

    if (sessionId && sessionId === serverSession) {
      ensureBrowserSessionCilentSide(sessionId);
      console.log(state.uiData.sessionId);
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
  },
});
