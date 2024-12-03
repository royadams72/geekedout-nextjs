"use client";

import { useEffect, useState } from "react";
import {
  selectMusicPreviews,
  setMusic,
  MusicSliceState,
  initialState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import { MusicStore } from "@/shared/interfaces/music";
import { setCookie } from "@/lib/actions/setCookie";

import Category from "@/shared/components/category/Category";

const MusicCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
}) => {
  const [loadedState, setLoadedState] = useState<any>();
  useEffect(() => {
    (async () => {
      if (preloadedState && preloadedState.music.cookieToken) {
        const { cookieToken, ...musicWithoutCookie } = preloadedState.music;

        await setCookie(cookieToken);
        setLoadedState({ music: musicWithoutCookie });
      } else {
        setLoadedState(preloadedState);
      }
    })();
  }, []);

  return (
    <Category<Preview>
      title={CategoryTitle.Music}
      itemsSelector={selectMusicPreviews}
      preloadedStateAction={setMusic}
      preloadedState={loadedState}
      sliceNumber={6}
    />
  );
};

export default MusicCategory;
