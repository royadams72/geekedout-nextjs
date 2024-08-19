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
import { ComicDetail } from "@/shared/interfaces/comic";

const ComicsDisplay = ({ preloadedState }: { preloadedState: ComicDetail }) => {
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
