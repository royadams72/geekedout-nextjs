import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/createAppSlice";

import { StateLoading } from "@/shared/enums/loading";
import { Game, GameDetail } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";

export interface GamesSliceState {
  games: Game[];
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  selectedGame: GameDetail;
}

const initialState: GamesSliceState = {
  games: [] as Game[],
  status: StateLoading.IDLE,
  selectedGame: {} as GameDetail,
};

export const gamesSlice = createAppSlice({
  name: "games",
  initialState,
  reducers: (create) => ({
    setGameDetails: create.reducer((state, action: PayloadAction<string>) => {
      state.selectedGame = mapGameDetail(state, action.payload);
    }),
    getGames: create.asyncThunk(
      async () => {
        let data = await getAllGames();
        return data.data;
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
    selectGames: (state) => state?.games,
    selectGameDetail: (state) => state.selectedGame,
  },
});

export const { getGames, setGameDetails } = gamesSlice.actions;

export const { selectStatus, selectGames, selectGameDetail } =
  gamesSlice.selectors;

export const gamesReducer = gamesSlice.reducer;
// Helper functions
// , {
//   next: { revalidate: 10 },
// }
async function getAllGames() {
  const response = await fetch("http://localhost:3000/api/games/get-games/");
  const data = await response.json();
  return data;
}

export const selectGamesPreview = createSelector(selectGames, (arr: Game[]) => {
  return arr?.map((game) => {
    return {
      category: CategoryType.Games,
      id: game.id,
      imageLarge: game.image || IMAGE_NOT_FOUND.LRG_450x210,
      title: game.title,
    };
  });
});

const mapGameDetail = (state: GamesSliceState, id: string) => {
  const item: Game | undefined = [...state.games].find((game: Game) => {
    return game.id?.toString() === id;
  });

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
  }: any = item;

  const selectedItem: GameDetail = {
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
  return selectedItem;
};
