import { cookies } from "next/headers";

export const getCookie = async (cookieName: string): Promise<string | null> => {
  const cookieHeader = await cookies();
  const cookie = cookieHeader.get(cookieName)?.value;

  if (cookie) {
    return cookie;
  } else {
    return null;
  }
};
