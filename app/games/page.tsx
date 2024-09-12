import { CategoryType } from "@/shared/enums/category-type.enum";
import GamesCategory from "./components/GamesCategory";
import { getCategoryData } from "@/lib/redis/redis-functions";

const GamesPage = async () => {
  const category = await getCategoryData(CategoryType.Games);
  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
