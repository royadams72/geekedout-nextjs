import { BASE_URL_MOVIES } from "@/shared/constants/urls";

const pageNum = "1";
const api_key = process.env.MOVIES_APIKEY;

export async function GET() {
  console.log("calling movies");

  const res = await fetch(
    `${BASE_URL_MOVIES}/now_playing?api_key=${api_key}&language=en-GB&pageNum=${pageNum}&region=GB`
  );
  const data = await res.json();
  console.log(`calling movies data=====`, data);
  // TODO error handling
  return Response.json({ data });
}
