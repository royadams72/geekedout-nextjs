import { checkIfRedirected } from "@/utils/helpers";

import { CategoryType } from "@/shared/enums/category-type.enum";
import { getCategoryData } from "@/lib/actions/getCategoryData";

import MoviesCategory from "@/app/movies/components/MoviesCategory";

const MoviesPage = async () => {
  const category = await getCategoryData(CategoryType.Movies);

  checkIfRedirected(category);

  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
