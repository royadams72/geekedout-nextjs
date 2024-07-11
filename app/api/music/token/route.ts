const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
export const GET = async () => {
  const token = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      Authorization:
        "Basic " + new Buffer(clientID + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  const data = await token.json();
  // console.log(data);

  return Response.json({ data });
};
