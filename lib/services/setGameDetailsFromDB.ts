import { CategoryType } from "@/types/enums/category-type.enum";
import { GameDetail, Game } from "@/types/interfaces/game";
import { GamesSliceState } from "../features/games/gamesSlice";
import { getCategoryFromDB } from "@/lib/services/getCategoryFromDB";

export const setGameDetailsFromDB = async (
  id: string
): Promise<GameDetail | {}> => {
  try {
    const storeData = await getCategoryFromDB(CategoryType.GAMES);
    if (!storeData) {
      throw new Error("Could not get games storeData from DB");
    }
    return mapGameDetail(storeData, id);
  } catch (error) {
    console.error(`error in setGameDetailsFromDB: ${error}`);
    return {};
  }
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
