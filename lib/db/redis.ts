import Redis from "ioredis";

const redis_url = process.env.REDIS_URL || "localhost:6379";
const redis = new Redis(redis_url);

export const saveSessionData = async (sessionId: string, data: any) => {
  const sessionTTL = 86400;
  try {
    const response = await redis.set(
      `session:${sessionId}`,
      JSON.stringify(data),
      "EX",
      sessionTTL
    );
    console.log(
      "saving sessionData to redis",
      data.state.comics.comics.results[0]
    );

    if (response !== "OK") {
      throw new Error(
        `Could not save data saveSessionData() ${process.env.REDIS_HOST}`
      );
    }
  } catch (error) {
    return { message: "Error getting data:", error };
  }
};

export const getStoreData = async (sessionId: string) => {
  const data = await redis.get(`session:${sessionId}`);
  const parsed = JSON.parse(data as string);
  console.log("Getting store data:", parsed.state.comics.comics.results[0]);

  return data ? JSON.parse(data) : null;
};
