import { createSelector, type PayloadAction } from "@reduxjs/toolkit";

import { createAppSlice } from "@/lib/store/createAppSlice";
import { RootState } from "@/lib/store/store";

import {
  Album,
  AlbumDetail,
  Artists,
  MusicStore,
} from "@/shared/interfaces/music";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { ImageNotFound } from "@/shared/enums/image-not-found.enum";

import { isEmpty } from "@/lib/utils/validation";

export interface MusicSliceState {
  music: MusicStore;
}
export interface ApiResponse {
  albums: MusicStore;
}

export const initialState: MusicSliceState = {
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

export const musicSlice = createAppSlice({
  name: CategoryType.MUSIC,
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<MusicStore>) => {
      state.music = action.payload;
    },
  },
  selectors: {},
});

export const { setMusic } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;

export const selectAllAlbums = createSelector(
  (state: RootState) => state.music.music?.items || [],
  (items) => items.filter((item) => item !== null)
);

export const selectMusicPreviews = createSelector(
  selectAllAlbums,
  (albums: Album[]) =>
    albums?.map((album) => ({
      category: CategoryType.MUSIC,
      id: album.id,
      imageLarge: album.images?.[0]?.url || ImageNotFound.SM,
      imageSmall: album.images?.[1]?.url || ImageNotFound.SM,
      title: album.name,
    }))
);
