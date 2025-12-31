import bcrypt from "bcryptjs";

import { env } from "../config/env.js";
import { UserModel } from "../infrastructure/db/models/user.model.js";

export const ensureAdminUser = async () => {
  const email = env.adminEmail;
  const password = env.adminPassword;
  const name = env.adminName;

  const existing = await UserModel.findOne({ email });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await UserModel.create({
      name,
      email,
      password: hashed,
      role: "admin"
    });
    console.log(`Created default admin account (${email})`);
    return;
  }

  let changed = false;
  if (existing.role !== "admin") {
    existing.role = "admin";
    changed = true;
    console.log("Updated existing admin account role");
  }
  if (env.adminResetPassword) {
    existing.password = await bcrypt.hash(password, 10);
    changed = true;
    console.log("Reset admin password from env");
  }
  if (changed) {
    await existing.save();
  }
};
