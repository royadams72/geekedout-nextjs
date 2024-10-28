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
const MUSIC_API = "api/music";

export const musicSlice = createAppSlice({
  name: CategoryType.Music,
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

// import * as MusicSlice from "@/lib/features/music/musicSlice";
export const selectAllAlbums = createSelector(
  (state: RootState) => state.music.music?.items || [],
  (items) => items.filter((item) => item !== null)
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

export const getMusicStore = async (): Promise<MusicSliceState> => {
  let response;
  try {
    response = await getAllMusicApi();

    if (!response) {
      throw new Error(`data was not loaded`);
    }
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    throw error;
  }
  return {
    music: response.albums || {},
  };
};

export const getMusicDetails = async (id: string): Promise<AlbumDetail> => {
  const selectedAlbum = await getAlbumDetails(id);

  if (!selectedAlbum) {
    throw new Error(`data was not loaded`);
  }
  return selectedAlbum;
};

export const fetchAndRefreshTokenIfNeeded = async <T>(
  url: string,
  options: RequestInit
) => {
  let response = await fetch(url, options);
  if (response.status === 401) {
    await refreshToken();
    response = await fetch(url, options);
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data: T = await response.json();
  // console.log("fetchAndRefreshTokenIfNeeded():", data);

  return data;
};
export interface ApiResponse {
  data: { albums: MusicStore };
}
export const getAllMusicApi = async () => {
  const response = await fetchAndRefreshTokenIfNeeded<ApiResponse>(
    `${appConfig.url.BASE_URL}/${MUSIC_API}/${GET_DATA_FOLDER}/`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  return response.data;
};

export const getAlbumDetails = async (id: string) => {
  try {
    const data = await fetchAndRefreshTokenIfNeeded<Album>(
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

const mapAlbumDetail = (item: Album): AlbumDetail => {
  const {
    id,
    name,
    artists: artistArray,
    images,
    external_urls: { spotify: spotifyLink } = { spotify: "" },
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
    spotify_link: spotifyLink || "",
    image: images?.[0]?.url || IMAGE_NOT_FOUND.SM,
    release_date,
    tracks,
    category: "Music",
  };
};
