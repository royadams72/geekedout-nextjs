import { getCategoryByNameFromCache } from "@/lib/redis";

import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { CategoryType } from "@/shared/enums/category-type.enum";

const MoviesPage = async () => {
  const category = await getCategoryByNameFromCache(CategoryType.Movies);
  // console.log("category", category);

  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
