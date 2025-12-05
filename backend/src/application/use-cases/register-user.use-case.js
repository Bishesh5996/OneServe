import jwt from "jsonwebtoken";

import { UserRepository } from "../../infrastructure/repositories/user.repository.js";
import { env } from "../../config/env.js";

export class RegisterUserUseCase {
  constructor(users = new UserRepository()) {
    this.users = users;
  }

  async execute(payload) {
    const existing = await this.users.findByEmail(payload.email);
    if (existing) {
      throw new Error("Email already registered");
    }

    const user = await this.users.create({ ...payload, role: payload.role ?? "buyer" });
    const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        businessName: user.businessName,
        avatar: user.avatar
      }
    };
  }
}
