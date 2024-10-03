"use client"; // Ensure the component is client-side

import { useEffect, useState } from "react";

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export const useClientSideCookies = (cookieName: string) => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    // Get the cookie once the component has mounted
    const cookie = getCookie(cookieName);
    setCookieValue(cookie); // Save the cookie value in state
  }, [cookieName]); // Re-run if cookieName changes

  console.log(cookieName, cookieValue);
  return cookieValue;
};
