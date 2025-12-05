export const createProductEntity = (data = {}) => ({
  id: data.id ?? "",
  name: data.name ?? "",
  description: data.description ?? "",
  image: data.image ?? "",
  price: data.price ?? 0,
  category: data.category ?? "",
  tags: data.tags ?? [],
  rating: data.rating ?? 0,
  nutrition: data.nutrition ?? { calories: 0, protein: 0, carbs: 0, fat: 0 }
});
