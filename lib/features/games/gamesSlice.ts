import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import { Game } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { ImageNotFound } from "@/shared/enums/image-not-found.enum";

export interface GamesSliceState {
  games: Game[];
}

export const initialState: GamesSliceState = {
  games: [],
};

export const gamesSlice = createAppSlice({
  name: CategoryType.GAMES,
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
        category: CategoryType.GAMES,
        id: game.id,
        imageLarge: game.image || ImageNotFound.LRG_450x210,
        title: game.title,
      };
    })
);
