import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";

export class ListProductsUseCase {
  constructor(products = new ProductRepository()) {
    this.products = products;
  }

  execute(params = {}) {
    return this.products.list(params);
  }
}
