const Redis = require("ioredis");

let redisClient;

exports.handler = async (event) => {
  if (!redisClient) {
    redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD, // If applicable
      tls: {}, // If using in-transit encryption
    });
  }

  try {
    const { action, key, value } = JSON.parse(event.body);

    let result;
    switch (action) {
      case "get":
        result = await redisClient.get(key);
        break;
      case "set":
        result = await redisClient.set(key, value);
        break;
      default:
        throw new Error("Unsupported action");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
