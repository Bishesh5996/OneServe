import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";
import { UserRepository } from "../../infrastructure/repositories/user.repository.js";

const slugifyValue = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

export class FavoriteUseCases {
  constructor(users = new UserRepository(), products = new ProductRepository()) {
    this.users = users;
    this.products = products;
  }

  formatFavorites(items = []) {
    return items.map((item) => ({
      ...item,
      id: item.productId,
      slug: item.slug
    }));
  }

  async list(userId) {
    const favorites = await this.users.getFavorites(userId);
    return this.formatFavorites(favorites);
  }

  async add(userId, productId, snapshot = {}) {
    let product = null;
    if (productId) {
      product = await this.products.findById(productId);
    }

    if (!product && (!snapshot.name || !snapshot.price)) {
      throw new Error("Product not found");
    }

    const favoriteSnapshot = product
      ? {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
          description: product.description,
          category: product.category,
          customizations: product.customizations
        }
      : {
          productId,
          slug: snapshot.slug ?? slugifyValue(snapshot.name ?? productId),
          name: snapshot.name,
          price: snapshot.price,
          image: snapshot.image,
          rating: snapshot.rating,
          description: snapshot.description,
          category: snapshot.category,
          customizations: snapshot.customizations
        };

    const favorites = await this.users.addFavorite(userId, favoriteSnapshot);
    return this.formatFavorites(favorites);
  }

  async remove(userId, productId) {
    const favorites = await this.users.removeFavorite(userId, productId);
    return this.formatFavorites(favorites);
  }
}
