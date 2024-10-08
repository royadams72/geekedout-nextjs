import { NextRequest } from "next/server";

import { BASE_URL_EXCHANGE } from "@/shared/constants/urls";
const privateKey = process.env.EXCHANGE_RATE_APIKEY;
export async function GET(
  request: NextRequest,
  {
    params: { amount },
  }: {
    params: { amount: string };
  }
) {
  try {
    const amountToConvert = Number(amount.replace("$", ""));
    const res = await fetch(
      `${BASE_URL_EXCHANGE}/${privateKey}/pair/USD/GBP/${amountToConvert}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch albums: ${data.error.message}`);
    }
    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(`There was an error requesting exchange rate data:${error}`);
    throw error;
  }
}
