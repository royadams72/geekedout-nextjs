import { MusicSliceState } from "@/lib/features/music/musicSlice";
import { Album } from "@/shared/interfaces/music";

export const musicDetailMock = {
  id: "1ZoZu4AeEVIKybGiGgOYdd",
  name: "Odyssey",
  artists: [
    {
      name: "Nubya Garcia",
      spotifyUrl: "https://open.spotify.com/artist/6O5k8LLRfDK8v9jj1GazAQ",
    },
  ],
  spotify_link: "https://open.spotify.com/album/1ZoZu4AeEVIKybGiGgOYdd",
  image: "https://i.scdn.co/image/ab67616d0000b273817e40fcecdbdc6ca4273daa",
  release_date: "2024-09-20",
  tracks: [
    "Dawn [ft. esperanza spalding]",
    "Odyssey",
    "Solstice",
    "Set It Free",
    "The Seer",
    "Odyssey - Outerlude",
    "We Walk In Gold [ft. Georgia Anne Muldrow]",
    "Water's Path",
    "Clarity",
    "In Other Words, Living",
    "Clarity - Outerlude",
    "Triumphance",
  ],
  category: "Music",
};

export const albumsArray: Album[] = [
  {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/7A0awCXkE1FtSU8B0qwOJQ",
        },
        href: "https://api.spotify.com/v1/artists/7A0awCXkE1FtSU8B0qwOJQ",
        id: "7A0awCXkE1FtSU8B0qwOJQ",
        name: "Jamie xx",
        type: "artist",
        uri: "spotify:artist:7A0awCXkE1FtSU8B0qwOJQ",
      },
    ],
    available_markets: ["AR", "AU", "AT", "BE", "CA", "CL"],
    external_urls: {
      spotify: "https://open.spotify.com/album/57MSBg5pBQZH5bfLVDmeuP",
    },
    href: "https://api.spotify.com/v1/albums/57MSBg5pBQZH5bfLVDmeuP",
    id: "57MSBg5pBQZH5bfLVDmeuP",
    images: [
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e023126a95bb7ed4146a80c7fc6",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048513126a95bb7ed4146a80c7fc6",
        width: 64,
      },
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2733126a95bb7ed4146a80c7fc6",
        width: 640,
      },
    ],
    name: "In Waves",
    release_date: "2024-09-20",
    release_date_precision: "day",
    total_tracks: 12,
    type: "album",
    uri: "spotify:album:57MSBg5pBQZH5bfLVDmeuP",
  },
  {
    album_type: "single",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/69qFe6XoI53jVctgtSug7d",
        },
        href: "https://api.spotify.com/v1/artists/69qFe6XoI53jVctgtSug7d",
        id: "69qFe6XoI53jVctgtSug7d",
        name: "OMSB",
        type: "artist",
        uri: "spotify:artist:69qFe6XoI53jVctgtSug7d",
      },
    ],
    available_markets: ["AD", "AE", "AL", "AM", "AT"],
    external_urls: {
      spotify: "https://open.spotify.com/album/6brj1boxfg5TEsI3Sr0jBf",
    },
    href: "https://api.spotify.com/v1/albums/6brj1boxfg5TEsI3Sr0jBf",
    id: "6brj1boxfg5TEsI3Sr0jBf",
    images: [
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e02f159eed170d4fd05cd075cd7",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d00004851f159eed170d4fd05cd075cd7",
        width: 64,
      },
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b273f159eed170d4fd05cd075cd7",
        width: 640,
      },
    ],
    name: "Bro",
    release_date: "2024-09-25",
    release_date_precision: "day",
    total_tracks: 1,
    type: "album",
    uri: "spotify:album:6brj1boxfg5TEsI3Sr0jBf",
  },
  {
    album_type: "album",
    artists: [
      {
        external_urls: {
          spotify: "https://open.spotify.com/artist/22RISwgVJyZu9lpqAcv1F5",
        },
        href: "https://api.spotify.com/v1/artists/22RISwgVJyZu9lpqAcv1F5",
        id: "22RISwgVJyZu9lpqAcv1F5",
        name: "Blossoms",
        type: "artist",
        uri: "spotify:artist:22RISwgVJyZu9lpqAcv1F5",
      },
    ],
    available_markets: ["ET", "XK"],
    external_urls: {
      spotify: "https://open.spotify.com/album/7xFJr8gwGjiWzyKV39882t",
    },
    href: "https://api.spotify.com/v1/albums/7xFJr8gwGjiWzyKV39882t",
    id: "7xFJr8gwGjiWzyKV39882t",
    images: [
      {
        height: 300,
        url: "https://i.scdn.co/image/ab67616d00001e028148cc95f85695e2399ebb33",
        width: 300,
      },
      {
        height: 64,
        url: "https://i.scdn.co/image/ab67616d000048518148cc95f85695e2399ebb33",
        width: 64,
      },
      {
        height: 640,
        url: "https://i.scdn.co/image/ab67616d0000b2738148cc95f85695e2399ebb33",
        width: 640,
      },
    ],
    name: "Gary",
    release_date: "2024-09-20",
    release_date_precision: "day",
    total_tracks: 10,
    type: "album",
    uri: "spotify:album:7xFJr8gwGjiWzyKV39882t",
  },
];

export const musicSliceMock: MusicSliceState = {
  music: {
    href: "https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20&locale=*",
    items: albumsArray,
    limit: 20,
    next: "https://api.spotify.com/v1/browse/new-releases?offset=20&limit=20&locale=*",
    offset: 0,
    previous: null,
    total: 100,
  },
};
