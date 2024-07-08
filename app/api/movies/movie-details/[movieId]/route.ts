import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { movieId },
  }: {
    params: { movieId: string };
  }
) {
  const api_key = process.env.MOVIES_APIKEY;

  // const movieId = request.nextUrl.searchParams;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-GB&egion=GB`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
