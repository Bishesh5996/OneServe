import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";

const slugifyValue = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

export class CreateProductUseCase {
  constructor(products = new ProductRepository()) {
    this.products = products;
  }

  async execute(payload) {
    if (!payload?.name) {
      throw new Error("Product name is required");
    }
    if (!payload.price) {
      throw new Error("Product price is required");
    }
    const slug = slugifyValue(payload.slug ?? payload.name);
    if (!slug) {
      throw new Error("Product slug is required");
    }
    const currencyInput = payload.currency ? payload.currency.toString().toUpperCase() : "NPR";
    const currency = currencyInput === "USD" ? "USD" : "NPR";
    const data = {
      name: payload.name,
      slug,
      description: payload.description,
      image: payload.image,
      gallery: payload.gallery?.length ? payload.gallery : [payload.image].filter(Boolean),
      price: Number(payload.price),
      stock: Number.isFinite(payload.stock) ? Number(payload.stock) : 0,
      currency,
      comparePrice: payload.comparePrice ? Number(payload.comparePrice) : undefined,
      category: payload.category,
      diet: payload.diet,
      prepTime: Number(payload.prepTime) || undefined,
      ingredients: payload.ingredients?.length ? payload.ingredients : undefined,
      tags: payload.tags?.length ? payload.tags : undefined,
      rating: payload.rating ? Number(payload.rating) : undefined,
      nutrition: payload.nutrition,
      customizations: Array.isArray(payload.customizations)
        ? payload.customizations
            .filter((custom) => custom?.name)
            .map((custom) => ({
              name: custom.name,
              description: custom.description,
              unitPrice: Number(custom.unitPrice) || 0,
              stock: Number.isFinite(custom.stock) ? Number(custom.stock) : 0,
              minQuantity: Number.isFinite(custom.minQuantity) ? Number(custom.minQuantity) : 0,
              maxQuantity: Number.isFinite(custom.maxQuantity) ? Number(custom.maxQuantity) : 2,
              defaultQuantity: Number.isFinite(custom.defaultQuantity) ? Number(custom.defaultQuantity) : 0
            }))
        : undefined
    };
    return this.products.create(data);
  }
}
