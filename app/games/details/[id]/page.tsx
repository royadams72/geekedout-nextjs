import { checkIfRedirected } from "@/lib/utils/redirect";
import { setGameDetailsFromDB } from "@/lib/services/setGameDetailsFromDB";

import { GameDetail } from "@/types/interfaces/game";

import GamesDetails from "@/app/games/components/GamesDetails";

const GameDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const item = await setGameDetailsFromDB(id);

  checkIfRedirected(item);

  return <GamesDetails preloadedState={item as GameDetail} />;
};

export default GameDetailsPage;
