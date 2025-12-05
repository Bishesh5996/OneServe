import bcrypt from "bcryptjs";

import { UserModel } from "../db/models/user.model.js";

const normalizeEmail = (email) => (typeof email === "string" ? email.trim().toLowerCase() : email);

export class UserRepository {
  async create(data) {
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({
      ...data,
      name: data.name?.trim(),
      email: normalizeEmail(data.email),
      avatar: data.avatar,
      password: hashed,
      role: data.role ?? "buyer"
    });
    return this.map(user);
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ email: normalizeEmail(email) });
    return user ? this.map(user) : null;
  }

  async findById(id) {
    const user = await UserModel.findById(id);
    return user ? this.map(user) : null;
  }

  async getFavorites(id) {
    const user = await UserModel.findById(id).select("favorites");
    return user ? user.favorites ?? [] : [];
  }

  async addFavorite(userId, snapshot) {
    await UserModel.updateOne(
      { _id: userId, "favorites.productId": { $ne: snapshot.productId } },
      { $push: { favorites: snapshot } }
    );
    return this.getFavorites(userId);
  }

  async removeFavorite(userId, productId) {
    await UserModel.updateOne({ _id: userId }, { $pull: { favorites: { productId } } });
    return this.getFavorites(userId);
  }

  async verifyCredentials(email, password) {
    const user = await UserModel.findOne({ email: normalizeEmail(email) });
    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? this.map(user) : null;
  }

  async updateProfile(id, updates = {}) {
    const payload = {};
    if (typeof updates.name === "string" && updates.name.trim()) payload.name = updates.name.trim();
    if (typeof updates.email === "string" && updates.email.trim()) payload.email = updates.email.trim().toLowerCase();
    if (typeof updates.phone === "string" || updates.phone === "") payload.phone = updates.phone;
    if (typeof updates.avatar === "string" || updates.avatar === null) payload.avatar = updates.avatar;

    if (!Object.keys(payload).length) {
      return this.findById(id);
    }

    const user = await UserModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    return user ? this.map(user) : null;
  }

  map(doc) {
    return {
      id: doc._id.toString(),
      name: doc.name,
      email: doc.email,
      businessName: doc.businessName,
      phone: doc.phone,
      role: doc.role,
      address: doc.address,
      avatar: doc.avatar,
      favorites: doc.favorites ?? []
    };
  }
}
