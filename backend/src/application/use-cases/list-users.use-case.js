import { UserModel } from "../../infrastructure/db/models/user.model.js";

export class ListUsersUseCase {
  async execute() {
    const users = await UserModel.find().sort({ createdAt: -1 }).select("name email role createdAt");
    return users.map((user) => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }));
  }
}
