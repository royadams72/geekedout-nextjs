"use client";

import {
  selectComicsPreviews,
  setComics,
  ComicsSliceState,
} from "@/lib/features/comics/comicsSlice";

import { Preview } from "@/types/interfaces/preview";

import { CategoryTitle } from "@/types/enums/category-type.enum";

import Category from "@/components/category/Category";

const ComicsCategory = ({
  preloadedState,
  isRedirected,
}: {
  preloadedState: ComicsSliceState;
  isRedirected?: string;
}) => {
  return (
    <Category<Preview>
      title={CategoryTitle.COMICS}
      itemsSelector={selectComicsPreviews}
      preloadedStateAction={setComics}
      preloadedState={preloadedState}
    />
  );
};

export default ComicsCategory;
