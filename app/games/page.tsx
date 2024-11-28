import { checkIfRedirected } from "@/utils/helpers";
import { getCategoryData } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryData(CategoryType.Games);

  checkIfRedirected(category);

  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
