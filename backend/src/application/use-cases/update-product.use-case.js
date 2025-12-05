import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";

const mapCustomization = (custom, index) => ({
  _id: custom.id ?? custom._id ?? undefined,
  name: custom.name ?? `Option ${index + 1}`,
  description: custom.description,
  unitPrice: Number(custom.unitPrice ?? 0),
  stock: Number.isFinite(custom.stock) ? Number(custom.stock) : 0,
  minQuantity: Number.isFinite(custom.minQuantity) ? Number(custom.minQuantity) : 0,
  maxQuantity: Number.isFinite(custom.maxQuantity) ? Number(custom.maxQuantity) : 2,
  defaultQuantity: Number.isFinite(custom.defaultQuantity) ? Number(custom.defaultQuantity) : 0
});

export class UpdateProductUseCase {
  constructor(products = new ProductRepository()) {
    this.products = products;
  }

  async execute(id, payload = {}) {
    if (!id) {
      throw new Error("Product id is required");
    }
    const data = {};
    if (payload.name) data.name = payload.name;
    if (payload.description !== undefined) data.description = payload.description;
    if (payload.image !== undefined) data.image = payload.image;
    if (payload.gallery) data.gallery = payload.gallery;
    if (payload.price !== undefined) data.price = Number(payload.price);
    if (payload.stock !== undefined) data.stock = Number(payload.stock);
    if (payload.currency) data.currency = payload.currency;
    if (payload.comparePrice !== undefined) data.comparePrice = Number(payload.comparePrice);
    if (payload.category !== undefined) data.category = payload.category;
    if (payload.diet !== undefined) data.diet = payload.diet;
    if (payload.prepTime !== undefined) data.prepTime = Number(payload.prepTime);
    if (payload.ingredients) data.ingredients = payload.ingredients;
    if (payload.tags) data.tags = payload.tags;
    if (payload.rating !== undefined) data.rating = Number(payload.rating);
    if (payload.nutrition) data.nutrition = payload.nutrition;
    if (payload.slug) data.slug = payload.slug;

    if (Array.isArray(payload.customizations)) {
      data.customizations = payload.customizations.filter(Boolean).map(mapCustomization);
    }

    return this.products.updateById(id, data);
  }
}
