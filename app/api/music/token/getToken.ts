const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

const getToken = async (): Promise<{
  access_token: string;
  expires_in: number;
}> => {
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
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
  // console.log("getToken====", response);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to fetch token: ${error.error_description}`);
  }

  const data = await response.json();
  return { access_token: data.access_token, expires_in: data.expires_in };
};

export const getValidToken = async (): Promise<string> => {
  const now = Date.now();

  if (cachedToken && tokenExpiry && tokenExpiry > now) {
    // console.log("Token cached===", cachedToken);

    return cachedToken;
  }
  console.log("Token not cached===", cachedToken);
  const tokenResponse = await getToken();
  // console.log("tokenResponse======", tokenResponse);

  cachedToken = tokenResponse.access_token;
  tokenExpiry = now + tokenResponse.expires_in * 1000;

  return cachedToken;
};
