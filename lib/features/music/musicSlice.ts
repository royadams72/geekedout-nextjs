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
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { appConfig } from "@/shared/constants/appConfig";

import { refreshToken } from "@/app/api/music/token/getToken";
import { GET_DATA_FOLDER } from "@/shared/constants/urls";

export interface MusicSliceState {
  music: MusicStore;
}

const initialState: MusicSliceState = {
  music: {} as MusicStore,
};
const MUSIC_API = "api/music";

const fetchWithTokenRefresh = async (url: string, options: RequestInit) => {
  let response = await fetch(url, options);
  if (response.status === 401) {
    await refreshToken();
    response = await fetch(url, options);
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  return response.json();
};

export const musicSlice = createAppSlice({
  name: CategoryType.Music,
  initialState,
  reducers: {
    setMusic: (state, action: PayloadAction<MusicStore>) => {
      state.music = action.payload;
    },
  },
  selectors: { selectAllAlbums: (state) => state.music.items || [] },
});

export const { setMusic } = musicSlice.actions;
export const musicReducer = musicSlice.reducer;

export const selectAllAlbums = createSelector(
  (state: RootState) => state?.music.music?.items || [],
  (items) => items
);

export const selectMusicPreviews = createSelector(
  selectAllAlbums,
  (albums: Album[]) =>
    albums?.map((album) => ({
      category: CategoryType.Music,
      id: album.id,
      imageLarge: album.images?.[0]?.url || IMAGE_NOT_FOUND.SM,
      imageSmall: album.images?.[1]?.url || IMAGE_NOT_FOUND.SM,
      title: album.name,
    }))
);

export const getMusicDetails = async (id: string): Promise<AlbumDetail> => {
  const selectedAlbum = await getAlbumDetails(id);

  if (!selectedAlbum) {
    throw new Error(`data was not loaded`);
  }
  return selectedAlbum;
};

const getAllMusicApi = async () => {
  const data = await fetchWithTokenRefresh(
    `${appConfig.url.BASE_URL}/${MUSIC_API}/${GET_DATA_FOLDER}/`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  return data;
};

export const getMusicStore = async (): Promise<MusicSliceState> => {
  let musicStore;
  try {
    musicStore = await getAllMusicApi();
    if (!musicStore) {
      throw new Error(`data was not loaded`);
    }
  } catch (error) {
    console.error("Failed to fetch album details:", error);
    throw error;
  }
  return {
    music: musicStore.data?.albums || [],
  };
};

const getAlbumDetails = async (id: string) => {
  try {
    const data = await fetchWithTokenRefresh(
      `${appConfig.url.BASE_URL}/${MUSIC_API}/get-details?id=${id}`,
      {
        method: "POST",
      }
    );
    return mapAlbumDetail(data);
  } catch (error) {
    console.error(`Failed to fetch movie details: ${error}`);
    throw error;
  }
};

const mapAlbumDetail = (item: any): AlbumDetail => {
  const {
    id,
    name,
    artists: artistArray,
    images,
    external_urls: { spotify: spotifyLink },
    release_date,
    tracks: { items },
  }: any = item;

  const tracks = items.map((arrayItem: Artists) => arrayItem.name);
  const artists = artistArray.map((arrayItem: Artists) => ({
    name: arrayItem.name,
    spotifyUrl: arrayItem.external_urls.spotify,
  }));

  return {
    id,
    name,
    artists,
    spotify_link: spotifyLink,
    image: images?.[0]?.url || IMAGE_NOT_FOUND.SM,
    release_date,
    tracks,
    category: "Music",
  };
};
