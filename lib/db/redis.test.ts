import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";
import { gamesSliceMock } from "@/__mocks__/games.mocks";
import { movieSliceMock } from "@/__mocks__/movies/movies.mocks";
import { musicSliceMock } from "@/__mocks__/music/music.mocks";

import { saveDBData, getDBData } from "./redis";

jest.mock("ioredis", () => require("ioredis-mock"));

jest.mock("@/app/api/music/token/getToken", () => ({
  refreshToken: jest.fn(),
}));

jest.mock("@/lib/features/comics/comicsSlice", () => ({
  setComicDetailsFromRedis: jest.fn(),
  mapComicDetail: jest.fn(),
}));

describe("Redis Cache Functions", () => {
  const sessionId = "test-session-id";
  const mockState = {
    comics: comicSliceMock,
    games: gamesSliceMock,
    movies: movieSliceMock,
    music: musicSliceMock,
  };

  beforeEach(async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    await saveDBData(sessionId, { state: mockState });
  });

  afterEach(async () => {
    // Clear Redis after each test
    const Redis = require("ioredis-mock");
    const redis = new Redis();
    await redis.flushall();
  });

  it("should save and retrieve session data", async () => {
    const data = await getDBData(sessionId);
    expect(data).toEqual({ state: mockState });
  });
});
