export const createOrderPayload = (payload = {}) => ({
  userId: payload.userId ?? "",
  items: payload.items ?? [],
  shippingAddress: payload.shippingAddress ?? {}
});
