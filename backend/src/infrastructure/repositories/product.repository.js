import mongoose from "mongoose";

import { ProductModel } from "../db/models/product.model.js";

const { Types } = mongoose;

const normalizeSlug = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

export class ProductRepository {
  async list(params = {}) {
    const { page = 1, limit = 12, category } = params;
    const query = category ? { category } : {};
    const [data, total] = await Promise.all([
      ProductModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ProductModel.countDocuments(query)
    ]);

    return {
      data: data.map((doc) => this.map(doc)),
      total
    };
  }

  async findBySlug(slug) {
    const normalized = normalizeSlug(slug);
    if (!normalized) return null;
    const product = await ProductModel.findOne({ slug: normalized });
    return product ? this.map(product) : null;
  }

  async findById(id) {
    if (!Types.ObjectId.isValid(id)) return null;
    const product = await ProductModel.findById(id);
    return product ? this.map(product) : null;
  }

  async findManyByIds(ids = []) {
    if (!ids?.length) return [];
    const validIds = ids.filter((id) => Types.ObjectId.isValid(id));
    if (!validIds.length) return [];
    const products = await ProductModel.find({ _id: { $in: validIds } });
    return products.map((doc) => this.map(doc));
  }

  async create(data) {
    if (!data?.slug) {
      throw new Error("Product slug is required");
    }
    const slug = normalizeSlug(data.slug);
    if (!slug) {
      throw new Error("Product slug is required");
    }
    const doc = await ProductModel.create({ ...data, slug });
    return this.map(doc);
  }

  async updateById(id, data) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error("Invalid product id");
    }
    const normalized = data.slug ? normalizeSlug(data.slug) : undefined;
    const payload = { ...data };
    if (normalized) {
      payload.slug = normalized;
    }
    const doc = await ProductModel.findByIdAndUpdate(id, payload, { new: true });
    return doc ? this.map(doc) : null;
  }

  async adjustStock(productId, quantity, customizationUsage = []) {
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product id");
    }
    const doc = await ProductModel.findById(productId);
    if (!doc) {
      throw new Error("Product not found");
    }
    const decrement = Math.max(0, Number(quantity) || 0);
    const currentStock = typeof doc.stock === "number" ? doc.stock : 50;
    if (decrement > currentStock) {
      throw new Error("Not enough stock available for this product.");
    }
    doc.stock = currentStock - decrement;

    customizationUsage.forEach((usage) => {
      if (!usage) return;
      const required = Math.max(0, Number(usage.amount) || 0);
      if (required === 0) return;
      const target =
        doc.customizations?.id(usage.id) ??
        doc.customizations?.find((custom) => (custom._id?.toString() ?? custom.id) === usage.id || custom.name === usage.name);
      if (!target) return;
      if (typeof target.stock === "number") {
        if (required > target.stock) {
          throw new Error(`Not enough stock for option "${target.name}".`);
        }
        target.stock = target.stock - required;
      }
    });

    await doc.save();
    return this.map(doc);
  }

  async seed(products = []) {
    await ProductModel.deleteMany({});
    const prepared = products.map((product) => {
      if (!product.slug) {
        throw new Error("Seed product missing slug");
      }
      const slug = normalizeSlug(product.slug);
      if (!slug) {
        throw new Error(`Invalid slug for seed product "${product.name ?? "Unnamed"}"`);
      }
      return { ...product, slug };
    });
    const inserted = await ProductModel.insertMany(prepared);
    return inserted.map((doc) => this.map(doc));
  }

  map(doc) {
    return {
      id: doc._id.toString(),
      slug: doc.slug,
      name: doc.name,
      description: doc.description,
      image: doc.image,
      gallery: doc.gallery ?? [],
      price: doc.price,
      stock: typeof doc.stock === "number" ? doc.stock : 50,
      currency: doc.currency ?? "NPR",
      comparePrice: doc.comparePrice,
      category: doc.category,
      diet: doc.diet,
      tags: doc.tags,
      prepTime: doc.prepTime,
      rating: doc.rating,
      ingredients: doc.ingredients ?? [],
      nutrition: doc.nutrition,
      customizations:
        doc.customizations?.map((custom) => ({
          id: custom._id?.toString() ?? custom.id,
          name: custom.name,
          description: custom.description,
          unitPrice: custom.unitPrice,
          stock: typeof custom.stock === "number" ? custom.stock : 50,
          minQuantity: custom.minQuantity,
          maxQuantity: custom.maxQuantity,
          defaultQuantity: custom.defaultQuantity
        })) ?? []
    };
  }
}
