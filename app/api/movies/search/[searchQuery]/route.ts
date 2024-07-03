import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { searchQuery } }: { params: { searchQuery: string } }
) {
  // const searchQuery = request.nextUrl;
  console.log(searchQuery);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=ec6dbc198ab2edc5acd6c1e1a3336c72&query=${searchQuery}&language=en-GB&egion=GB&include_adult=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
