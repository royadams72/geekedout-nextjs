import { NextResponse } from "next/server";

import { md5 } from "js-md5";
import { BASE_URL_COMICS } from "@/shared/constants/urls";

const ts = Date.now();
const hash = md5.create();
const privateKey = process.env.COMICS_PRIVATE_APIKEY;
const publicKey = process.env.COMICS_PUBLIC_APIKEY;
const offset = "0";
const limit = "100";

hash.update(`${ts}`);
hash.update(`${privateKey}`);
hash.update(`${publicKey}`);

export async function GET() {
  try {
    const res = await fetch(
      `${BASE_URL_COMICS}/comics?dateDescriptor=thisWeek&offset=${offset}&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "No data found" }, { status: 404 });
    }
    const data = await res.json();

    return NextResponse.json(data.data, { status: 200 });
  } catch (error) {
    console.error(`There was an error requesting comic data:${error}`);
    throw error;
  }
}
