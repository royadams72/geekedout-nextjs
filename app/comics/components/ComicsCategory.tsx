"use client";

import {
  selectComicsPreviews,
  setComics,
  ComicsSliceState,
} from "@/lib/features/comics/comicsSlice";

import { Preview } from "@/shared/interfaces/preview";

import { CategoryTitle } from "@/shared/enums/category-type.enum";

import Category from "@/shared/components/category/Category";

const ComicsDisplay = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: ComicsSliceState;
  isRedirected?: string;
}) => {
  return (
    <Category<Preview>
      title={CategoryTitle.Comics}
      itemsSelector={selectComicsPreviews}
      preloadedStateAction={setComics}
      preloadedState={preloadedState}
      sliceNumber={6}
    />
  );
};

export default ComicsDisplay;
