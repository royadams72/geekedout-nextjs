"use server";
import { cookies } from "next/headers";

export const setCookie = async (cookieString: any) => {
  const cookieStore = await cookies();

  if (cookieString) {
    // Decode and parse the cookie string
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
      return acc;
    }, {});

    // Extract name and value
    const [name, value] = Object.entries(parts)[0];
    console.log(name, typeof value);

    // Extract attributes
    const options = {
      path: parts.Path || "/",
      httpOnly: parts.flags?.includes("HttpOnly"),
      secure: parts.flags?.includes("Secure"),
      maxAge: parts["Max-Age"] ? parseInt(parts["Max-Age"], 10) : undefined,
    };

    // Set the cookie
    cookieStore.set(name, String(value), options);
  }
};
