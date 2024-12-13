"use client";

import { useEffect, useState } from "react";
import {
  selectMusicPreviews,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/types/interfaces/preview";
import { CategoryTitle } from "@/types/enums/category-type.enum";

import Category from "@/components/category/Category";
import { setCookie } from "@/lib/actions/setCookie";
import { useSetCookieToClient } from "@/lib/hooks/useSetCookieToClient";

const MusicCategory = ({
  preloadedState,
  isRedirected,
  token,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
  token?: any;
}) => {
  useSetCookieToClient(token);
  return (
    <Category<Preview>
      title={CategoryTitle.MUSIC}
      itemsSelector={selectMusicPreviews}
      preloadedStateAction={setMusic}
      preloadedState={preloadedState}
    />
  );
};

export default MusicCategory;
