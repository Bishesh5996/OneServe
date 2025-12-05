import { ShopProductCard } from "@components/cards/ShopProductCard.jsx";
import { useDashboardData } from "@/hooks/useDashboardData.js";

export const UserDashboardFavoritesPage = () => {
  const { user, favoriteItems, favoritesLoading } = useDashboardData();

  if (!user) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-semibold text-black">Sign in to view favorites</h1>
        <p className="mt-2 text-sm text-black/70">You need an account to save and revisit meal kits.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4 py-12">
      <h1 className="text-3xl font-bold text-black">Saved Meal Kits</h1>
      {favoritesLoading ? (
        <p className="text-sm text-black/60">Loading your favorites…</p>
      ) : favoriteItems.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {favoriteItems.map((product) => (
            <ShopProductCard key={product.id} product={product} showFavoriteControl variant="compact" />
          ))}
        </div>
      ) : (
        <p className="text-sm text-black/60">No favorites yet. Tap the heart on a kit to save it for later.</p>
      )}
    </section>
  );
};
