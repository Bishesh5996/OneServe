import { CreateOrderUseCase } from "../../application/use-cases/create-order.use-case.js";
import { TrackOrderUseCase } from "../../application/use-cases/track-order.use-case.js";
import { ListUserOrdersUseCase } from "../../application/use-cases/list-user-orders.use-case.js";
import { ListAllOrdersUseCase } from "../../application/use-cases/list-all-orders.use-case.js";
import { UpdateOrderStatusUseCase } from "../../application/use-cases/update-order-status.use-case.js";
import { ConfirmOrderDeliveryUseCase } from "../../application/use-cases/confirm-order-delivery.use-case.js";

const createUseCase = new CreateOrderUseCase();
const trackUseCase = new TrackOrderUseCase();
const listMineUseCase = new ListUserOrdersUseCase();
const listAllUseCase = new ListAllOrdersUseCase();
const updateStatusUseCase = new UpdateOrderStatusUseCase();
const confirmDeliveryUseCase = new ConfirmOrderDeliveryUseCase();

export class OrderController {
  static async create(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const order = await createUseCase.execute({
        userId,
        items: req.body.items,
        shippingAddress: req.body.shippingAddress
      });
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async listMine(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const orders = await listMineUseCase.execute(userId);
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async listAll(_req, res) {
    try {
      const orders = await listAllUseCase.execute();
      res.json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async track(req, res) {
    try {
      const order = await trackUseCase.execute(req.params.code);
      if (!order) return res.status(404).json({ message: "Order not found" });
      res.json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateStatus(req, res) {
    try {
      const order = await updateStatusUseCase.execute(req.params.id, req.body.status);
      res.json(order);
    } catch (error) {
      res.status(/not found/i.test(error.message) ? 404 : 400).json({ message: error.message });
    }
  }

  static async markReceived(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const order = await confirmDeliveryUseCase.execute(req.params.id, userId);
      res.json(order);
    } catch (error) {
      res.status(/not found/i.test(error.message) ? 404 : 400).json({ message: error.message });
    }
  }
}
