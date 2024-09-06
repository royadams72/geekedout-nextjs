"use client";

import {
  selectComicsPreviews,
  setComics,
  ComicsSliceState,
} from "@/lib/features/comics/comicsSlice";

import { Preview } from "@/shared/interfaces/preview";

import Category from "@/shared/components/category/Category";

import CategoryContainer from "@/shared/components/category/CategoryContainer";
import { CategoryTitle, CategoryType } from "@/shared/enums/category-type.enum";

const ComicsDisplay = ({
  preloadedState,
}: {
  preloadedState: ComicsSliceState;
}) => {
  return (
    <CategoryContainer<ComicsSliceState>
      preloadedState={preloadedState}
      title={CategoryType.Comics}
    >
      <Category<Preview>
        title={CategoryTitle.Comics}
        itemsSelector={selectComicsPreviews}
        preloadedStateAction={setComics}
        preloadedState={preloadedState}
        sliceNumber={6}
      />
    </CategoryContainer>
  );
};

export default ComicsDisplay;
