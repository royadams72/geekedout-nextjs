import { checkIfRedirected } from "@/lib/utils/redirect";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { getCategoryDataFromApi } from "@/lib/services/getCategoryDataFromApi";

import MoviesCategory from "@/app/movies/components/MoviesCategory";

const MoviesPage = async () => {
  const category = await getCategoryDataFromApi(CategoryType.Movies);

  checkIfRedirected(category);

  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
