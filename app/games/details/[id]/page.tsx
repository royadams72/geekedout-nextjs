import { checkIfRedirected } from "@/utils/helpers";

import { getCategoryDataFromApi } from "@/lib/actions/getCategoryDataFromApi";

import { CategoryType } from "@/shared/enums/category-type.enum";

import GamesDetails from "@/app/games/components/GamesDetails";

const GameDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const item = await getCategoryDataFromApi(CategoryType.Games, id);

  checkIfRedirected(item);

  return <GamesDetails preloadedState={item} />;
};

export default GameDetailsPage;
