import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";

export class ListUserOrdersUseCase {
  constructor(orders = new OrderRepository()) {
    this.orders = orders;
  }

  execute(userId) {
    return this.orders.listByUser(userId);
  }
}
