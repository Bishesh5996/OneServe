import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultEnvPath = path.resolve(__dirname, "../../.env");

// Allow overriding with ENV_PATH, otherwise load backend/.env even when run from repo root
const envFilePath = process.env.ENV_PATH ?? defaultEnvPath;
dotenv.config({ path: envFilePath });

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGO_URI ?? "mongodb://127.0.0.1:27017/meal-kit",
  jwtSecret: process.env.JWT_SECRET ?? "supersecret",
  seed: process.env.SEED === "true",
  authBypass: process.env.AUTH_BYPASS !== "false",
  authBypassEmail: process.env.AUTH_BYPASS_EMAIL ?? "demo@oneserve.test",
  authBypassPassword: process.env.AUTH_BYPASS_PASSWORD ?? "changeme",
  authBypassRole: process.env.AUTH_BYPASS_ROLE ?? "admin",
  envFilePath
};
