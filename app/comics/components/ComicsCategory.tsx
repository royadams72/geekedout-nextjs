"use client";

import {
  selectComicsPreviews,
  setComics,
  selectStatus,
  selectComicDetail,
  clearComicDetails,
} from "@/lib/features/comics/comicsSlice";

import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";

const ComicsDisplay = ({ preloadedState }: { preloadedState: any }) => {
  return (
    <Category<Preview>
      title="Comics"
      itemsSelector={selectComicsPreviews}
      detailsSelector={selectComicDetail}
      clearDetails={clearComicDetails}
      statusSelector={selectStatus}
      preloadedStateAction={setComics}
      preloadedState={preloadedState}
    />
  );
};

export default ComicsDisplay;
