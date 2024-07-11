import { md5 } from "js-md5";
import { BASE_URL_COMICS } from "../../../../shared/constants/urls";
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
  const res = await fetch(
    `${BASE_URL_COMICS}/comics?dateDescriptor=thisWeek&offset=${offset}&limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
  );

  const data = await res.json();
  // TODO error handling
  return Response.json(data.data);
}
