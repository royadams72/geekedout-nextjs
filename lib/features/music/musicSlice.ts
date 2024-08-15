import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store/store";
import {
  Album,
  AlbumDetail,
  Artists,
  MusicStore,
} from "@/shared/interfaces/music";
import { StateLoading } from "@/shared/enums/loading";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
// import { fetchToken } from "@/app/api/music/token/route";

export interface MusicSliceState {
  music: MusicStore;
  status: StateLoading.IDLE | StateLoading.LOADING | StateLoading.FAILED;
  selectedAlbum: AlbumDetail;
}

const initialState: MusicSliceState = {
  music: {} as MusicStore,
  status: StateLoading.IDLE,
  selectedAlbum: {} as AlbumDetail,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const musicSlice = createAppSlice({
  name: "music",
  initialState,
  reducers: (create) => ({
    getMusic: create.asyncThunk(
      async () => {
        let data = await getAllMusicApi();
        return data.data.albums;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.music = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
    getAlbum: create.asyncThunk(
      async (id: string) => {
        let data = await getAlbumDetails(id);
        return data;
      },
      {
        pending: (state) => {
          state.status = StateLoading.LOADING;
        },
        fulfilled: (state, action) => {
          state.status = StateLoading.IDLE;
          state.selectedAlbum = action.payload;
        },
        rejected: (state) => {
          state.status = StateLoading.FAILED;
        },
      }
    ),
    clearAlbumDetails: create.reducer((state) => {
      state.selectedAlbum = {} as AlbumDetail;
    }),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectStatus: (state) => state.status,
    selectAllAlbums: (state) => state?.music?.items,
    selectAlbumDetail: (state) => state?.selectedAlbum,
  },
});

// Action creators are generated for each case reducer function.
export const { getMusic, getAlbum, clearAlbumDetails } = musicSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectStatus, selectAllAlbums, selectAlbumDetail } =
  musicSlice.selectors;
//
export const musicReducer = musicSlice.reducer;
// Helper functions

const getAllMusicApi = async () => {
  const response = await fetch("http://localhost:3000/api/music/get-albums");
  const data = await response.json();
  return data;
};

const getAlbumDetails = async (id: string) => {
  const response = await fetch(`/api/music/get-details?id=${id}`);
  const data = await response.json();

  const album = mapAlbumDetail(data.data);
  console.log(album);
  return album;
};

const mapAlbumDetail = (item: any) => {
  const {
    id,
    name,
    artists: artistArray,
    images: [, { url: image }],
    external_urls: { spotify: spotifyLink },
    release_date,
    tracks: { items },
  }: any = item;
  const tracks = items.map((arrayItem: Artists) => arrayItem.name);
  const artists = artistArray.map((arrayItem: Artists) => ({
    name: arrayItem.name,
    spotifyUrl: arrayItem.external_urls.spotify,
  }));

  const selectedItem: AlbumDetail = {
    id,
    name,
    artists,
    spotify_link: spotifyLink,
    image,
    release_date,
    tracks,
    category: "Music",
  };

  return selectedItem;
};

export const selectMusicPreview = createSelector(
  selectAllAlbums,
  (arr: Album[]) => {
    return arr?.map((album) => {
      const isImages =
        album.images !== undefined ? album.images.length > 0 : undefined;
      return {
        category: CategoryType.Music,
        id: album.id,
        imageLarge: isImages ? `${album.images[0].url}` : IMAGE_NOT_FOUND.SM,
        imageSmall: isImages ? `${album.images[1].url}` : IMAGE_NOT_FOUND.SM,
        title: album.name,
      };
    });
  }
);
