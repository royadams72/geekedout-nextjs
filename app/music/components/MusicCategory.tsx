"use client";

import { useEffect, useState } from "react";
import {
  selectMusicPreviews,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/types/interfaces/preview";
import { CategoryTitle } from "@/types/enums/category-type.enum";

import { setCookie } from "@/lib/actions/setCookie";

import Category from "@/components/category/Category";
import { useGetCookieFromState } from "@/lib/hooks/useGetCookieFromState";

const MusicCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
}) => {
  const loadedState = useGetCookieFromState(preloadedState);

  return (
    <Category<Preview>
      title={CategoryTitle.MUSIC}
      itemsSelector={selectMusicPreviews}
      preloadedStateAction={setMusic}
      preloadedState={loadedState}
      sliceNumber={6}
    />
  );
};

export default MusicCategory;
