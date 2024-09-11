import { getCategoryByNameFromCache } from "@/lib/redis";

import { CategoryType } from "@/shared/enums/category-type.enum";
import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryByNameFromCache(CategoryType.Games);
  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
