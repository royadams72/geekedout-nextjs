"use server";
import { cookies } from "next/headers";

export const setCookie = async (cookieString: any) => {
  const cookieStore = await cookies();

  if (cookieString) {
    const decoded = decodeURIComponent(cookieString);

    // Example cookie format: `spotify_token=VALUE; Path=/; HttpOnly; Secure; Max-Age=3600; Expires=DATE`
    const parts = decoded.split("; ").reduce((acc: any, part) => {
      const [key, value] = part.split("=");
      if (value !== undefined) {
        acc[key.trim()] = value.trim();
      } else {
        acc.flags = acc.flags || [];
        acc.flags.push(key.trim());
      }
      console.log("key:", key, "value=", value);

      return acc;
    }, {});

    const [name, value] = Object.entries(parts)[0];

    const options = {
      path: parts.Path || "/",
      httpOnly: parts.flags?.includes("HttpOnly"),
      secure: parts.flags?.includes("Secure"),
      maxAge: parts["Max-Age"] ? parseInt(parts["Max-Age"], 10) : undefined,
    };

    cookieStore.set(name, String(value), options);
  }
};
