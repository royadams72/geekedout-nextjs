import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import { Game, GameDetail } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_DATA_FOLDER } from "@/shared/constants/urls";

export interface GamesSliceState {
  games: Game[];
}

const initialState: GamesSliceState = {
  games: [],
};

export const gamesSlice = createAppSlice({
  name: CategoryType.Games,
  initialState,
  reducers: (create) => ({
    setGames: create.reducer((state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    }),
    getGames: create.asyncThunk<Game[], void>(async () => {
      const data = await getAllGames();
      return data;
    }),
  }),
  selectors: {},
});

export const { getGames, setGames } = gamesSlice.actions;
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

const getAllGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch(
      `${appConfig.url.BASE_URL}/api/games/${GET_DATA_FOLDER}/`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch games:", error);
    throw error;
  }
};

export const setGameDetails = async (
  serverSideStore: GamesSliceState,
  id: string
): Promise<GameDetail | null> => {
  return mapGameDetail(serverSideStore, id);
};

export const getGamesStore = async (): Promise<GamesSliceState> => {
  let gamesStore: Game[];
  try {
    gamesStore = await getAllGames();
    if (!gamesStore) {
      throw new Error(`data was not loaded`);
    }
  } catch (error) {
    console.error("Failed to fetch game details:", error);
    throw error;
  }
  return {
    games: gamesStore,
  };
};

export const mapGameDetail = (
  games: GamesSliceState,
  id: string | number
): GameDetail | null => {
  const gamesArray = games.games || [];
  const item = gamesArray.find((game: Game) => game.id?.toString() === id);
  if (!item) {
    return null;
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
