import "@testing-library/jest-dom";
import dotenv from "dotenv";
dotenv.config();

process.env.NEXT_PUBLIC_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

process.env.NEXT_PUBLIC_SET_DATA_API = "api/category-set-data";
process.env.NEXT_PUBLIC_GET_DATA_FOLDER = "get-data";

process.env.BASE_URL_COMICS = "comics/api/url";
process.env.BASE_URL_GAMES = "games/api/url";
process.env.BASE_URL_MOVIES = "movies/api/url";
process.env.BASE_URL_MUSIC = "music/api/url";
process.env.BASE_URL_EXCHANGE = "exchange/api/url";

process.env.REDIS_URL = "localhost:6379";
process.env.REDIS_HOST = "localhost";
process.env.REDIS_PORT = "6379";
process.env.REDIS_PASSWORD = "";

process.env.COMIC_VINE_APIKEY = "apiKey1234";
process.env.X_MASHAPE_KEY = "mashapeKey1234";
process.env.MOVIES_APIKEY = "moviesApiKey1234";
process.env.SPOTIFY_CLIENT_ID = "spotifyClientId1234";
process.env.SPOTIFY_CLIENT_SECRET = "spotifyClientSecret1234";
process.env.IGDB_APIKEY = "igdbApiKey1234";
process.env.EXCHANGE_RATE_APIKEY = "exchangeApiKey1234";
