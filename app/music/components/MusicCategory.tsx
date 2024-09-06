"use client";

import {
  selectMusicPreview,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import { Preview } from "@/shared/interfaces/preview";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

import CategoryContainer from "@/shared/components/category/CategoryContainer";
import Category from "@/shared/components/category/Category";

const MusicCategory = ({
  preloadedState,
  isFirstPage,
}: {
  preloadedState: MusicSliceState;
  isFirstPage?: boolean;
}) => {
  return (
    <>
      <CategoryContainer<MusicSliceState>
        preloadedState={preloadedState}
        title={CategoryTitle.Music}
      >
        <Category<Preview>
          title={CategoryTitle.Music}
          itemsSelector={selectMusicPreview}
          preloadedStateAction={setMusic}
          preloadedState={preloadedState}
          sliceNumber={6}
        />
      </CategoryContainer>
    </>
  );
};

export default MusicCategory;
