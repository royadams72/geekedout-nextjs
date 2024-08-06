// // const clientID = process.env.SPOTIFY_CLIENT_ID;
// // const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
// // export const GET = async () => {
// //   const token = await fetch(`https://accounts.spotify.com/api/token`, {
// //     method: "POST",
// //     body: new URLSearchParams({
// //       grant_type: "client_credentials",
// //     }),
// //     headers: {
// //       Authorization:
// //         "Basic " + new Buffer(clientID + ":" + clientSecret).toString("base64"),
// //       "Content-Type": "application/x-www-form-urlencoded",
// //     },
// //   });
// //   const data = await token.json();
// //   console.log("token==========================", data);

// //   return Response.json({ data });
// // };

// const clientID = process.env.SPOTIFY_CLIENT_ID;
// const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

// export const GET = async () => {
//   const tokenResponse = await fetch(`https://accounts.spotify.com/api/token`, {
//     method: "POST",
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//     }),
//     headers: {
//       Authorization:
//         "Basic " +
//         Buffer.from(`${clientID}:${clientSecret}`).toString("base64"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//   const data = await tokenResponse.json();

//   return new Response(JSON.stringify({ data }), { status: 200 });
// };
import { NextResponse } from "next/server";
const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const GET = async () => {
  const data = await getToken();

  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getToken = async () => {
  const tokenResponse = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientID}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await tokenResponse.json();
  const token = data.access_token;
  console.log("access token =====", token);

  // Set token in a cookie
  // const response = NextResponse.json({ token });
  // console.log("token route =====", response);
  // response.cookies.set("spotify_token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: data.expires_in, // usually expires_in is given in seconds
  //   path: "/",
  // });

  return token;
};
