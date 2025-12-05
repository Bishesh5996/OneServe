import jwt from "jsonwebtoken";

import { env } from "../../config/env.js";

export const authenticate = (required = true) => {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
      if (!required) return next();
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    const token = header.replace(/Bearer\s+/i, "");

    try {
      const payload = jwt.verify(token, env.jwtSecret);
      req.user = { id: payload.sub, role: payload.role };
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  };
};
