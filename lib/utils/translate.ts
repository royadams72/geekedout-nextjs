"use server";

export const translate = async (text: string | TrustedHTML) => {
  try {
    const response = await fetch("https://lt.blitzw.in/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: "en",
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      console.error("Copy could not be translated:", response.statusText);
      return text;
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Unknown error translating copy:", error);
  }
};
