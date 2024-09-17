import { getCategoryData } from "@/app/api/get-set-data/functions";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesDetails from "@/app/games/components/GamesDetails";

const GameDetailsPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const item = await getCategoryData(CategoryType.Games, id);

  return <GamesDetails preloadedState={item} />;
};

export default GameDetailsPage;
