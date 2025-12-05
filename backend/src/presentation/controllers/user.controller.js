import { FavoriteUseCases } from "../../application/use-cases/favorite.use-case.js";
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";

const favorites = new FavoriteUseCases();
const users = new UserRepository();

export class UserController {
  static async getProfile(req, res) {
    try {
      const user = await users.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateProfile(req, res) {
    try {
      const user = await users.updateProfile(req.user.id, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      const status = /duplicate key/i.test(error.message) ? 409 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  static async getFavorites(req, res) {
    try {
      const items = await favorites.list(req.user.id);
      res.json(items);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async addFavorite(req, res) {
    try {
      const items = await favorites.add(req.user.id, req.params.productId, req.body);
      res.json(items);
    } catch (error) {
      const status = /not found/i.test(error.message) ? 404 : 400;
      res.status(status).json({ message: error.message });
    }
  }

  static async removeFavorite(req, res) {
    try {
      const items = await favorites.remove(req.user.id, req.params.productId);
      res.json(items);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
