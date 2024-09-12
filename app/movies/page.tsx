import MoviesCategory from "@/app/movies/components/MoviesCategory";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { getCategoryData } from "@/app/api/redis-functions";
import { cookies } from "next/headers";

const MoviesPage = async () => {
  const category = await getCategoryData(CategoryType.Movies);
  return <MoviesCategory preloadedState={category} />;
};

export default MoviesPage;
