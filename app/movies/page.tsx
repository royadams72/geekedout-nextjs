import { checkIfRedirected } from "@/utils/helpers";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { getCategoryDataFromApi } from "@/lib/actions/getCategoryDataFromApi";

import MoviesCategory from "@/app/movies/components/MoviesCategory";

const MoviesPage = async () => {
  const category = await getCategoryDataFromApi(CategoryType.Movies);

  checkIfRedirected(category);

  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
