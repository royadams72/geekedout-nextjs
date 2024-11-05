import { NextResponse } from "next/server";

import { md5 } from "js-md5";
import { BASE_URL_COMICS } from "@/shared/constants/urls";
import { ApiError } from "@/utils/helpers";

const ts = Date.now();
const privateKey = process.env.COMICS_PRIVATE_APIKEY;
const publicKey = process.env.COMICS_PUBLIC_APIKEY;
const offset = "0";
const limit = "100";

if (!privateKey || !publicKey) {
  console.error("API keys are not defined in environment variables.");
}

const hash = md5.create();
hash.update(`${ts}${privateKey}${publicKey}`);

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL_COMICS}/comics?dateDescriptor=thisWeek&offset=${offset}&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
    );
    const data = await res.json();

    if (!res.ok) {
      throw new ApiError(res.status, data.error.message || "comics API error");
    }

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`comics API Error: ${error.statusCode} - ${error.message}`);
      return NextResponse.json(
        `There was an error requesting comic data: ${error.message}`,
        { status: error.statusCode }
      );
    } else {
      console.error("Unexpected Error comics API:", error);
      return NextResponse.json(`Unexpected Error comics API: ${error}`, {
        status: 500,
      });
    }
  }
}
