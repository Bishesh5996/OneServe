import { useEffect, useState } from "react";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { MealKitCard } from "@components/cards/MealKitCard.jsx";
import { apiClient } from "@utils/apiClient.js";
import { fallbackProducts, mapProductsResponse } from "@utils/productMappers.js";

const FEATURED_LIMIT = 8;

export const FeaturedKitsSection = () => {
  const [kits, setKits] = useState(fallbackProducts.slice(0, FEATURED_LIMIT));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/products", { params: { limit: FEATURED_LIMIT, sort: "featured" } });
        const normalized = mapProductsResponse(response.data);
        if (!ignore && normalized.length) {
          setKits(normalized.slice(0, FEATURED_LIMIT));
        }
      } catch (error) {
        // swallow and fallback to static kits
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="space-y-8 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black">Featured Meal Kits</p>
          <h2 className="text-3xl font-bold text-black">Handpicked favorites for you</h2>
        </div>
        <a className="text-sm font-semibold text-black hover:text-black/70" href={ROUTE_PATHS.mealKits}>
          View All →
        </a>
      </header>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {kits.map((kit) => (
          <MealKitCard key={kit.id} kit={kit} />
        ))}
      </div>
      {loading && <p className="text-sm text-black/60">Loading featured kits…</p>}
    </section>
  );
};
