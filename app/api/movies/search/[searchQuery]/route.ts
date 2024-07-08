import { BASE_URL } from "@/app/api/comics/constants/constants";
import { md5 } from "js-md5";
const ts = Date.now();
const hash = md5.create();
const privateKey = process.env.COMICS_PRIVATE_APIKEY;
const publicKey = process.env.COMICS_PUBLIC_APIKEY;
const toHash = `${ts}
  ${privateKey} ${publicKey}`;
hash.update(toHash);
console.log(
  `${BASE_URL}/comics?dateDescriptor=thisWeek&offset=0&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
);

import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params: { searchQuery } }: { params: { searchQuery: string } }
) {
  const api_key = process.env.MOVIES_APIKEY;
  // console.log("params=======", searchQuery);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchQuery}&language=en-GB&egion=GB&include_adult=true`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();

  return Response.json({ data });
}
