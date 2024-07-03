import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params: { movieId },
  }: {
    params: { movieId: string };
  }
) {
  console.log("request===========", movieId);

  // const movieId = request.nextUrl.searchParams;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=ec6dbc198ab2edc5acd6c1e1a3336c72&language=en-GB&egion=GB`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
