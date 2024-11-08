import { checkIfRedirected } from "@/utils/helpers";
import { getCategoryData } from "@/app/api/get-set-data/functions";
import { cookies } from "next/headers";
import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const cookieStore = cookies();
  let sessionTokenCookie = cookieStore.get("sessionId")?.value;

  const category = await getCategoryData(CategoryType.Games);

  checkIfRedirected(category);

  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
