import { CategoryType } from "@/shared/enums/category-type.enum";
import { GameDetail, Game } from "@/shared/interfaces/game";
import { GamesSliceState } from "../features/games/gamesSlice";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

export const setGameDetailsFromDB = async (
  id: string
): Promise<GameDetail | {}> => {
  const storeData = await getCategoryFromDB(CategoryType.GAMES);
  return mapGameDetail(storeData, id);
};

export const mapGameDetail = (
  games: GamesSliceState,
  id: string | number
): GameDetail | {} => {
  const gamesArray = games.games || [];
  const item = gamesArray.find((game: Game) => game.id?.toString() === id);
  if (!item) {
    return {};
  }
  const {
    description,
    gamerpower_url,
    image,
    instructions,
    platforms,
    published_date,
    title: name,
    type,
    worth,
  } = item;

  return {
    category: CategoryType.GAMES,
    description,
    gamerpower_url,
    id,
    image,
    instructions,
    platforms,
    published_date,
    name,
    type,
    worth,
  };
};
