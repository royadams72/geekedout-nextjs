export interface Album {
    album_type: string;
    artists: Artists[];
    available_markets: Array<string>;
    copyrights: Array<{}>;
    external_ids: object;
    external_urls: ExternalUrls;
    genres: [];
    href: string;
    id: string;
    images: Images[];
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Images {
    height: number; url: string; width: number;
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
    href?: string;
    items: Album[] | AlbumDetail[];
    limit?: number;
    next?: string;
    offset?: number;
    previous?: number;
    total?: number;
}

export interface Tracks {
    href: string;
    items: [{
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
    }];
    limit: number;
    next: number | null;
    offset: number;
    previous: number | null;
    total: number;
}

export interface AlbumDetail {
    artists: ArtistDetails[];
    image: string;
    name: string;
    release_date: string;
    spotify_link: string;
    tracks: Array<string>;
}
