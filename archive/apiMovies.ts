import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } from "@aws-sdk/client-secrets-manager";

// const secret_name = "movies_api_key";

// const client = new SecretsManagerClient({
//   region: "eu-west-2",
// });

// let response;

// try {
//   response = await client.send(
//     new GetSecretValueCommand({
//       SecretId: secret_name,
//       VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//     })
//   );
// } catch (error) {
//   // For a list of exceptions thrown, see
//   // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//   throw error;
// }

//
export const apiMovies = createApi({
  reducerPath: "apiMovies",
  tagTypes: ["Movies"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://5fgecpaslh.execute-api.eu-west-2.amazonaws.com/stagev1",
    method: "GET",
    mode: "cors",
  }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () =>
        "/movies?api_key=ec6dbc198ab2edc5acd6c1e1a3336c72&language=en-GB&pageNum=1&region=GB",
      providesTags: (result, error, id) => [{ type: "Movies", id }],
    }),
  }),
});

export const { useGetMoviesQuery } = apiMovies;
