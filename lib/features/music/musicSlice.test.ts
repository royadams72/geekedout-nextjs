/**
 * @jest-environment node
 */

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
} from "@/lib/features/music/musicSlice";
import { MusicStore } from "@/shared/interfaces/music";
import { musicDetailMock, musicSliceMock } from "@/__mocks__/music.mocks";

import { rootStateMock } from "@/__mocks__/store.mocks";
describe("musicSlice", () => {
  let store: any;
  let musicStore: MusicStore;
  let state: MusicSliceState;
  // jest.mock("@/app/api/music/token/getToken", () => ({
  //   getValidToken: jest.fn(),
  //   refreshToken: jest.fn(),
  // }));
  jest.mock("@/app/api/music/token/getToken", () => ({
    getAlbumDetails: jest.fn(),
    // fetchAndRefreshTokenIfNeeded: jest.fn(),
  }));
  beforeEach(() => {
    // store = makeStore();
    musicStore = musicSliceMock.music;
    // state = store.getState();

    jest.clearAllMocks();
  });

  it("should handle setMusic action", () => {
    const newState = musicReducer(initialState, setMusic(musicStore));
    expect(newState.music).toEqual(musicStore);
  });

  it("selectAllAlbums should return all albums", () => {
    const albums = selectAllAlbums(rootStateMock);
    expect(albums.length).toBeGreaterThanOrEqual(1);
    // expect(albums[0].name).toBe("Test Album");
  });

  it("getMusicStore should fetch and return music data", async () => {
    const result = await fetchAndRefreshTokenIfNeeded(
      "http://localhost:3000/api/mocks/music/get-data",
      {}
    );
    console.log(result);

    // expect(result).toEqual({ music: musicStore });
    // expect(fetchAndRefreshTokenIfNeeded).toHaveBeenCalledTimes(1);
  });
  it("should fetch album details by calling getAlbumDetails", async () => {
    // Mock getAlbumDetails to return the expected value
    (getAlbumDetails as jest.Mock).mockResolvedValue(musicDetailMock);

    // Call getMusicDetails, which internally calls getAlbumDetails
    const result = await getMusicDetails("1ZoZu4AeEVIKybGiGgOYdd");

    // Verify that getAlbumDetails was called with the correct argument
    expect(getAlbumDetails).toHaveBeenCalledTimes(1);
    expect(getAlbumDetails).toHaveBeenCalledWith("1ZoZu4AeEVIKybGiGgOYdd");

    // Verify the final mapped result from getMusicDetails
    expect(result).toEqual(musicDetailMock);
  });
});
