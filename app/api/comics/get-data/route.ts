import { NextResponse } from "next/server";

import crypto from "crypto";

import { ENV } from "@/lib/services/envService";
import { ApiError } from "@/lib/utils/error";
import { getApiHelper } from "@/lib/utils/api/getApiHelper";

import { CategoryType } from "@/types/enums/category-type.enum";

const ts = Date.now();
const offset = "0";
const limit = "100";
const hash = crypto
  .createHash("md5")
  .update(`${ts}${ENV.COMICS_PRIVATE_KEY}${ENV.COMICS_PUBLIC_KEY}`)
  .digest("hex");

export async function GET() {
  try {
    const response = await getApiHelper(
      `${ENV.BASE_URL_COMICS}/comics?dateDescriptor=thisWeek&offset=${offset}&limit=${limit}&ts=${ts}&apikey=${ENV.COMICS_PUBLIC_KEY}&hash=${hash}`,
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
