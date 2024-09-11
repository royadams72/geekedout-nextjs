import { getCategoryByNameFromCache } from "@/lib/redis";

import GamesCategory from "./components/GamesCategory";
import { CategoryType } from "@/shared/enums/category-type.enum";

const GamesPage = async () => {
  const category = await getCategoryByNameFromCache(CategoryType.Games);
  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
