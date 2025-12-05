import { OrderRepository } from "../../infrastructure/repositories/order.repository.js";
import { ProductRepository } from "../../infrastructure/repositories/product.repository.js";

const normalizeSelection = (selection = {}, definition = {}) => ({
  id: definition.id ?? selection.id,
  name: definition.name ?? selection.name,
  quantity:
    selection.quantity !== undefined ? Number(selection.quantity) : definition.defaultQuantity ?? selection.defaultQuantity ?? 0,
  unitPrice:
    selection.unitPrice !== undefined
      ? Number(selection.unitPrice)
      : definition.unitPrice ?? selection.unitPrice ?? 0,
  defaultQuantity:
    selection.defaultQuantity !== undefined
      ? Number(selection.defaultQuantity)
      : definition.defaultQuantity ?? 0
});

const calculatePrice = (product, selections = []) => {
  const basePrice = Number(product.price ?? 0);
  const adjustments = selections.reduce((sum, custom) => {
    const delta = custom.quantity - (custom.defaultQuantity ?? 0);
    return sum + delta * (custom.unitPrice ?? 0);
  }, 0);
  return basePrice + adjustments;
};

export class CreateOrderUseCase {
  constructor(orders = new OrderRepository(), products = new ProductRepository()) {
    this.orders = orders;
    this.products = products;
  }

  async execute(dto) {
    const reservations = [];

    const items = await Promise.all(
      dto.items.map(async (item) => {
        let product = null;
        if (item.productId) {
          product = await this.products.findById(item.productId);
        }
        if (!product) {
          product = {
            id: item.productId,
            name: item.name ?? "Meal Kit",
            price: item.price ?? 0,
            image: item.image,
            customizations: item.customizations
          };
          if (!product.price) {
            throw new Error("Product not found");
          }
        }

        const definitionMap = new Map((product.customizations ?? []).map((custom) => [custom.id ?? custom.name, custom]));
        const selections = Array.isArray(item.customizations)
          ? item.customizations.map((selection) =>
              normalizeSelection(selection, definitionMap.get(selection.id) ?? definitionMap.get(selection.name))
            )
          : (product.customizations ?? []).map((definition) => normalizeSelection({}, definition));

        const pricePerUnit = calculatePrice(product, selections);

        if (product && product.id) {
          const customizationUsage = selections.map((selection) => ({
            id: selection.id ?? selection.name,
            name: selection.name,
            amount: Math.max(0, Number(selection.quantity ?? 0)) * Math.max(1, Number(item.quantity ?? 1))
          }));
          reservations.push({
            productId: product.id,
            quantity: Math.max(1, Number(item.quantity ?? 1)),
            customizations: customizationUsage
          });
        }

        return {
          productId: product.id,
          name: product.name,
          quantity: item.quantity,
          price: pricePerUnit,
          basePrice: product.price,
          image: product.image,
          customizations: selections
        };
      })
    );

    for (const reservation of reservations) {
      await this.products.adjustStock(reservation.productId, reservation.quantity, reservation.customizations);
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return this.orders.create({
      userId: dto.userId,
      items,
      total,
      shipping: dto.shippingAddress
    });
  }
}
