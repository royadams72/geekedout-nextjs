import { checkIfRedirected } from "@/utils/helpers";
import { getCategoryData } from "@/lib/actions/getCategoryData";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryData(CategoryType.Games);

  checkIfRedirected(category);

  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
