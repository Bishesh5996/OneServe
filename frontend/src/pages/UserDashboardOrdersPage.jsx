import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useDashboardData } from "@/hooks/useDashboardData.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const formatCurrency = (value = 0) => formatCurrencyNpr(value);

export const UserDashboardOrdersPage = () => {
  const navigate = useNavigate();
  const { user, orders, ordersError, ordersLoading } = useDashboardData();

  if (!user) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-semibold text-black">Sign in to view orders</h1>
        <p className="mt-2 text-sm text-black/70">You need an account to review and track your orders.</p>
      </section>
    );
  }

  return (
    <section className="space-y-4 py-12">
      <h1 className="text-3xl font-bold text-black">Your Orders</h1>
      {ordersError && <p className="text-sm text-red-600">{ordersError}</p>}
      {ordersLoading && <p className="text-sm text-black/60">Loading orders…</p>}
      {orders.length ? (
        <div className="space-y-3">
          {orders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-black">{order.trackingCode}</p>
                  <p className="text-xs text-black/60">
                    {new Date(order.createdAt).toLocaleDateString()} · {(order.items ?? []).length} kits
                  </p>
                  <p className="text-xs capitalize text-black/60">Status: {order.status}</p>
                </div>
                <p className="text-sm font-semibold text-black">{formatCurrency(order.total)}</p>
              </div>
              <div className="mt-2 flex flex-col gap-2 text-xs text-black/70">
                {(order.items ?? []).map((item) => (
                  <div key={`${order.id}-${item.productId ?? item.name}`} className="rounded-2xl bg-black/5 px-3 py-1">
                    <span className="font-semibold text-black">{item.name}</span> ×{item.quantity}
                    {renderCompactCustomizations(item)}
                  </div>
                ))}
              </div>
              <button
                className="mt-3 rounded-full border border-black px-4 py-1 text-xs font-semibold text-black hover:bg-black/10"
                onClick={() => navigate(ROUTE_PATHS.orderTracking, { state: { trackingCode: order.trackingCode, order } })}
                type="button"
              >
                Track Order
              </button>
            </article>
          ))}
        </div>
      ) : (
        !ordersLoading && <p className="text-sm text-black/60">No orders yet.</p>
      )}
    </section>
  );
};

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
