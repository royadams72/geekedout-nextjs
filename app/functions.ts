"use server";
import { cookies } from "next/headers";

export const getServerSideCookie = async (cookieName: string) => {
  const cookieStore = cookies();
  const ServerSideSessionId = cookieStore.get(cookieName)?.value;
  console.log("ServerSideSessionId===", ServerSideSessionId);

  return ServerSideSessionId;
};
