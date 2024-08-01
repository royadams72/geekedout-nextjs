// import { BASE_URL_MUSIC } from "@/shared/constants/urls";
// import { getValidToken } from "../token/getValidToken";

// export const GET = async (req: any) => {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get("id");

//   if (!id) {
//     return new Response(JSON.stringify({ error: "Missing album ID" }), {
//       status: 400,
//     });
//   }

//   let data;

//   try {
//     data = await getAlbumDetails(id);
//   } catch (error: any) {
//     if (error.status === 401) {
//       // Token expired, get a new token and retry
//       await getValidToken();
//       data = await getAlbumDetails(id);
//     } else {
//       return new Response(
//         JSON.stringify({ error: "Failed to get album details" }),
//         { status: 500 }
//       );
//     }
//   }

//   return new Response(JSON.stringify({ data }), { status: 200 });
// };

// const getAlbumDetails = async (id: string) => {
//   const token = await getValidToken();

//   const response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw { status: response.status, ...data }; // Properly handle error with status
//   }

//   return data;
// };
import { BASE_URL_MUSIC } from "@/shared/constants/urls";
import { NextRequest } from "next/server";

import { getValidToken } from "../albums/route";
let id: string | null;
let token: string | null;
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  id = searchParams.get("id") as string;

  const data = await getAlbumDetails(id);
  return new Response(JSON.stringify({ data }), { status: 200 });
};

const getAlbumDetails = async (id: string) => {
  const token = await getValidToken();

  const response = await fetch(`${BASE_URL_MUSIC}/albums/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const album = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to fetch album details: ${album.error.message}`);
  }

  return album;
};
