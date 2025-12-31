import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  const timeoutMs = 7000;
  console.log(`[db] Connecting to MongoDB at ${env.mongoUri} ...`);

  const connectionPromise = mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Timed out connecting to MongoDB after ${timeoutMs}ms`)), timeoutMs);
  });

  mongoose.connection.on("connected", () => {
    console.log("[db] Connected");
  });
  mongoose.connection.on("error", (error) => {
    console.error("[db] Connection error:", error?.message ?? error);
  });

  return Promise.race([connectionPromise, timeoutPromise]);
};
