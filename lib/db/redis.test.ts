import { comicSliceMock } from "@/__mocks__/comics/comics.mocks";
import { gamesSliceMock } from "@/__mocks__/games.mocks";
import { movieSliceMock } from "@/__mocks__/movies/movies.mocks";
import { musicSliceMock } from "@/__mocks__/music/music.mocks";

import { saveDBData, getDBData } from "./redis";

jest.mock("ioredis", () => require("ioredis-mock"));
jest.mock("@/lib/features/comics/comicsSlice", () => ({
  setComicDetailsFromRedis: jest.fn(),
  mapComicDetail: jest.fn(),
}));
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
describe("Redis Cache Functions", () => {
  process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
  const sessionId = "test-session-id";
  const mockState = {
    comics: comicSliceMock,
    games: gamesSliceMock,
    movies: movieSliceMock,
    music: musicSliceMock,
  };

  beforeEach(async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
    jest.spyOn(console, "error").mockImplementation(() => {});
    await saveDBData(sessionId, { state: mockState });
  });

  afterEach(async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
    const Redis = require("ioredis-mock");
    const redis = new Redis();
    await redis.flushall();
  });

  it("should save and retrieve session data", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
    const data = await getDBData(sessionId);
    expect(data).toEqual({ state: mockState });
  });
});
