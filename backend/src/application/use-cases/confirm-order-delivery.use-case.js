import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";

export class ConfirmOrderDeliveryUseCase {
  constructor(orders = new OrderRepository()) {
    this.orders = orders;
  }

  async execute(orderId, userId) {
    if (!orderId || !userId) {
      throw new Error("Order and user are required");
    }
    const order = await this.orders.updateStatusForUser(orderId, userId, "delivered");
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  }
}
