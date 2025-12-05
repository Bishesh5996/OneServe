import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";

const ALLOWED_STATUSES = ["pending", "confirmed", "preparing", "packed", "shipped", "out-for-delivery", "delivered"];

export class UpdateOrderStatusUseCase {
  constructor(orders = new OrderRepository()) {
    this.orders = orders;
  }

  async execute(id, status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error("Invalid order status");
    }
    const order = await this.orders.updateStatus(id, status);
    if (!order) throw new Error("Order not found");
    return order;
  }
}
