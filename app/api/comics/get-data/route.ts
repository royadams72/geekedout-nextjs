import { NextResponse } from "next/server";

import { md5 } from "js-md5";

import { ApiError } from "@/lib/utils/error";
import { getApi } from "@/lib/utils/api/getApi";
import { CategoryType } from "@/types/enums/category-type.enum";

const ts = Date.now();
const privateKey = process.env.COMICS_PRIVATE_APIKEY;
const publicKey = process.env.COMICS_PUBLIC_APIKEY;
const BASE_URL_COMICS = process.env.BASE_URL_COMICS;
const offset = "0";
const limit = "100";

if (!privateKey || !publicKey) {
  console.error("API keys are not defined in environment variables.");
}

const hash = md5.create();
hash.update(`${ts}${privateKey}${publicKey}`);

export async function GET() {
  console.log("revalidating in comics");

  try {
    const response = await getApi(
      `${BASE_URL_COMICS}/comics?dateDescriptor=thisWeek&offset=${offset}&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`,
      CategoryType.COMICS
    );

    return response;
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
