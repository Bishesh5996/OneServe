import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";

export class GetProductUseCase {
  constructor(products = new ProductRepository()) {
    this.products = products;
  }

  execute(slug) {
    return this.products.findBySlug(slug);
  }
}
