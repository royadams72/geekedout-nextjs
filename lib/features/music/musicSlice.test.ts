/**
 * @jest-environment node
 */
import { rootStateMock } from "@/__mocks__/store.mocks";
import { musicSliceMock } from "@/__mocks__/music/music.mocks";

import {
  setMusic,
  musicReducer,
  initialState,
  selectAllAlbums,
  selectMusicPreviews,
} from "@/lib/features/music/musicSlice";

import { MusicStore } from "@/types/interfaces/music";

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
});
