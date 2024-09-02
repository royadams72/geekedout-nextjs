// Example function to store data in Redis
import Redis from "ioredis";

const redis = new Redis(); // Configure Redis client

// Save data to Redis
export const saveGamesDataToCache = async (gamesData: any) => {
  await redis.set("gamesData", JSON.stringify(gamesData));
};

// Get data from Redis
export const getGamesDataFromCache = async () => {
  const data: any = await redis.get("gamesData");
  return JSON.parse(data);
};
