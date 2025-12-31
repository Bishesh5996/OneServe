import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  mongoose.set("strictQuery", true);
  mongoose.connection.on("connected", () => {
    console.log("[db] Connected");
  });
  mongoose.connection.on("error", (error) => {
    console.error("[db] Connection error:", error?.message ?? error);
  });

  return mongoose.connect(env.mongoUri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000
  });
};
