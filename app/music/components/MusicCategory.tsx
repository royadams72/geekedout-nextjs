"use client";

import {
  selectMusicPreviews,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

const MusicCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: MusicSliceState;
  isRedirected?: string;
}) => {
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
