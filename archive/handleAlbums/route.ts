import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest, NextResponse } from "next/server";

const clientID = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action") as string;
  const id = searchParams.get("id") || null || undefined;
  console.log("action ====", action);

  try {
    const data = await handleAlbums(action, id);
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to handle albums" },
      { status: error.status || 500 }
    );
  }
};

// const getToken = async (): Promise<{
//   access_token: string;
//   expires_in: number;
// }> => {
//   const response = await fetch(`https://accounts.spotify.com/api/token`, {
//     method: "POST",
//     body: new URLSearchParams({
//       grant_type: "client_credentials",
//     }),
//     headers: {
//       Authorization: `Basic ${Buffer.from(
//         `${clientID}:${clientSecret}`
//       ).toString("base64")}`,
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//   if (!response.ok) {
//     const error = await response.json();
//     throw new Error(`Failed to fetch token: ${error.error_description}`);
//   }

//   const data = await response.json();
//   return { access_token: data.access_token, expires_in: data.expires_in };
// };

// export const getValidToken = async (): Promise<string> => {
//   const now = Date.now();

//   if (cachedToken && tokenExpiry && tokenExpiry > now) {
//     return cachedToken;
//   }

//   const tokenResponse = await getToken();
//   cachedToken = tokenResponse.access_token;
//   tokenExpiry = now + tokenResponse.expires_in * 1000;

//   return cachedToken;
// };

export const handleAlbums = async (action: string, id?: string) => {
  let response: any;
  try {
    if (action === "getAll") {
      response = await fetch("http://localhost:3000/api/music/get-albums");
      const albums = await response.json();
      return albums;
    } else if (action === "getDetails" && id) {
      response = await fetch(
        `http://localhost:3000/api/music/get-details?id=${id}`
      );
      const album = await response.json();
      return album;
      // return await getAlbumDetails(id);
    } else {
      throw new Error("Invalid action or missing id");
    }
  } catch (error: any) {
    return {
      error: { status: 500, message: error.message || "Internal Server Error" },
    };
  }
};
