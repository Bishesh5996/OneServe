import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { apiClient } from "@utils/apiClient.js";
import { ensureNprValue } from "@utils/currency.js";
import { fallbackProducts, normalizeProduct } from "@utils/productMappers.js";

const findFallbackProduct = (item = {}) => {
  if (!item) return null;
  const candidateIds = [item.id, item.productId, item._id].filter(Boolean);
  const candidateSlugs = [item.slug, item.productSlug, item.handle].filter(Boolean);
  return (
    fallbackProducts.find((product) => candidateIds.includes(product.id)) ??
    fallbackProducts.find((product) => candidateSlugs.includes(product.slug)) ??
    null
  );
};

const hydrateFavorite = (item = {}) => {
  const fallback = findFallbackProduct(item) ?? {};
  const normalized = normalizeProduct({
    ...fallback,
    ...item,
    id: item.id ?? item.productId ?? fallback.id,
    slug: item.slug ?? item.handle ?? item.productSlug ?? fallback.slug ?? fallback.id ?? item.productId,
    price: item.price,
    comparePrice: item.comparePrice,
    image: item.image,
    gallery: item.gallery,
    rating: item.rating,
    description: item.description ?? fallback.description ?? "Saved kit from your favorites.",
    category: item.category ?? fallback.category ?? "Featured",
    prepTime: item.prepTime ?? fallback.prepTime,
    nutrition: item.nutrition ?? fallback.nutrition,
    tags: item.tags ?? fallback.tags
  });

  const sourceCurrency = item.currency ?? fallback.currency ?? normalized.currency ?? null;
  const price = ensureNprValue(normalized.price ?? fallback.price ?? 0, sourceCurrency);
  const comparePrice = normalized.comparePrice ? ensureNprValue(normalized.comparePrice, sourceCurrency) : undefined;

  return {
    ...normalized,
    price,
    comparePrice,
    currency: "NPR"
  };
};

export const useFavoritesStore = create(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        syncing: false,
        syncingUserId: null,
        lastSyncedUserId: null,
        error: null,
        isFavorite: (productId) => get().items.some((item) => item.id === productId),
        fetchFavorites: async (userId) => {
          if (!userId) return get().items;
          if (get().lastSyncedUserId === userId && get().items.length) {
            return get().items;
          }
          if (get().syncing && get().syncingUserId === userId) {
            return get().items;
          }
          set({ syncing: true, syncingUserId: userId, error: null });
          try {
            const response = await apiClient.get("/users/me/favorites");
            const normalized = response.data.map(hydrateFavorite);
            set({ items: normalized, syncing: false, syncingUserId: null, lastSyncedUserId: userId });
            return normalized;
          } catch (error) {
            set({ syncing: false, syncingUserId: null, error: error.response?.data?.message ?? error.message });
            return get().items;
          }
        },
        toggleFavorite: async (product, userId) => {
          const currentItems = get().items;
          const exists = currentItems.some((item) => item.id === product.id);
          const optimisticItems = exists ? currentItems.filter((item) => item.id !== product.id) : [...currentItems, hydrateFavorite(product)];
          set({ items: optimisticItems });

          if (!userId) {
            return optimisticItems;
          }

          try {
            const response = exists
              ? await apiClient.delete(`/users/me/favorites/${product.id}`)
              : await apiClient.post(`/users/me/favorites/${product.id}`, product);
            const normalized = response.data.map(hydrateFavorite);
            set({ items: normalized, lastSyncedUserId: userId, error: null });
            return normalized;
          } catch (error) {
            // Revert optimistic update on failure
            set({
              items: currentItems,
              error: error.response?.data?.message ?? error.message
            });
            return currentItems;
          }
        },
        clearFavorites: () => set({ items: [], lastSyncedUserId: null, syncingUserId: null })
      }),
      { name: "ux-favorite-products" }
    )
  )
);
