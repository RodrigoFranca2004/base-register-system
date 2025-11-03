import Redis from "ioredis";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: 3,
};

const redisClient = new Redis(redisConfig);

redisClient.on("connect", () => {
  console.log("[REDIS] Successfully connected to Redis!");
});

redisClient.on("error", (err) => {
  console.error("[REDIS] Error connecting to Redis:", err);
});

export { redisClient };
