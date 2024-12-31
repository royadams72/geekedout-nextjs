import Redis from "ioredis";
import { ENV } from "../services/envService";

const redis = new Redis(ENV.REDIS_URL);

export const saveDBData = async (sessionId: string, data: any) => {
  const sessionTTL = 86400;
  try {
    const response = await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );

    if (response !== "OK") {
      throw new Error(`Could not save data saveDBData()`);
    }
  } catch (error) {
    return { message: "Error getting data:", error };
  }
};

export const getDBData = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`);
  return data ? JSON.parse(data) : null;
};
