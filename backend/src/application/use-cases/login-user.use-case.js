import jwt from "jsonwebtoken";

import { UserRepository } from "../../infrastructure/repositories/user.repository.js";
import { env } from "../../config/env.js";

export class LoginUserUseCase {
  constructor(users = new UserRepository()) {
    this.users = users;
  }

  async execute(payload) {
    const user = await this.users.verifyCredentials(payload.email, payload.password);
    if (!user) {
      throw new Error("Invalid credentials");
    }

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
