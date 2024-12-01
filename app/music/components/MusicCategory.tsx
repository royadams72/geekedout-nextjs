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
  cookie,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
  cookie?: any;
}) => {
  // useEffect(() => {
  //   (async () => {
  //     console.log("fire!!!!!!");

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
