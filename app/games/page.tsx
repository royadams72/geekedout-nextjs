import { checkIfRedirected } from "@/lib/utils/redirect";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryFromDB(CategoryType.GAMES);

  checkIfRedirected(category);

  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
