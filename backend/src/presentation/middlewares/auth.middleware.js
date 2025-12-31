import jwt from "jsonwebtoken";
import crypto from "node:crypto";

import { env } from "../../config/env.js";
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";

const users = new UserRepository();

const ensureBypassUser = async () => {
  const existing = await users.findByEmail(env.authBypassEmail);
  if (existing) return existing;
  const password = env.authBypassPassword || crypto.randomBytes(12).toString("hex");
  return users.create({
    name: "Demo User",
    email: env.authBypassEmail,
    password,
    role: env.authBypassRole ?? "buyer"
  });
};

export const authenticate = (required = true) => {
  return async (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
      if (env.authBypass) {
        try {
          const user = await ensureBypassUser();
          req.user = { id: user.id, role: user.role };
          return next();
        } catch (error) {
          return res.status(500).json({ message: "Auth bypass failed", detail: error?.message });
        }
      }
      if (!required) return next();
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = header.replace(/Bearer\s+/i, "");

    try {
      const payload = jwt.verify(token, env.jwtSecret);
      req.user = { id: payload.sub, role: payload.role };
      next();
    } catch (error) {
      if (env.authBypass) {
        try {
          const user = await ensureBypassUser();
          req.user = { id: user.id, role: user.role };
          return next();
        } catch (e) {
          return res.status(500).json({ message: "Auth bypass failed", detail: e?.message });
        }
      }
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
