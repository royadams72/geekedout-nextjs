import {
  selectGames,
  selectGamesPreviews,
  gamesSlice,
  initialState,
  setGames,
} from "@/lib/features/games/gamesSlice";
import { rootStateMock } from "@/__mocks__/store.mocks";

import { gamesFullDetailMockArray } from "@/__mocks__/games.mocks";

jest.mock("@/lib/features/games/gamesSlice", () => ({
  ...jest.requireActual("@/lib/features/games/gamesSlice"),
  getAllGames: jest.fn(),
}));

describe("gamseSlice", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("should set the games array when action called", () => {
    const newState = gamesSlice.reducer(
      initialState,
      setGames(gamesFullDetailMockArray)
    );
    expect(newState.games.length).toBeGreaterThanOrEqual(1);
  });

  it("should select the games array", () => {
    const games = selectGames(rootStateMock);
    expect(games.length).toBeGreaterThanOrEqual(1);
  });

  it("should select the games array", () => {
    const previews = selectGamesPreviews(rootStateMock);
    expect(previews[0]).not.toHaveProperty("users");
    expect(previews[0]).toHaveProperty("category");
  });
});
