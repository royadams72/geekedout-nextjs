import { NextRequest } from "next/server";

import { BASE_URL_MOVIES } from "@/shared/constants/urls";

const api_key = process.env.MOVIES_APIKEY;

export async function GET(
  request: NextRequest,
  {
    params: { movieId },
  }: {
    params: { movieId: string };
  }
) {
  const res = await fetch(
    `${BASE_URL_MOVIES}/${movieId}?api_key=${api_key}&language=en-GB&egion=GB`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  // TODO error handling
  return Response.json({ data });
}
