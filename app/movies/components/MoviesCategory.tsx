"use client";
import { Preview } from "@/shared/interfaces/preview";

import {
  setMovies,
  selectMoviesPreview,
  MoviesSliceState,
} from "@/lib/features/movies/moviesSlice";

import { CategoryTitle } from "@/shared/enums/category-type.enum";

import CategoryContainer from "@/shared/components/category/CategoryContainer";
import Category from "@/shared/components/category/Category";

const MoviesCategory = ({
  preloadedState,
}: {
  preloadedState: MoviesSliceState;
  isFirstPage?: boolean;
}) => {
  return (
    <CategoryContainer<MoviesSliceState>
      preloadedState={preloadedState}
      title={CategoryTitle.Movies}
    >
      <Category<Preview>
        itemsSelector={selectMoviesPreview}
        title={CategoryTitle.Movies}
        preloadedStateAction={setMovies}
        preloadedState={preloadedState}
        sliceNumber={6}
      />
    </CategoryContainer>
  );
};
export default MoviesCategory;
