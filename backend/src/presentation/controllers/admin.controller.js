import { AdminAnalyticsUseCase } from "../../application/use-cases/admin-analytics.use-case.js";
import { ListUsersUseCase } from "../../application/use-cases/list-users.use-case.js";

const analyticsUseCase = new AdminAnalyticsUseCase();
const listUsersUseCase = new ListUsersUseCase();

export class AdminController {
  static async analytics(_req, res) {
    try {
      const data = await analyticsUseCase.execute();
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async users(_req, res) {
    try {
      const users = await listUsersUseCase.execute();
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
