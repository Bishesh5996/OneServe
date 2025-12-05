import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";
import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";
import { UserModel } from "../../infrastructure/db/models/user.model.js";

export class AdminAnalyticsUseCase {
  constructor(orders = new OrderRepository(), products = new ProductRepository()) {
    this.orders = orders;
    this.products = products;
  }

  async execute() {
    const [orderStats, totalUsers, productsList] = await Promise.all([
      this.orders.getAdminStats(),
      UserModel.countDocuments(),
      this.products.list({ limit: 5, page: 1 })
    ]);

    return {
      totalOrders: orderStats.totalOrders,
      totalRevenue: orderStats.revenue,
      totalUsers,
      recentOrders: orderStats.recentOrders,
      featuredProducts: productsList.data
    };
  }
}
