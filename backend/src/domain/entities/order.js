export const createOrderEntity = (data = {}) => ({
  id: data.id ?? "",
  userId: data.userId ?? "",
  items: data.items ?? [],
  total: data.total ?? 0,
  status: data.status ?? "pending",
  trackingCode: data.trackingCode ?? "",
  createdAt: data.createdAt ?? new Date(),
  updatedAt: data.updatedAt ?? new Date()
});
