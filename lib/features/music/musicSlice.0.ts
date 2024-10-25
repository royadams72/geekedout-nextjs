/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { configureStore } from "@reduxjs/toolkit";

import {
  musicDetailMock,
  albumsArray,
  musicSliceMock,
} from "@/__mocks__/music.mocks";
import { appConfig } from "@/shared/constants/appConfig";
import { MusicStore } from "@/shared/interfaces/music";

import { getValidToken, refreshToken } from "@/app/api/music/token/getToken";
import { POST } from "@/app/api/music/get-details/route";

// import {
//   fetchAndRefreshTokenIfNeeded,
//   getAlbumDetails,
//   getMusicStore,
//   musicSlice,
//   MusicSliceState,
//   selectAllAlbums,
//   setMusic,
// } from "@/lib/features/music/musicSlice";
import { RootState } from "@/lib/store/store";
import { rootStateMock } from "@/__mocks__/store.mocks";
import * as MusicSlice from "@/lib/features/music/musicSlice";
const initialState: MusicSlice.MusicSliceState = {
  music: {
    href: "",
    items: [],
    limit: 0,
    next: "",
    offset: 0,
    previous: 0,
    total: 0,
  },
};

const MUSIC_API = "api/music";
let musicReducer = MusicSlice.musicSlice.reducer;
const makeStore = () => {
  return configureStore({
    reducer: musicReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
};
// jest.spyOn(MusicSlice, "fetchAndRefreshTokenIfNeeded").mockImplementation(() =>
//   Promise.resolve({
//     data: { albums: musicSliceMock.music },
//   })
// );

// jest.spyOn(MusicSlice, "getAllMusicApi").mockImplementation(() =>
//   Promise.resolve({
//     data: { albums: musicSliceMock.music },
//   })
// );
jest.mock("@/app/api/music/token/getToken", () => ({
  getValidToken: jest.fn(),
  refreshToken: jest.fn(),
}));
// jest.mock("@/lib/features/music/musicSlice", () => ({
//   ...jest.requireActual("@/lib/features/music/musicSlice"),
//   getAlbumDetails: jest.fn(),
//   getMusicDetails: jest.fn(),
//   fetchAndRefreshTokenIfNeeded: jest.fn(() =>
//     Promise.resolve({
//       data: { albums: musicSliceMock.music },
//     })
//   ),
//   getAllMusicApi: jest.fn(),
//   // fetchAndRefreshTokenIfNeeded: jest.fn(),
// }));
const rootState = rootStateMock;
fdescribe("musicSlice", () => {
  let store: any;
  let musicStore: MusicStore;
  let state: MusicSlice.MusicSliceState;
  beforeEach(() => {
    store = makeStore();
    musicStore = musicSliceMock.music;
    state = store.getState();

    jest.clearAllMocks();
  });

  it("should fetch and return the comics store", async () => {
    state = initialState;

    // console.log("music state:", state);

    // state = await MusicSlice.getMusicStore();
    await MusicSlice.getAllMusicApi();
    // console.log("music state:", state);
    // expect(state.music.items.length).toBeGreaterThanOrEqual(1);
    // expect(state.music.items[0].name).toBe("In Waves");
  });
});
