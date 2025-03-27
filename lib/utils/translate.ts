export const translate = async (text: string) => {
  const response = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: text,
      source: "uk",
      target: "en",
    }),
  });
  const translated = await response.json();
  return translated;
};
