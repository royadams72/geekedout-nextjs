import { checkIfRedirected } from "@/lib/utils/redirect";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

import { CategoryType } from "@/types/enums/category-type.enum";

import MoviesCategory from "@/app/movies/components/MoviesCategory";

const MoviesPage = async () => {
  const category = await getCategoryFromDB(CategoryType.MOVIES);

  checkIfRedirected(category);

  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
