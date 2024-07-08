import { md5 } from "js-md5";
import { BASE_URL } from "../constants/constants";
const ts = Date.now();
const hash = md5.create();
const privateKey = process.env.COMICS_PRIVATE_APIKEY;
const publicKey = process.env.COMICS_PUBLIC_APIKEY;
// const toHash = `${ts}
//   ${privateKey} ${publicKey}`;
hash.update(`${ts}`);
hash.update(`${privateKey}`);
hash.update(`${publicKey}`);
console.log(publicKey);

console.log(
  `${BASE_URL}/comics?dateDescriptor=thisWeek&offset=0&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
);
export async function GET() {
  const res = await fetch(
    `${BASE_URL}/comics?dateDescriptor=thisWeek&offset=0&limit=100&ts=${ts}&apikey=${publicKey}&hash=${hash.hex()}`
  );

  const data = await res.json();
  // console.log(resp);

  // const data = resp.data;
  return Response.json(data.data);
}
