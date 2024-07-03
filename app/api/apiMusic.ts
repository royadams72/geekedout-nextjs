import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
// MDcxMmNhOTc0ZmIyNDE4YjlhMjUxOTIzMjA0MWI2ZDI6NGJjYTU1MGJlNzljNDFkZThjOTQ1MTI5MzJmZjJmNWM
// import { tokenReceived, loggedOut } from './authSlice'
const SPOTIFY_CLIENT_ID = "0712ca974fb2418b9a2519232041b6d2";
const SPOTIFY_CLIENT_SECRET = "4bca550be79c41de8c94512932ff2f5c";
const clientID = SPOTIFY_CLIENT_ID;
const clientSecret = SPOTIFY_CLIENT_SECRET;
type BaseQueryType = ReturnType<typeof fetchBaseQuery>;

let token = "";
const baseQueryWithReauth: (baseQuery: BaseQueryType) => BaseQueryType =
  (baseQuery) => async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);
    if (
      (result.error && result.error.status === 401) ||
      (result.error && result.error.status === 400)
    ) {
      // try to get a new token
      const refreshResult = await fetch(
        `https://accounts.spotify.com/api/token`,
        {
          method: "POST",
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
          headers: {
            Authorization:
              "Basic " +
              new Buffer(clientID + ":" + clientSecret).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const data = await refreshResult.json();
      if (data) {
        token = data.access_token;
        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Error code
      }
    }
    return result;
  };

const productBaseQuery = fetchBaseQuery({
  baseUrl: "https://api.spotify.com/v1/",
  prepareHeaders: (headers) => {
    headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const apiMusic = createApi({
  reducerPath: "apiMusic",
  baseQuery: baseQueryWithReauth(productBaseQuery),
  endpoints: (builder) => ({
    getMusic: builder.query({
      query: () => "browse/new-releases?limit=20&country=GB",
    }),
    getAlbum: builder.query({
      query: (id) => `albums/${id}`,
    }),
    getSearch: builder.query({
      query: (query: string) => `search?q=${query}&type=album`,
    }),
  }),
});

export const { useGetMusicQuery, useGetAlbumQuery, useGetSearchQuery } =
  apiMusic;
