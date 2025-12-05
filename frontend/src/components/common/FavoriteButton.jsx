import { useEffect, useState } from "react";

import { useAuthStore } from "@stores/useAuthStore.js";
import { useFavoritesStore } from "@stores/useFavoritesStore.js";

const HeartIcon = ({ filled, size = 16 }) => (
  <svg
    height={size}
    width={size}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M12 21s-6-4.35-6-8.5S8.5 4 12 7.09 18 4 18 12.5 12 21 12 21z" />
  </svg>
);

export const FavoriteButton = ({ product, className = "", size = "md" }) => {
  const [pending, setPending] = useState(false);
  const userId = useAuthStore((state) => state.user?.id);
  const favoriteItems = useFavoritesStore((state) => state.items);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites);
  const isFavorite = favoriteItems.some((item) => item.id === product.id);

  useEffect(() => {
    if (userId) {
      fetchFavorites(userId);
    }
  }, [userId, fetchFavorites]);

  const handleToggle = async (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    if (pending) return;
    if (!userId) {
      window.alert("Please sign in to save favorites.");
      return;
    }
    setPending(true);
    try {
      await toggleFavorite(
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          comparePrice: product.comparePrice,
          image: product.image,
          gallery: product.gallery,
          rating: product.rating ?? 4.8,
          tags: product.tags,
          customizations: product.customizations,
          prepTime: product.prepTime,
          nutrition: product.nutrition
        },
        userId
      );
    } finally {
      setPending(false);
    }
  };

  const padding = size === "lg" ? "p-3.5" : "p-2.5";

  const palette = isFavorite ? "bg-black text-white" : "bg-white/90 text-black";

  return (
    <button
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={isFavorite}
      className={`rounded-full border border-black/10 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow ${palette} ${padding} ${className}`}
      disabled={pending}
      onClick={handleToggle}
      type="button"
    >
      <HeartIcon filled={isFavorite} size={size === "lg" ? 18 : 16} />
    </button>
  );
};
