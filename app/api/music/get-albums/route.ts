import { getToken } from "../utils/getToken";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let token: string;

export const GET = async (ref: any) => {
  let data = await getAllAlbums();

  if (data?.error?.status === 401) {
    token = await getToken();
    data = await getAllAlbums();
  }
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
