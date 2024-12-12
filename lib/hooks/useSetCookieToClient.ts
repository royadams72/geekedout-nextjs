import { useState, useEffect } from "react";
import { isNotEmpty } from "@/lib/utils/validation";
import { setCookie } from "../actions/setCookie";

export const useSetCookieToClient = (token: any) => {
  // Check if token and set it to the client

  useEffect(() => {
    (async () => {
      if (token) {
        await setCookie(token);
      }
    })();
  }, [token]);
};
