import { Link, useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { ShopProductCard } from "@components/cards/ShopProductCard.jsx";
import { useCartStore } from "@stores/useCartStore.js";
import { useDashboardData } from "@/hooks/useDashboardData.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const formatCurrency = (value = 0) => formatCurrencyNpr(value);

export const UserDashboardHomePage = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const { user, orders, ordersError, stats, favoriteItems } = useDashboardData();

  return (
    <section className="space-y-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-black/60">Welcome Back</p>
          <h1 className="text-3xl font-bold text-black">{user?.name ?? "Guest"}</h1>
        </div>
        {user?.role && (
          <span className="rounded-full border border-black/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black/70">
            {user.role}
          </span>
        )}
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active Kits" value={items.length} />
        <StatCard label="Orders" value={stats.totalOrders} />
        <StatCard label="Meals Enjoyed" value={stats.meals} />
      </div>
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-black">Recent Orders</h2>
        <p className="text-sm text-black/70">Track all of your deliveries and reorder favorites.</p>
        {ordersError && <p className="mt-4 text-sm text-red-600">{ordersError}</p>}
        {orders.length ? (
          <div className="mt-4 space-y-3">
            {orders.map((order) => (
              <article key={order.id} className="space-y-3 rounded-2xl border border-black/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-black">{order.trackingCode}</p>
                    <p className="text-xs text-black/60">
                      {new Date(order.createdAt).toLocaleDateString()} · {(order.items ?? []).length} kits
                    </p>
                    <p className="text-xs capitalize text-black/60">Status: {order.status}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-black">{formatCurrency(order.total)}</p>
                    <p className="text-xs text-black/50">
                      Updated {order.updatedAt ? new Date(order.updatedAt).toLocaleDateString() : "—"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-xs text-black/70">
                  {(order.items ?? []).map((item) => (
                    <div key={`${order.id}-${item.productId ?? item.name}`} className="rounded-2xl bg-black/5 px-3 py-1">
                      <span className="font-semibold text-black">{item.name}</span> ×{item.quantity}
                      {renderCompactCustomizations(item)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold capitalize text-black/70">{order.status}</span>
                  <button
                    className="rounded-full border border-black px-4 py-1 text-xs font-semibold text-black hover:bg-black/10"
                    onClick={() => navigate(ROUTE_PATHS.orderTracking, { state: { trackingCode: order.trackingCode, order } })}
                    type="button"
                  >
                    Track Order
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-black/60">No orders yet. Start with your first kit!</p>
        )}
      </div>
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-black">Your Favorites</h2>
        <p className="text-sm text-black/70">Kits you&apos;ve saved from the shop.</p>
        {favoriteItems.length ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {favoriteItems.map((product) => (
              <ShopProductCard key={product.id} product={product} showFavoriteControl variant="compact" />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-black/60">No favorites yet. Tap the heart on a kit to save it for later.</p>
        )}
      </div>
      <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-black">Spending Overview</h2>
        <p className="text-sm text-black/70">Total spent with OneServe.</p>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-black/5 p-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-black/50">Total Spent</p>
            <p className="text-3xl font-black text-black">{formatCurrency(stats.spent)}</p>
          </div>
          <div className="flex gap-3">
            <Link className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black" to={ROUTE_PATHS.checkout}>
              Finish Checkout
            </Link>
            <Link className="rounded-full border border-black px-5 py-2 text-sm font-semibold text-black" to={ROUTE_PATHS.mealKits}>
              Browse Kits
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ label, value }) => (
  <article className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
    <p className="text-sm text-black/60">{label}</p>
    <p className="text-4xl font-black text-black">{value}</p>
  </article>
);

const renderCompactCustomizations = (item) => {
  if (!item.customizations?.length) return null;
  const rows = item.customizations
    .map((custom) => {
      const defaultQty = custom.defaultQuantity ?? 0;
      const diff = (custom.quantity ?? defaultQty) - defaultQty;
      if (!diff) return null;
      const priceChange = diff * (custom.unitPrice ?? 0);
      return (
        <p key={`${item.productId}-${custom.id ?? custom.name}`} className="text-[11px] text-black/50">
          {diff > 0 ? "+" : ""}
          {diff} {custom.name} ({priceChange > 0 ? "+" : priceChange < 0 ? "-" : ""}
          {formatCurrencyNpr(Math.abs(priceChange))})
        </p>
      );
    })
    .filter(Boolean);
  if (!rows.length) return null;
  return <div className="mt-1 space-y-0.5">{rows}</div>;
};
