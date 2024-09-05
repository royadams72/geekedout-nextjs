import { getCategoryByNameFromCache } from "@/lib/redis";

import MoviesCategory from "@/app/movies/components/MoviesCategory";

const MoviesPage = async () => {
  const category = await getCategoryByNameFromCache("games");
  // console.log("category", category);

  return <MoviesCategory isFirstPage={false} preloadedState={category} />;
};

export default MoviesPage;
