"use server";
import { cookies } from "next/headers";

export const setCookie = async (cookie: any) => {
  const cookieStore = await cookies();
  if (cookie) {
    const { name, value, httpOnly, secure, maxAge, path, expires } = cookie;

    cookieStore.set(name, value, {
      httpOnly: httpOnly,
      secure: secure,
      maxAge: maxAge,
      path: path,
      expires: new Date(expires), // Make sure the expires date is properly formatted as a Date object
    });

    console.log("setCookies", cookie);
  }
};
