/**
 * @jest-environment node
 */
import { rootStateMock } from "@/__mocks__/store.mocks";
import { musicSliceMock } from "@/__mocks__/music/music.mocks";
import { musicDetailMockNotMapped } from "@/__mocks__/music/mockedMusiciItem";

import {
  setMusic,
  musicReducer,
  initialState,
  selectAllAlbums,
  fetchAndRefreshTokenIfNeeded,
  getMusicDetails,
  selectMusicPreviews,
} from "@/lib/features/music/musicSlice";

import { MusicStore } from "@/shared/interfaces/music";

import { refreshToken } from "@/app/api/music/token/getToken";

jest.mock("@/app/api/music/token/getToken", () => ({
  refreshToken: jest.fn(),
}));
jest.mock("@/lib/features/music/musicSlice", () => ({
  ...jest.requireActual("@/lib/features/music/musicSlice"),
  getAllMusicApi: jest.fn(),
}));

describe("musicSlice", () => {
  let musicStore: MusicStore;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    musicStore = musicSliceMock.music;
    global.fetch = jest.fn();

    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  it("should handle setMusic action", () => {
    const newState = musicReducer(initialState, setMusic(musicStore));
    expect(newState.music).toEqual(musicStore);
  });

  it("selectMusicPreviews should mapp and return all albums", () => {
    const previews = selectMusicPreviews(rootStateMock);

    expect(previews[0]).not.toHaveProperty("name");
    expect(previews[0]).toHaveProperty("title");
    expect(previews.length).toBeGreaterThanOrEqual(1);
  });

  it("selectAllAlbums should return all albums", () => {
    const albums = selectAllAlbums(rootStateMock);
    expect(albums.length).toBeGreaterThanOrEqual(1);
  });

  it("should throw an error if token is unavailable after refresh attempt for fetchAndRefreshTokenIfNeeded", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 401 })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });
    (refreshToken as jest.Mock).mockResolvedValueOnce(undefined);

    const response = await fetchAndRefreshTokenIfNeeded("http://fetch/url", {});

    expect(response).toEqual({});
    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it("should fetch album details and map to new object", async () => {
    const resultNotMapped = musicDetailMockNotMapped;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(resultNotMapped),
    });

    const resultMapped = await getMusicDetails(resultNotMapped.id);

    expect(resultNotMapped).toHaveProperty("external_urls");
    expect(resultMapped).not.toHaveProperty("external_urls");
    expect(resultMapped).toHaveProperty("spotify_link");
    expect(resultMapped).toHaveProperty("category");
  });

  it("should fetch album details and map to new object", async () => {
    const resultNotMapped = musicDetailMockNotMapped;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(resultNotMapped),
    });

    const resultMapped = await getMusicDetails(resultNotMapped.id);

    expect(resultMapped).not.toHaveProperty("external_urls");
    expect(resultMapped).toHaveProperty("spotify_link");
    expect(resultMapped).toHaveProperty("category");
  });

  it("should return empty object if no details to map", async () => {
    const item = musicDetailMockNotMapped;
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 300,
      json: async () => ({}),
    });

    const result = await getMusicDetails(item.id);

    expect(result).toEqual({});
  });
});
