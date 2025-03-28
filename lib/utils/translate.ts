"use server";

export const translate = async (text: string | TrustedHTML) => {
  try {
    const response = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: "en",
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("data", text);
    if (!response.ok) {
      console.log("response", response);
      return text;
    }

    const data = await response.json();

    return data.translatedText;
  } catch (error) {
    console.log("data", error);
  }
};
