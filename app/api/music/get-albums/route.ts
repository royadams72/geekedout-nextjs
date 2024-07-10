import { getToken } from "../token/getToken";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let token: string;

export const GET = async (ref: any) => {
  let data;
  await getAllAlbums()
    .then((response) => {
      if (response.error) {
        throw response;
      }
      data = response;
    })
    .catch(async (error) => {
      if (error.error.status === 401) {
        token = await getToken().then((data = await getAllAlbums()));
      }
    });
  return Response.json({ data });
};

const getAllAlbums = async () => {
  const albums = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?limit=20&country=GB`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await albums.json();
};
