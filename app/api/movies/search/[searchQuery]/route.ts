import { NextRequest } from "next/server";

import { BASE_URL_MOVIES } from "@/app/api/constants/urls";

const api_key = process.env.MOVIES_APIKEY;

export async function GET(
  request: NextRequest,
  { params: { searchQuery } }: { params: { searchQuery: string } }
) {
  const res = await fetch(
    `${BASE_URL_MOVIES}?api_key=${api_key}&query=${searchQuery}&language=en-GB&egion=GB&include_adult=true`,
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
