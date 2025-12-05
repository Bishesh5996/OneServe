import { randomBytes } from "crypto";

import { OrderModel } from "../db/models/order.model.js";

export class OrderRepository {
  async create(params) {
    const trackingCode = `ORD-${randomBytes(3).toString("hex").toUpperCase()}`;
    const doc = await OrderModel.create({
      ...params,
      trackingCode,
      status: params.status ?? "confirmed"
    });
    return this.map(doc);
  }

  async findByTrackingCode(code) {
    const doc = await OrderModel.findOne({ trackingCode: code });
    return doc ? this.map(doc) : null;
  }

  async findAll() {
    const docs = await OrderModel.find().sort({ createdAt: -1 });
    return docs.map((doc) => this.map(doc));
  }

  async listByUser(userId) {
    const docs = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    return docs.map((doc) => this.map(doc));
  }

  async updateStatus(id, status) {
    const doc = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
    return doc ? this.map(doc) : null;
  }

  async updateStatusForUser(id, userId, status) {
    const doc = await OrderModel.findOneAndUpdate({ _id: id, userId }, { status }, { new: true });
    return doc ? this.map(doc) : null;
  }

  async getAdminStats() {
    const [totalOrders, revenueAgg, recentOrders] = await Promise.all([
      OrderModel.countDocuments(),
      OrderModel.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      OrderModel.find().sort({ createdAt: -1 }).limit(5)
    ]);

    return {
      totalOrders,
      revenue: revenueAgg[0]?.total ?? 0,
      recentOrders: recentOrders.map((doc) => this.map(doc))
    };
  }

  map(doc) {
    return {
      id: doc._id.toString(),
      userId: doc.userId.toString(),
      items: doc.items.map((item) => ({
        ...item,
        id: item.productId
      })),
      total: doc.total,
      status: doc.status,
      shipping: doc.shipping,
      trackingCode: doc.trackingCode,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}
