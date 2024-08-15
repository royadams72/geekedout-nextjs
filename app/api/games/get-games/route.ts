import { BASE_URL_GAMES } from "@/shared/constants/urls";

export async function GET() {
  const res = await fetch(BASE_URL_GAMES);
  const data = await res.json();
  // TODO error handling
  console.log("function GET()======", data.data);

  return Response.json(data.data);
}
