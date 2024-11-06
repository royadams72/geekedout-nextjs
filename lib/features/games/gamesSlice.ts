import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import { isEmpty } from "@/utils/helpers";

import { Game, GameDetail } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_DATA_FOLDER = process.env.NEXT_PUBLIC_GET_DATA_FOLDER;

export interface GamesSliceState {
  games: Game[];
}

export const initialState: GamesSliceState = {
  games: [],
};

export const gamesSlice = createAppSlice({
  name: CategoryType.Games,
  initialState,
  reducers: (create) => ({
    setGames: create.reducer((state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    }),
  }),
  selectors: {},
});

export const { setGames } = gamesSlice.actions;
export const gamesReducer = gamesSlice.reducer;

export const selectGames = createSelector(
  (state: RootState) => state?.games.games || [],
  (games) => games.filter((game) => game !== null)
);
export const selectGamesPreviews = createSelector(
  selectGames,
  (games: Game[]) =>
    games?.map((game) => {
      return {
        category: CategoryType.Games,
        id: game.id,
        imageLarge: game.image || IMAGE_NOT_FOUND.LRG_450x210,
        title: game.title,
      };
    })
);

export const getGamesStore = async (): Promise<GamesSliceState | []> => {
  let gamesStore = await getAllGames();

  if (!gamesStore || isEmpty(gamesStore)) {
    console.error("data was not loaded getGamesStore()");
    gamesStore = [];
  }

  return {
    games: gamesStore,
  };
};

export const getAllGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch(`${BASE_URL}/api/games/${GET_DATA_FOLDER}/`, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch games getAllGames():", error);
    return [];
  }
};

export const setGameDetails = async (
  serverSideStore: GamesSliceState,
  id: string
): Promise<GameDetail | {}> => {
  return mapGameDetail(serverSideStore, id);
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
    category: CategoryType.Games,
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
