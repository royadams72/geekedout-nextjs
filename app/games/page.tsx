import { getCategoryByNameFromCache } from "@/lib/redis";

import GamesCategory from "./components/GamesCategory";

const GamesPage = async () => {
  const category = await getCategoryByNameFromCache("games");
  return <GamesCategory preloadedState={category} />;
};

export default GamesPage;
