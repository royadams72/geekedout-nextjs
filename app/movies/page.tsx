import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { getCategoryData } from "@/app/api/get-set-data/functions";

const MoviesPage = async () => {
  const category = await getCategoryData(CategoryType.Movies);
  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
