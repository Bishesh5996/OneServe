import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";

export class ListAllOrdersUseCase {
  constructor(orders = new OrderRepository()) {
    this.orders = orders;
  }

  execute() {
    return this.orders.findAll();
  }
}
