import {
  getGamesStore,
  selectGames,
  getAllGames,
  selectGamesPreviews,
  gamesSlice,
  initialState,
  setGames,
  GamesSliceState,
  setGameDetails,
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

  it("should fetch the games from the API ", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(gamesFullDetailMockArray),
    });
    const result = (await getGamesStore()) as GamesSliceState;

    expect(result.games).toEqual(gamesFullDetailMockArray);
  });

  it("should return empty array for getGamesStore() if no games loaded ", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => undefined,
    });

    const result = (await getGamesStore()) as GamesSliceState;

    expect(result.games).toEqual([]);

    consoleErrorMock.mockRestore();
  });

  it("should return empty array for getAllGames() if response is not ok ", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 200,
      json: async () => undefined,
    });

    const result = (await getGamesStore()) as GamesSliceState;

    expect(result.games).toEqual([]);

    consoleErrorMock.mockRestore();
  });

  it("should return an empty array from getGamesStore() if error from API/getAllGames()", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch game details:")
    );

    const result = (await getGamesStore()) as GamesSliceState;

    expect(result.games).toEqual([]);

    expect(consoleErrorMock).toHaveBeenCalledWith(
      "data was not loaded getAllGames()"
    );

    consoleErrorMock.mockRestore();
  });

  it("should set and map the game details with data from the store ", async () => {
    const gameDetail = await setGameDetails(gamesSliceMock, "2677");
    expect(gameDetail).not.toHaveProperty("title");
    expect(gameDetail).toHaveProperty("name");
  });

  it("should empty game details if no data", async () => {
    const gameDetail = await setGameDetails(gamesSliceMock, "9999");
    expect(gameDetail).toEqual({});
  });
});
