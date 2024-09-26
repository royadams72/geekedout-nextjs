import { useEffect, useState } from "react";

export const useServerSideCookie = () => {
  const [serverCookie, setServerCookie] = useState("");

  useEffect(() => {
    const fetchCookie = async () => {
      try {
        const response = await fetch("/api/get-session");
        const data = await response.json();
        setServerCookie(data.sessionId);
      } catch (error) {
        console.error("Error fetching session ID:", error);
      }
    };
    fetchCookie();
  }, []);
  // console.log(serverCookie);

  return serverCookie;
};
