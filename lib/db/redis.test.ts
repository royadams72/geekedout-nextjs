import {
  comicDetailMock,
  comicSliceMock,
} from "@/__mocks__/comics/comics.mocks";
import { gamesSliceMock } from "@/__mocks__/games.mocks";
import { movieSliceMock } from "@/__mocks__/movies/movies.mocks";
import { musicSliceMock } from "@/__mocks__/music/music.mocks";

import { refreshToken } from "@/app/api/music/token/getToken";

import { CategoryType } from "@/shared/enums/category-type.enum";

import {
  saveSessionData,
  getStoreData,
  getCategoryByName,
  getItem,
} from "./redis";

import { Comic, ComicDetail } from "@/shared/interfaces/comic";
import { setComicDetailsFromRedis } from "@/lib/features/comics/comicsSlice";

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
    await saveSessionData(sessionId, { state: mockState });
  });

  afterEach(async () => {
    // Clear Redis after each test
    const Redis = require("ioredis-mock");
    const redis = new Redis();
    await redis.flushall();
  });

  it("should save and retrieve session data", async () => {
    const data = await getStoreData(sessionId);
    expect(data).toEqual({ state: mockState });
  });

  it("should retrieve category data from cache", async () => {
    const comicsData = await getCategoryByName(sessionId, CategoryType.Comics);
    expect(comicsData).toEqual(mockState.comics);
  });

  it("should handle non-existent category gracefully", async () => {
    const nonExistentCategory = await getCategoryByName(
      sessionId,
      "non-existent-category"
    );
    expect(nonExistentCategory).toBeNull();
  });

  it("should retrieve item data from cache by item id", async () => {
    const item = mockState.comics.comics.results[0] as Comic;
    const mappedItem = comicDetailMock;
    (setComicDetailsFromRedis as jest.Mock).mockResolvedValueOnce(mappedItem);

    const comicDetailsData = await getItem(
      sessionId,
      CategoryType.Comics,
      item.id as string
    );

    expect(item.title).toEqual(mappedItem.name);
    expect(item.id).toEqual(mappedItem.id);
  });

  it("should throw error if item data cannot be retrieved", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    await getItem(sessionId, "fake_category", "12345");

    expect(consoleErrorMock).toHaveBeenCalled();
  });
});
