import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import { StateLoading } from "@/shared/enums/loading";
import { Game, GameDetail } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

export interface GamesSliceState {
  games: Game[];
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  selectedGame: GameDetail | null;
}

const initialState: GamesSliceState = {
  games: [],
  status: StateLoading.IDLE,
  selectedGame: null,
};

export const gamesSlice = createAppSlice({
  name: "games",
  initialState,
  reducers: (create) => ({
    setGameDetails: create.reducer(
      (state, action: PayloadAction<GameDetail>) => {
        state.selectedGame = action.payload;
      }
    ),
    clearGameDetails: create.reducer((state) => {
      state.selectedGame = null;
    }),
    setGames: create.reducer((state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    }),
    getGames: create.asyncThunk<Game[], void>(
      async () => {
        const data = await getAllGames();
        return data;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.games = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
  }),
  selectors: {
    selectStatus: (state) => state.status,
    selectState: (state) => state,
    selectGameDetail: (state) => state.selectedGame,
  },
});

export const { getGames, setGameDetails, setGames, clearGameDetails } =
  gamesSlice.actions;

export const { selectStatus, selectGameDetail, selectState } =
  gamesSlice.selectors;
export const gamesReducer = gamesSlice.reducer;

const getAllGames = async (): Promise<Game[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/games/get-data/", {
      method: "GET",
    });
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

export const setGameDetailsServerSide = async (
  serverSideStore: GamesSliceState,
  id: string
): Promise<GameDetail | null> => {
  return mapGameDetail(serverSideStore, id);
};

export const getGamesStore = async (): Promise<GamesSliceState> => {
  let gamesStore: Game[];
  let status = StateLoading.IDLE;
  try {
    status = StateLoading.LOADING;
    gamesStore = await getAllGames();
    if (!gamesStore) {
      status = StateLoading.FAILED;
      throw new Error(`data was not loaded`);
    }
    status = StateLoading.IDLE;
  } catch (error) {
    status = StateLoading.FAILED;
    console.error("Failed to fetch game details:", error);
    throw error;
  }
  return {
    games: gamesStore,
    status,
    selectedGame: null,
  };
};

export const selectGames = createSelector(selectState, (state) => state.games);

export const selectGamesPreview = createSelector(selectGames, (arr: Game[]) => {
  return arr.map((game) => {
    return {
      category: CategoryType.Games,
      id: game.id,
      imageLarge: game.image || IMAGE_NOT_FOUND.LRG_450x210,
      title: game.title,
    };
  });
});

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
    category: "Games",
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
