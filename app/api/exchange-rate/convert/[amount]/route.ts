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
  const amountToConvert = Number(amount.replace("$", ""));

  const res = await fetch(
    `${BASE_URL_EXCHANGE}/${privateKey}/pair/USD/GBP/${amountToConvert}`
  );

  const data = await res.json();
  // TODO error handling

  return Response.json(data);
}
