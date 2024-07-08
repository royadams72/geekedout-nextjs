export async function GET() {
  const api_key = process.env.MOVIES_APIKEY;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-GB&pageNum=1&region=GB`
  );

  const data = await res.json();

  return Response.json({ data });
}
