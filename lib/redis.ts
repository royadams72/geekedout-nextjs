// lib/redis.js
import Redis from "ioredis";

// Replace with your Redis server details
const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
});

export const saveCategoriesToCache = async (categoriesData: any) => {
  await redis.set("categoriesData", JSON.stringify(categoriesData));
};

// Get multiple categories from Redis
export const getCategoriesFromCache = async () => {
  const data: any = await redis.get("categoriesData");
  return JSON.parse(data);
};

export default redis;
