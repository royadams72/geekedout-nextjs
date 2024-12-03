"use server";
import { cookies } from "next/headers";

export const setCookie = async (cookie: any) => {
  const cookieStore = await cookies();

  if (cookie) {
    const { name, value, httpOnly, secure, maxAge, path } = cookie;

    cookieStore.set(name, value, {
      httpOnly: httpOnly,
      secure: secure,
      maxAge: maxAge,
      path: path,
    });
  }
};
