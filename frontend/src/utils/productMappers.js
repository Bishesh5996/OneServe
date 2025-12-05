import { mealKits } from "@assets/mealKits.js";

const DEFAULT_NUTRITION = { calories: 420, protein: 15, carbs: 55, fat: 18 };
const DEFAULT_INGREDIENTS = ["Chef-selected produce", "Handmade sauce", "Finishing herbs", "Premium protein"];
const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;

const slugifyValue = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const ensureGallery = (product) => {
  if (Array.isArray(product?.gallery) && product.gallery.length > 0) {
    return product.gallery.filter(Boolean);
  }
  if (Array.isArray(product?.images) && product.images.length > 0) {
    return product.images.filter(Boolean);
  }
  return product?.image ? [product.image] : [];
};

export const normalizeProduct = (product = {}) => {
  const normalizedNutrition = {
    calories: product?.nutrition?.calories ?? DEFAULT_NUTRITION.calories,
    protein: product?.nutrition?.protein ?? DEFAULT_NUTRITION.protein,
    carbs: product?.nutrition?.carbs ?? DEFAULT_NUTRITION.carbs,
    fat: product?.nutrition?.fat ?? DEFAULT_NUTRITION.fat
  };

  const generatedId =
    product.id ??
    product._id ??
    (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2));

  const resolvedPrice = Number(product.price ?? 0);
  const resolvedCurrency = product.currency ?? (resolvedPrice > 60 ? "NPR" : "USD");
  const explicitSlug = [product.slug, product.handle, product.slugId, product.permalink].find((value) => typeof value === "string" && value.trim().length);
  const fallbackSlugFromId =
    typeof product.id === "string" && !OBJECT_ID_REGEX.test(product.id) ? slugifyValue(product.id) : typeof product._id === "string" && !OBJECT_ID_REGEX.test(product._id) ? slugifyValue(product._id) : null;
  const resolvedSlug = explicitSlug ? slugifyValue(explicitSlug) : fallbackSlugFromId ?? (product.name ? slugifyValue(product.name) : generatedId);

  const normalizedCustomizations = Array.isArray(product.customizations)
    ? product.customizations.map((custom, index) => ({
        id: custom.id ?? custom._id ?? `custom-${index}`,
        name: custom.name ?? `Option ${index + 1}`,
        description: custom.description ?? "",
        unitPrice: Number(custom.unitPrice ?? 0),
        stock: typeof custom.stock === "number" ? custom.stock : 50,
        minQuantity: Number.isFinite(custom.minQuantity) ? Number(custom.minQuantity) : 0,
        maxQuantity: Number.isFinite(custom.maxQuantity) ? Number(custom.maxQuantity) : 2,
        defaultQuantity: Number.isFinite(custom.defaultQuantity) ? Number(custom.defaultQuantity) : 0
      }))
    : [];

  return {
    id: generatedId,
    slug: resolvedSlug,
    name: product.name ?? "Single-Serve Meal Kit",
    description: product.description ?? "Perfectly portioned kit for delicious meals in minutes.",
    image: product.image ?? product.images?.[0] ?? ensureGallery(product)[0],
    gallery: ensureGallery(product),
    price: resolvedPrice,
    stock: typeof product.stock === "number" ? product.stock : 50,
    currency: resolvedCurrency,
    comparePrice: Number(product.comparePrice ?? (resolvedPrice ? resolvedPrice * 1.2 : 0)),
    rating: Number(product.rating ?? 4.8),
    reviewsCount: product.reviewsCount ?? product.reviews ?? 120,
    category: product.category ?? "Dinner",
    diet: product.diet ?? product.category ?? "Dinner",
    prepTime: product.prepTime ?? "20 min",
    calories: product.calories ?? normalizedNutrition.calories,
    nutrition: normalizedNutrition,
    ingredients: product.ingredients?.length ? product.ingredients : DEFAULT_INGREDIENTS,
    tags: product.tags ?? [],
    customizations: normalizedCustomizations,
    status: product.status ?? (product.tags?.includes("Sale") ? "sale" : undefined)
  };
};

export const mapProductsResponse = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload.map((item) => normalizeProduct(item));
  if (Array.isArray(payload?.data)) return payload.data.map((item) => normalizeProduct(item));
  if (Array.isArray(payload?.products)) return payload.products.map((item) => normalizeProduct(item));
  return [];
};

export const fallbackProducts = mealKits.map((kit) => normalizeProduct(kit));
