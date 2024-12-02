"use client";

import {
  selectMusicPreviews,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";
import { useEffect } from "react";
import { setCookie } from "@/lib/actions/setCookie";

const MusicCategory = ({
  preloadedState,
  isRedirected,
  cookieToken,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
  cookieToken?: any;
}) => {
  // useEffect(() => {
  //   (async () => {
  //     if (cookie) {
  //       await setCookie(cookie);
  //     }
  //   })();
  // }, [cookie]);

  return (
    <Category<Preview>
      title={CategoryTitle.Music}
      itemsSelector={selectMusicPreviews}
      preloadedStateAction={setMusic}
      preloadedState={preloadedState}
      sliceNumber={6}
    />
  );
};

export default MusicCategory;
