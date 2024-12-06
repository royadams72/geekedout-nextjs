import { useState, useEffect } from "react";
import { setCookie } from "../actions/setCookie"; // Make sure this function is available

export const useGetCookieFromState = (preloadedState: any) => {
  const [loadedState, setLoadedState] = useState<any>();
  // console.log("preloadedState.music::", preloadedState.music.cookieData);

  useEffect(() => {
    const fetchData = async () => {
      let cookieData;
      let musicWithoutCookie;

      if (preloadedState) {
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
        setLoadedState(preloadedState);
      }
    };

    fetchData(); // Call the async function
  }, []); // Dependency array to rerun when preloadedState changes

  return loadedState;
};
