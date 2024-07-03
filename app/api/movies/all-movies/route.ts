import type { NextApiRequest, NextApiResponse } from "next";
export async function GET(req: NextApiRequest) {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=ec6dbc198ab2edc5acd6c1e1a3336c72&language=en-GB&pageNum=1&region=GB"
  );
  const data = await res.json();

  return Response.json({ data });
}
