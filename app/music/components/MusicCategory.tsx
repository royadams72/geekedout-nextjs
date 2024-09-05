"use client";

import React from "react";
import {
  selectAlbumDetail,
  clearAlbumDetails,
  selectMusicPreview,
  setMusic,
  MusicSliceState,
} from "@/lib/features/music/musicSlice";

import Category from "@/shared/components/category/Category";
import { Preview } from "@/shared/interfaces/preview";
import CategoryContainer from "@/shared/components/category/CategoryContainer";
import { CategoryTitle } from "@/shared/enums/category-type.enum";

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
          clearDetails={clearAlbumDetails}
          detailsSelector={selectAlbumDetail}
          preloadedStateAction={setMusic}
          preloadedState={preloadedState}
          sliceNumber={6}
        />
      </CategoryContainer>
    </>
  );
};

export default MusicCategory;
