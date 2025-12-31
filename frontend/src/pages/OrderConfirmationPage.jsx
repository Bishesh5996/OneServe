import { useLocation, useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const formatCurrency = (value = 0) => formatCurrencyNpr(value);
const estimateDeliveryFromDate = (dateString) => {
  if (!dateString) return "Arrives in 3-5 business days";
  const base = new Date(dateString);
  if (Number.isNaN(base.getTime())) return "Arrives in 3-5 business days";
  const eta = new Date(base.getTime() + 3 * 24 * 60 * 60 * 1000);
  return eta.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
};

export const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state ?? {};
  const order = state.order;

  const items = Array.isArray(order?.items) ? order.items : [];
  const orderNumber = order?.trackingCode ?? state.orderNumber ?? `OS-${Date.now().toString().slice(-6)}`;
  const total = Number(order?.total ?? state.total ?? 0);
  const estimatedDelivery = state.estimatedDelivery ?? estimateDeliveryFromDate(order?.createdAt);
  const itemsCount = items.reduce((sum, item) => sum + Number(item.quantity ?? 0), 0) || Number(state.itemsCount ?? 0);
  const orderDate = order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : new Date().toLocaleDateString();
  const email = order?.shipping?.email ?? state.email ?? "your email";

  const handleTrackOrder = () => {
    navigate(ROUTE_PATHS.orderTracking, { state: { trackingCode: order?.trackingCode, order } });
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl rounded-[40px] border border-orange-100 bg-white p-10 text-center shadow">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</div>
        <p className="mt-6 text-4xl font-black text-black">Order Confirmed!</p>
        <p className="mt-2 text-sm text-black/60">
          Thank you for your order {order?.shipping?.firstName ? `${order.shipping.firstName}!` : "!"} We're preparing your meal kit now.
        </p>

        <div className="mt-8 grid gap-6 rounded-3xl border border-black/5 p-6 text-left text-sm text-black">
          <InfoRow label="Order Number" value={orderNumber} valueClass="text-orange-600 font-semibold" />
          <InfoRow label="Order Date" value={orderDate} />
          <InfoRow label="Estimated Delivery" value={estimatedDelivery} />
          <InfoRow label="Total Items" value={`${itemsCount} Meal Kits`} />
          <InfoRow label="Total Amount" value={formatCurrency(total)} valueClass="text-lg font-bold" />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black" onClick={handleTrackOrder}>
            Track Order
          </button>
          <button className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-black/10" onClick={() => navigate(ROUTE_PATHS.home)}>
            Continue Shopping
          </button>
        </div>
        <p className="mt-6 text-xs text-black/60">A confirmation email has been sent to {email}.</p>
      </div>
    </section>
  );
};

const InfoRow = ({ label, value, valueClass = "" }) => (
  <div className="flex items-center justify-between text-base">
    <span className="text-black/60">{label}</span>
    <span className={valueClass}>{value}</span>
  </div>
);
