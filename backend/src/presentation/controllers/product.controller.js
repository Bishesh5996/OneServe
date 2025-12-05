import mongoose from "mongoose";

import { CreateProductUseCase } from "../../application/use-cases/create-product.use-case.js";
import { GetProductUseCase } from "../../application/use-cases/get-product.use-case.js";
import { ListProductsUseCase } from "../../application/use-cases/list-products.use-case.js";
import { UpdateProductUseCase } from "../../application/use-cases/update-product.use-case.js";

const listUseCase = new ListProductsUseCase();
const getUseCase = new GetProductUseCase();
const createUseCase = new CreateProductUseCase();
const updateUseCase = new UpdateProductUseCase();

export class ProductController {
  static async list(req, res) {
    try {
      const { page, limit, category } = req.query;
      const result = await listUseCase.execute({
        page: page ? Number(page) : undefined,
        limit: limit ? Number(limit) : undefined,
        category: category ? category.toString() : undefined
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;
      if (!slug) {
        return res.status(400).json({ message: "Product slug is required" });
      }
      if (mongoose.Types.ObjectId.isValid(slug)) {
        return res.status(410).json({ message: "Product detail URLs now use slugs instead of IDs." });
      }
      const product = await getUseCase.execute(slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const created = await createUseCase.execute(req.body);
      res.status(201).json(created);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await updateUseCase.execute(id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
