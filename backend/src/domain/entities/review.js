export const createReviewEntity = (data = {}) => ({
  id: data.id ?? "",
  productId: data.productId ?? "",
  userId: data.userId ?? "",
  rating: data.rating ?? 0,
  comment: data.comment ?? "",
  createdAt: data.createdAt ?? new Date()
});
