import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiGames = createApi({
  reducerPath: "apiGames",
  tagTypes: ["Games"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://5fgecpaslh.execute-api.eu-west-2.amazonaws.com/stagev1",
    method: "GET",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getGames: builder.query({
      query: () => "/games",
      providesTags: (result, error, id) => [{ type: "Games", id }],
    }),
  }),
});

export const { useGetGamesQuery } = apiGames;
