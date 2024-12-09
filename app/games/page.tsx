import { checkIfRedirected } from "@/lib/utils/redirect";
import { getCategoryDataFromApi } from "@/lib/services/getCategoryDataFromApi";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryDataFromApi(CategoryType.Games);

  checkIfRedirected(category);

  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
