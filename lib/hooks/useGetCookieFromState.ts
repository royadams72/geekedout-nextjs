import { useState, useEffect } from "react";
import { isNotEmpty } from "@/utils/helpers";
import { setCookie } from "../actions/setCookie"; // Make sure this function is available

export const useGetCookieFromState = (preloadedState: any) => {
  const [loadedState, setLoadedState] = useState<any>();

  useEffect(() => {
    const stateString = JSON.stringify(preloadedState);
    const hasCookieData = stateString.search("cookieData") > -1;
    console.log(hasCookieData);

    const fetchData = async () => {
      let cookieData;
      let musicWithoutCookie;
      if (isNotEmpty(preloadedState) && hasCookieData) {
        console.log(
          "has cookie data hasCookieData:",
          hasCookieData,
          preloadedState
        );
        if (preloadedState.music && preloadedState.music.cookieData) {
          ({ cookieData, ...musicWithoutCookie } = preloadedState.music);
          setLoadedState({ music: musicWithoutCookie });
        } else if (preloadedState.cookieData) {
          ({ cookieData, ...musicWithoutCookie } = preloadedState);
          setLoadedState(musicWithoutCookie);
        }

        if (cookieData) {
          await setCookie(cookieData);
        }
      } else {
        console.log(
          "dose not have cookies, hasCookieData:",
          hasCookieData,
          preloadedState
        );
        setLoadedState(preloadedState);
      }
    };

    fetchData(); // Call the async function
  }, []); // Dependency array to rerun when preloadedState changes

  return loadedState;
};
