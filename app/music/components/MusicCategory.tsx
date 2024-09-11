"use client";

import {
  selectMusicPreview,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

const MusicCategory = ({
  preloadedState,
}: {
  preloadedState: MusicSliceState;
}) => {
  return (
    <Category<Preview>
      title={CategoryTitle.Music}
      itemsSelector={selectMusicPreview}
      preloadedStateAction={setMusic}
      preloadedState={preloadedState}
      sliceNumber={6}
    />
  );
};

export default MusicCategory;
