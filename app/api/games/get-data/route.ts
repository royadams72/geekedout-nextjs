import { BASE_URL_GAMES } from "@/shared/constants/urls";

export async function GET() {
  try {
    const res = await fetch(BASE_URL_GAMES);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch albums: ${data.error.message}`);
    }
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(`There was an error requesting games data:${error}`);
    throw error;
  }
}
