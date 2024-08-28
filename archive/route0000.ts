const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const POST = async () => {
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

  return token;
};
