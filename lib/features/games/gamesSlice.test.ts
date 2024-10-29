import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import { Game, GameDetail } from "@/shared/interfaces/game";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { appConfig } from "@/shared/constants/appConfig";
import { GET_DATA_FOLDER } from "@/shared/constants/urls";
import {
  getGamesStore,
  selectGames,
  getAllGames,
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

fdescribe("gamseSlice", () => {
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
    const result = await getGamesStore();

    expect(result.games).toEqual(gamesFullDetailMockArray);
  });

  it("should throw error for getGamesStore() if no games loaded ", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => undefined,
    });

    (getAllGames as jest.Mock).mockRejectedValueOnce(undefined);
    await expect(getGamesStore()).rejects.toThrow("data was not loaded");

    consoleErrorMock.mockRestore();
  });

  it("should throw error for getAllGames() if response is not ok ", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 200,
      json: async () => undefined,
    });

    await expect(getGamesStore()).rejects.toThrow(
      "Network response was not ok"
    );

    consoleErrorMock.mockRestore();
  });
  it("should fetch the games from the API ", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to fetch game details:")
    );
    await expect(getGamesStore()).rejects.toThrow(
      "Failed to fetch game details:"
    );
    consoleErrorMock.mockRestore();
  });
  it("should set the game details with data from the store ", async () => {});
});
