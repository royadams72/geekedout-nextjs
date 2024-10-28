/**
 * @jest-environment node
 */
import { rootStateMock } from "@/__mocks__/store.mocks";
import { MusicStore } from "@/shared/interfaces/music";
import { musicDetailMock, musicSliceMock } from "@/__mocks__/music.mocks";

import {
  setMusic,
  musicReducer,
  initialState,
  MusicSliceState,
  selectAllAlbums,
  fetchAndRefreshTokenIfNeeded,
  getMusicStore,
  getAlbumDetails,
  getMusicDetails,
  getAllMusicApi,
} from "@/lib/features/music/musicSlice";

import { refreshToken } from "@/app/api/music/token/getToken";

jest.mock("@/app/api/music/token/getToken", () => ({
  refreshToken: jest.fn(),
}));
jest.mock("@/lib/features/music/musicSlice", () => ({
  ...jest.requireActual("@/lib/features/music/musicSlice"),
  getAllMusicApi: jest.fn(),
}));
fdescribe("musicSlice", () => {
  let store: any;
  let musicStore: MusicStore;
  let state: MusicSliceState;

  beforeEach(() => {
    // store = makeStore();
    musicStore = musicSliceMock.music;
    // state = store.getState();
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("should handle setMusic action", () => {
    const newState = musicReducer(initialState, setMusic(musicStore));
    expect(newState.music).toEqual(musicStore);
  });

  it("selectAllAlbums should return all albums", () => {
    const albums = selectAllAlbums(rootStateMock);
    expect(albums.length).toBeGreaterThanOrEqual(1);
  });

  it("should fetch music store data successfully", async () => {
    const mockResponse = {
      data: {
        albums: musicSliceMock.music,
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await getMusicStore();

    expect(result.music).toEqual(mockResponse.data.albums);
  });

  it("should throw an error if no data is returned from getAllMusicApi", async () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 300,
      json: async () => ({}),
    });

    await expect(getMusicStore()).rejects.toThrow("data was not loaded");

    consoleErrorMock.mockRestore();
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

    await expect(
      fetchAndRefreshTokenIfNeeded("http://fetch/url", {})
    ).rejects.toThrow("Network response was not ok: Internal Server Error");

    expect(refreshToken).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
