export interface Album {
  album_type: string;
  artists: Artists[];
  available_markets: Array<string>;
  cookieData?: CookieData;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Images[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Images {
  height: number;
  url: string;
  width: number;
}

export interface ExternalUrls {
  spotify: string;
}

export interface Artists {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface ArtistDetails {
  name: string;
  spotifyUrl: string;
}
export interface MusicStore {
  cookieData?: CookieData;
  href?: string;
  items: Album[];
  limit?: number;
  next?: string;
  offset?: number;
  previous?: number | null;
  total?: number;
}
export interface CookieData {
  name: string;
  value: string;
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  path: string;
  expires: string;
}
export interface Tracks {
  href: string;
  items: [
    {
      artists: Array<Artists>;
      available_markets: Array<string>;
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_local: boolean;
      name: string;
      track_number: number;
      type: string;
      uri: string;
    }
  ];
  limit: number;
  next: number | null;
  offset: number;
  previous: number | null;
  total: number;
}

export interface AlbumDetail {
  artists: ArtistDetails[];
  category: string;
  cookieData?: CookieData;
  id: string;
  image: string;
  name: string;
  release_date: string;
  spotify_link: string;
  tracks: Array<string>;
}
