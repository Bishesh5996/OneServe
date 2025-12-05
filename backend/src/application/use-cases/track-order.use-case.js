import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";

export class TrackOrderUseCase {
  constructor(orders = new OrderRepository()) {
    this.orders = orders;
  }

  execute(code) {
    return this.orders.findByTrackingCode(code);
  }
}
