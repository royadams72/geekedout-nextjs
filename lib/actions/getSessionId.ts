import { cookies } from "next/headers";

export const getSessionId = async (): Promise<string | null> => {
  const cookieHeader = await cookies();
  const sessionId = cookieHeader.get("sessionId")?.value;

  if (sessionId) {
    return sessionId;
  } else {
    return null;
  }
};
