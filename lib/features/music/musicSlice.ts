import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/lib/store/createAppSlice";
import {
  Album,
  AlbumDetail,
  Artists,
  MusicStore,
} from "@/shared/interfaces/music";
import { StateLoading } from "@/shared/enums/loading";
import { CategoryType } from "@/shared/enums/category-type.enum";
import { IMAGE_NOT_FOUND } from "@/shared/enums/image-not-found.enum";
import { refreshToken } from "@/app/api/music/token/getToken";

export interface MusicSliceState {
  music: MusicStore;
  status: StateLoading;
}

const initialState: MusicSliceState = {
  music: {} as MusicStore,
  status: StateLoading.IDLE,
};

const fetchWithTokenRefresh = async (url: string, options: RequestInit) => {
  let response = await fetch(url, options);
  if (response.status === 401) {
    console.log("Token expired or invalid, refreshing token...");
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
  selectors: {
    selectStatus: (state) => state.status,
    selectAllAlbums: (state) => state.music.items || [],
  },
});

export const { setMusic } = musicSlice.actions;

export const { selectStatus, selectAllAlbums } = musicSlice.selectors;

export const musicReducer = musicSlice.reducer;

export const getMusicDetailsServerSide = async (
  id: string
): Promise<AlbumDetail> => {
  console.log("getMusicDetailsServerSide======", id);
  const selectedAlbum = await getAlbumDetails(id);
  if (!selectedAlbum) {
    throw new Error(`data was not loaded`);
  }
  return selectedAlbum;
};

const getAllMusicApi = async () => {
  console.log("Fetching music ...");
  const data = await fetchWithTokenRefresh(
    "http://localhost:3000/api/music/get-data",
    {
      method: "GET",
    }
  );
  return data;
};

export const getMusicStore = async (): Promise<MusicSliceState> => {
  let musicStore;
  let status = StateLoading.LOADING;
  try {
    musicStore = await getAllMusicApi();
    if (!musicStore) {
      status = StateLoading.FAILED;
      throw new Error(`data was not loaded`);
    }
    status = StateLoading.IDLE;
  } catch (error) {
    status = StateLoading.FAILED;
    console.error("Failed to fetch album details:", error);
    throw error;
  }
  return {
    music: musicStore.data?.albums || [],
    status,
  };
};

const getAlbumDetails = async (id: string) => {
  console.log("Fetching album details...");
  const data = await fetchWithTokenRefresh(
    `http://localhost:3000/api/music/get-details?id=${id}`,
    {
      method: "POST",
    }
  );
  return mapAlbumDetail(data.data);
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

export const selectMusicPreview = createSelector(
  selectAllAlbums,
  (arr: Album[]) => {
    return arr.map((album) => ({
      category: CategoryType.Music,
      id: album.id,
      imageLarge: album.images?.[0]?.url || IMAGE_NOT_FOUND.SM,
      imageSmall: album.images?.[1]?.url || IMAGE_NOT_FOUND.SM,
      title: album.name,
    }));
  }
);
