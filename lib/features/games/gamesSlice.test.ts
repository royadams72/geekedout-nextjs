import {
  selectGames,
  selectGamesPreviews,
  gamesSlice,
  initialState,
  setGames,
  GamesSliceState,
  setGameDetailsFromRedis,
} from "@/lib/features/games/gamesSlice";
import { rootStateMock } from "@/__mocks__/store.mocks";

import {
  gamesFullDetailMockArray,
  gamesSliceMock,
} from "@/__mocks__/games.mocks";

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

  it("should set and map the game details with data from the store ", async () => {
    const gameDetail = await setGameDetailsFromRedis(gamesSliceMock, "2677");
    expect(gameDetail).not.toHaveProperty("title");
    expect(gameDetail).toHaveProperty("name");
  });

  it("should empty game details if no data", async () => {
    const gameDetail = await setGameDetailsFromRedis(gamesSliceMock, "9999");
    expect(gameDetail).toEqual({});
  });
});
