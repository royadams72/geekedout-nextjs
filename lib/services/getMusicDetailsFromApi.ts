import { ImageNotFound } from "@/types/enums/image-not-found.enum";
import { AlbumDetail, Album, Artists } from "@/types/interfaces/music";
import { isEmpty } from "../utils/validation";
import { getCookie } from "../actions/getCookie";
import { CookieNames } from "@/types/enums/cookie-names.enum";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const MUSIC_API = "api/music";
let cookieData: any = null;

export const getMusicDetailsFromApi = async (id: number): Promise<any> => {
  const spotify_token = await getCookie(CookieNames.SPOTIFY_TOKEN);
  const response = await fetch(
    `${BASE_URL}/${MUSIC_API}/get-details?id=${id}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: `spotify_token=${spotify_token}`,
      },
    }
  );

  const data = await response.json();
  const item = mapAlbumDetail(data);
  cookieData = await getCookieFromResponse(response);

  return { item, cookieData };
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
    cookieData,
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
    image: images?.[0]?.url || ImageNotFound.SM,
    release_date,
    tracks,
    category: "Music",
    cookieData,
  };
};

export const getCookieFromResponse = async (res: Response) => {
  const musicCookie = res.headers.get("Set-Cookie");
  if (musicCookie) {
    return musicCookie;
  }
};
