export const getEnv = (key: string): any => {
  const value = process.env[key];
  if (typeof value === "undefined") {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const ENV = {
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  BASE_URL: getEnv("NEXT_PUBLIC_BASE_URL"),
  GET_DATA_FOLDER: getEnv("NEXT_PUBLIC_GET_DATA_FOLDER"),
  COMIC_VINE_APIKEY: getEnv("COMIC_VINE_APIKEY"),
  // COMICS_PRIVATE_KEY: getEnv("COMICS_PRIVATE_APIKEY"),
  // COMICS_PUBLIC_KEY: getEnv("COMICS_PUBLIC_APIKEY"),
  BASE_URL_COMICS: getEnv("BASE_URL_COMICS"),
  EXCHANGE_RATE_KEY: getEnv("EXCHANGE_RATE_APIKEY"),
  BASE_URL_EXCHANGE: getEnv("BASE_URL_EXCHANGE"),
  BASE_URL_GAMES: getEnv("BASE_URL_GAMES"),
  MOVIES_APIKEY: getEnv("MOVIES_APIKEY"),
  BASE_URL_MOVIES: getEnv("BASE_URL_MOVIES"),
  BASE_URL_MUSIC: getEnv("BASE_URL_MUSIC"),
  REDIS_URL: getEnv("REDIS_URL"),
  SPOTIFY_CLIENT_ID: getEnv("SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: getEnv("SPOTIFY_CLIENT_SECRET"),
} as const;
