import bcrypt from "bcryptjs";

import { UserModel } from "../infrastructure/db/models/user.model.js";

const ADMIN_EMAIL = "Bishesh5996@gmail.com";
const ADMIN_PASSWORD = "1234567890";
const ADMIN_NAME = "OneServe Admin";

export const ensureAdminUser = async () => {
  const existing = await UserModel.findOne({ email: ADMIN_EMAIL });
  if (!existing) {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await UserModel.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      role: "admin"
    });
    console.log("Created default admin account");
    return;
  }

  if (existing.role !== "admin") {
    existing.role = "admin";
    await existing.save();
    console.log("Updated existing admin account role");
  }
};
