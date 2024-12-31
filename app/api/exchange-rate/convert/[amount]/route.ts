import { NextRequest } from "next/server";
import { ENV } from "@/lib/services/envService";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ amount: string }>;
  }
) {
  try {
    const { amount } = await params;
    const amountToConvert = Number(amount.replace("$", ""));
    const res = await fetch(
      `${ENV.BASE_URL_EXCHANGE}/${ENV.EXCHANGE_RATE_KEY}/pair/USD/GBP/${amountToConvert}`
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
