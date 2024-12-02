import { NextRequest } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

export const getValidToken = async (req: NextRequest): Promise<any> => {
  const tokenCookie = req.cookies.get("spotify_token");
  console.log(tokenCookie);

  const now = Date.now();
  // Check if the token is cached in the cookie and is still valid
  if (tokenCookie) {
    const { token, expiry } = JSON.parse(tokenCookie.value);

    if (expiry > now) {
      return token;
    }
  }

  const response = await refreshToken();
  // console.log("response in getvalid", response);
  return response;
};

export const refreshToken = async (): Promise<any> => {
  const now = Date.now();
  try {
    const tokenResponse = await fetch(
      `https://accounts.spotify.com/api/token`,
      {
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
      }
    );

    if (!tokenResponse.ok) {
      const error = await tokenResponse.json();
      throw new Error(
        `Failed to fetch token refreshToken(): ${error.error_description}`
      );
    }
    const { access_token, expires_in } = await tokenResponse.json();
    const token = {
      name: "spotify_token",
      value: access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expires_in,
      path: "/",
    };

    //   access_token: 'BQDsqbB4yPsbbzpfRwtpD0O835vEcbFGNB1HvtuG7Dlcb-aukqOsQ5xCpFvJMYoQIrnruLJVLCsIWns87RVpx3Y2oA2b9aAcIk7EftV3P3k-zhSBgxQ',
    //   token_type: 'Bearer',
    //   expires_in: 3600
    // }
    return token;
  } catch (error) {
    throw new Error(`Failed to refresh token refreshToken(): ${error}`);
  }
};
