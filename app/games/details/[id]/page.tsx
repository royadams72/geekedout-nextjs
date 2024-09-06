import { getItemFromCache } from "@/lib/redis";

import GamesDetails from "@/app/games/components/GamesDetails";
import { CategoryType } from "@/shared/enums/category-type.enum";

const GameDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getItemFromCache(CategoryType.Games, id);

  return <GamesDetails preloadedState={item} />;
};

export default GameDetailsPage;
