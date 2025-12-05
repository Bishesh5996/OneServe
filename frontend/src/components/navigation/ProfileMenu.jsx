import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";
import { useCartStore } from "@stores/useCartStore.js";
import { useDashboardData } from "@/hooks/useDashboardData.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const formatDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return value;
  }
};

export const ProfileMenu = ({ onNavigate }) => {
  const navigate = useNavigate();
  const authUser = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const cartItems = useCartStore((state) => state.items);
  const { favoriteItems, orders } = useDashboardData();

  const totalCartItems = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const handleNavigate = (path, options) => {
    onNavigate?.();
    navigate(path, options);
  };

  if (!authUser) {
    return (
      <div className="w-72 rounded-3xl border border-black/10 bg-white p-6 text-sm text-black shadow-xl">
        <p className="text-lg font-semibold">Welcome</p>
        <p className="text-black/60">Sign in to see your saved kits, orders, and preferences.</p>
        <div className="mt-4 space-y-3">
          <button
            className="block w-full rounded-full bg-orange-500 px-4 py-2 text-center font-semibold text-black"
            onClick={() => handleNavigate(ROUTE_PATHS.login)}
            type="button"
          >
            Login
          </button>
          <button
            className="block w-full rounded-full border border-black px-4 py-2 text-center font-semibold text-black hover:bg-black/10"
            onClick={() => handleNavigate(ROUTE_PATHS.signup)}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  const quickLinks = [
    { label: "Dashboard", path: ROUTE_PATHS.userDashboard },
    { label: "Favorites", path: ROUTE_PATHS.userDashboardFavorites },
    { label: "Orders", path: ROUTE_PATHS.userDashboardOrders },
    { label: "Profile", path: ROUTE_PATHS.userDashboardProfile },
    { label: "Track Order", path: ROUTE_PATHS.orderTracking },
    { label: "Checkout", path: ROUTE_PATHS.checkout },
    ...(authUser.role === "admin" ? [{ label: "Admin Dashboard", path: ROUTE_PATHS.adminDashboard }] : [])
  ];

  return (
    <div className="w-[320px] max-h-[80vh] overflow-hidden rounded-3xl border border-black/10 bg-white text-sm text-black shadow-xl">
      <div className="max-h-[80vh] space-y-4 overflow-y-auto p-6 pr-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-black">
            {authUser.name?.[0] ?? "U"}
          </div>
          <div>
            <p className="text-base font-semibold">{authUser.name}</p>
            <p className="text-xs text-black/60">{authUser.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-xs uppercase tracking-[0.2em] text-black/60">
          <Stat value={orders.length} label="Orders" />
          <Stat value={favoriteItems.length} label="Favorites" />
          <Stat value={totalCartItems} label="In Cart" />
        </div>
        <div className="space-y-2 text-sm">
          <SectionTitle title="Quick Links" />
          {quickLinks.map((link) => (
            <button
              key={link.path}
              className="block w-full rounded-2xl border border-black/5 px-4 py-2 text-left font-semibold text-black hover:bg-black/5"
              onClick={() => handleNavigate(link.path)}
              type="button"
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="space-y-3 text-sm">
          <SectionTitle title="Recent Orders" />
          {orders.length ? (
            <div className="max-h-48 space-y-2 overflow-y-auto">
            {orders.slice(0, 3).map((order) => (
              <div key={order.id} className="rounded-2xl border border-black/5 p-3">
                <p className="text-xs text-black/60">{formatDate(order.createdAt)}</p>
                <p className="text-sm font-semibold">{order.trackingCode}</p>
                <p className="text-xs text-black/60">
                  {(order.items ?? []).length} kits · {formatCurrencyNpr(order.total)} · {order.status}
                </p>
                <button
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-black px-3 py-1 text-xs font-semibold text-black hover:bg-black/10"
                  onClick={() => handleNavigate(ROUTE_PATHS.orderTracking, { state: { trackingCode: order.trackingCode, order } })}
                  type="button"
                >
                  Track Order
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-black/60">No orders yet.</p>
        )}
      </div>
        <div className="space-y-3 text-sm">
          <SectionTitle title="Favorites" />
          {favoriteItems.length ? (
            <div className="max-h-40 space-y-2 overflow-y-auto">
            {favoriteItems.slice(0, 3).map((favorite) =>
              favorite.slug ? (
                <button
                  key={`${favorite.id}-${favorite.slug}`}
                  className="flex w-full items-center gap-3 rounded-2xl border border-black/5 p-2 text-left hover:bg-black/5"
                  onClick={() => handleNavigate(`${ROUTE_PATHS.product}/${favorite.slug}`)}
                  type="button"
                >
                  {favorite.image ? <img alt={favorite.name} className="h-10 w-10 rounded-xl object-cover" src={favorite.image} /> : <div className="h-10 w-10 rounded-xl bg-black/5" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-black">{favorite.name}</p>
                    <p className="text-xs text-black/60">{formatCurrencyNpr(favorite.price)}</p>
                  </div>
                  <span className="text-xs font-semibold text-orange-500">★ {favorite.rating?.toFixed(1) ?? "4.8"}</span>
                </button>
              ) : null
            )}
          </div>
        ) : (
          <p className="text-xs text-black/60">Tap the heart on any kit to save it here.</p>
        )}
      </div>
        <button
          className="mt-4 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm font-semibold text-black hover:bg-black/5"
          onClick={() => {
            signOut();
            handleNavigate(ROUTE_PATHS.home);
          }}
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const Stat = ({ value, label }) => (
  <div>
    <p className="text-lg font-bold text-black">{value}</p>
    <p>{label}</p>
  </div>
);

const SectionTitle = ({ title }) => <p className="text-xs uppercase tracking-[0.3em] text-black/60">{title}</p>;
