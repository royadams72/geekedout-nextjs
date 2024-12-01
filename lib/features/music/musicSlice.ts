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
import { refreshToken } from "@/app/api/music/token/getToken";

import { isEmpty } from "@/utils/helpers";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const GET_DATA_FOLDER = process.env.NEXT_PUBLIC_GET_DATA_FOLDER;
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
  const response = await getAllMusicApi();
  return response;
  // return {
  //   music: isEmpty(response) ? ({} as MusicStore) : response.albums,
  // };
};

export const getMusicDetails = async (
  id: string
): Promise<AlbumDetail | {}> => {
  const selectedAlbum = await getAlbumDetails(id);

  return selectedAlbum;
};

export const getAllMusicApi = async () => {
  const response = await fetchAndRefreshTokenIfNeeded<any>(
    `${BASE_URL}/${MUSIC_API}/${GET_DATA_FOLDER}/`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  // console.log("getAllMusicApi response::", response);

  return response;
};

export const getAlbumDetails = async (id: string) => {
  const data = await fetchAndRefreshTokenIfNeeded<Album>(
    `${BASE_URL}/${MUSIC_API}/get-details?id=${id}`,
    {
      method: "POST",
    }
  );

  return mapAlbumDetail(data);
};

export const fetchAndRefreshTokenIfNeeded = async <T>(
  url: string,
  options: RequestInit
) => {
  try {
    let response = await fetch(url, options);
    if (response.status === 401) {
      await refreshToken();
      response = await fetch(url, options);
    }
    if (!response.ok && response.status !== 401) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data: T = await response.json();

    return data;
  } catch (error) {
    console.error(
      "Failed to fetch data: fetchAndRefreshTokenIfNeeded()",
      error
    );
    return {} as T;
  }
};

export const mapAlbumDetail = (item: Album): AlbumDetail | {} => {
  if (isEmpty(item)) {
    return {};
  }

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
