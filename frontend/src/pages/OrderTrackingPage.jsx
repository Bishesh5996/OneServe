import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { apiClient } from "@utils/apiClient.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const ORDER_STEPS = [
  { key: "pending", label: "Order Placed" },
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "out-for-delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" }
];

const formatCurrency = (value = 0) => formatCurrencyNpr(value);
const formatDate = (value) => (value ? new Date(value).toLocaleString() : "—");

const buildOrderSnapshot = (order) => {
  if (!order) return null;
  const items = Array.isArray(order.items) ? order.items : [];
  const subtotalFromItems = items.reduce((sum, item) => sum + Number(item.price ?? 0) * Number(item.quantity ?? 0), 0);
  const subtotal = subtotalFromItems || Number(order.total ?? 0);
  const shippingFee = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingFee + tax;

  return {
    id: order.id,
    code: order.trackingCode,
    status: order.status ?? "pending",
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
    items,
    totals: { subtotal, shipping: shippingFee, tax, total },
    shipping: order.shipping ?? {}
  };
};

export const OrderTrackingPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const stateCode = location.state?.trackingCode;
  const stateOrder = location.state?.order;
  const queryCode = searchParams.get("code") ?? "";

  const [codeInput, setCodeInput] = useState(stateCode ?? queryCode);
  const [orderData, setOrderData] = useState(buildOrderSnapshot(stateOrder));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeStepIndex = useMemo(() => {
    if (!orderData) return -1;
    const status = orderData.status ?? "pending";
    const index = ORDER_STEPS.findIndex((step) => step.key === status || (status === "shipped" && step.key === "out-for-delivery"));
    return index === -1 ? 0 : index;
  }, [orderData]);

  const timeline = useMemo(() => {
    if (!orderData) return [];
    const entries = [
      {
        label: "Order Placed",
        description: "We received your order.",
        timestamp: orderData.createdAt
      }
    ];
    if (orderData.updatedAt && orderData.updatedAt !== orderData.createdAt) {
      entries.push({
        label: `Status updated to ${orderData.status}`,
        description: "Latest status from our fulfillment team.",
        timestamp: orderData.updatedAt
      });
    }
    return entries;
  }, [orderData]);

  const fetchTrackingDetails = async (trackingCode) => {
    const trimmed = trackingCode?.trim();
    if (!trimmed) {
      setError("Please enter a tracking code.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await apiClient.get(`/orders/track/${trimmed}`);
      setOrderData(buildOrderSnapshot(response.data));
    } catch (requestError) {
      setOrderData(null);
      setError(requestError.response?.data?.message ?? "Unable to find that order. Please verify the code.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = codeInput.trim().toUpperCase();
    setSearchParams(normalized ? { code: normalized } : {});
    fetchTrackingDetails(normalized);
  };

  const handleMarkReceived = async () => {
    if (!orderData?.id) return;
    setLoading(true);
    setError("");
    try {
      const response = await apiClient.post(`/orders/${orderData.id}/received`);
      setOrderData(buildOrderSnapshot(response.data));
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? "Unable to update order status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const nextCode = stateCode ?? queryCode;
    if (!nextCode) return;
    setCodeInput(nextCode);

    const shouldFetch = !orderData || orderData.code !== nextCode;
    if (shouldFetch) {
      fetchTrackingDetails(nextCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateCode, queryCode]);

  const shippingInfo = orderData?.shipping ?? {};
  const canMarkReceived = Boolean(orderData?.id && orderData.status !== "delivered");

  return (
    <section className="space-y-8 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">Order Tracking</p>
        <h1 className="text-4xl font-black text-black">Track Your Order</h1>
        {orderData?.code && <p className="text-sm text-black/60">Order #{orderData.code}</p>}
      </header>

      <form className="flex flex-wrap gap-4 rounded-[24px] border border-orange-100 bg-white p-4 shadow-sm" onSubmit={handleSubmit}>
        <input
          className="flex-1 rounded-2xl border border-black/10 px-4 py-3 text-sm uppercase"
          placeholder="Enter tracking code"
          value={codeInput}
          onChange={(event) => setCodeInput(event.target.value.toUpperCase())}
        />
        <button className="rounded-2xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black disabled:opacity-50" disabled={loading} type="submit">
          {loading ? "Tracking…" : "Track Order"}
        </button>
      </form>

      {error && <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-600">{error}</p>}

      {orderData ? (
        <>
          <div className="rounded-[32px] border border-orange-100 bg-white p-8 shadow">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-black/60">Placed {formatDate(orderData.createdAt)}</p>
                <p className="text-sm text-black/60">Last update {formatDate(orderData.updatedAt)}</p>
              </div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 capitalize">{orderData.status}</span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              {ORDER_STEPS.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center text-center text-sm">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${index <= activeStepIndex ? "bg-orange-500 text-black" : "bg-black/5 text-black/40"} font-semibold`}>
                    {index + 1}
                  </div>
                  <p className={`mt-2 font-semibold ${index <= activeStepIndex ? "text-black" : "text-black/40"}`}>{step.label}</p>
                  <p className="text-xs text-black/60">{index < activeStepIndex ? "Completed" : index === activeStepIndex ? "Current" : "Pending"}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-orange-100 bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-black">Shipping Information</h2>
              <div className="mt-4 space-y-3 text-sm text-black">
                <p>
                  <span className="font-semibold">Recipient: </span>
                  {[shippingInfo.firstName, shippingInfo.lastName].filter(Boolean).join(" ") || "—"}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {shippingInfo.email ?? "—"}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {shippingInfo.phone ?? "—"}
                </p>
                <p>
                  <span className="font-semibold">Address: </span>
                  {[shippingInfo.street, shippingInfo.city, shippingInfo.state, shippingInfo.zip].filter(Boolean).join(", ") || "—"}
                </p>
              </div>
            </div>

            <div className="rounded-[32px] border border-orange-100 bg-white p-6 shadow">
              <h2 className="text-lg font-semibold text-black">Order Summary</h2>
              {orderData.items.length ? (
                <ul className="mt-4 space-y-3">
                  {orderData.items.map((item) => (
                    <li key={item.productId ?? item.id ?? item.name} className="flex items-center justify-between rounded-2xl border border-black/5 px-3 py-2">
                      <div>
                        <p className="text-sm font-semibold text-black">{item.name}</p>
                        <p className="text-xs text-black/60">Qty: {item.quantity ?? 0}</p>
                        {renderOrderCustomizations(item)}
                      </div>
                      <p className="text-sm font-semibold text-black">{formatCurrency((item.price ?? 0) * (item.quantity ?? 0))}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-black/60">This order has no items listed.</p>
              )}
              <div className="mt-4 space-y-1 text-sm text-black/70">
                <SummaryRow label="Subtotal" value={formatCurrency(orderData.totals.subtotal)} />
                <SummaryRow label="Shipping" value={formatCurrency(orderData.totals.shipping)} />
                <SummaryRow label="Tax" value={formatCurrency(orderData.totals.tax)} />
              </div>
              <div className="mt-3 border-t border-black/10 pt-3 text-lg font-bold text-black">
                <SummaryRow label="Total" value={formatCurrency(orderData.totals.total)} />
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-orange-100 bg-white p-6 shadow">
            <h2 className="text-lg font-semibold text-black">Tracking Updates</h2>
            {timeline.length ? (
              <div className="mt-4 space-y-3">
                {timeline.map((entry, index) => (
                  <div key={`${entry.label}-${index}`} className="flex flex-col rounded-2xl border border-black/5 p-4 text-sm text-black">
                    <p className="font-semibold">{entry.label}</p>
                    <p className="text-black/60">{entry.description}</p>
                    <p className="text-xs text-black/50">{formatDate(entry.timestamp)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-black/60">No additional updates yet.</p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-black disabled:opacity-50" disabled={!orderData.code || loading} onClick={() => fetchTrackingDetails(orderData.code)} type="button">
                Refresh Status
              </button>
              <button className="rounded-full border border-black px-6 py-2 text-sm font-semibold text-black hover:bg-black/10 disabled:opacity-40" disabled={!canMarkReceived || loading} onClick={handleMarkReceived} type="button">
                Mark as Received
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-[32px] border border-dashed border-black/10 bg-white p-8 text-center text-sm text-black/70">
          Enter a tracking code above to view live updates for your order.
        </div>
      )}
    </section>
  );
};

const SummaryRow = ({ label, value }) => (
  <p className="flex items-center justify-between">
    <span>{label}</span>
    <span className="font-semibold text-black">{value}</span>
  </p>
);

const renderOrderCustomizations = (item) => {
  if (!item.customizations?.length) return null;
  const rows = item.customizations
    .map((custom) => {
      const defaultQty = custom.defaultQuantity ?? 0;
      const diff = (custom.quantity ?? defaultQty) - defaultQty;
      if (!diff) return null;
      const priceChange = diff * (custom.unitPrice ?? 0);
      return (
        <p key={`${item.productId}-${custom.id ?? custom.name}`} className="text-xs text-black/50">
          {diff > 0 ? "+" : ""}
          {diff} {custom.name} ({priceChange > 0 ? "+" : priceChange < 0 ? "-" : ""}
          {formatCurrencyNpr(Math.abs(priceChange))})
        </p>
      );
    })
    .filter(Boolean);
  if (!rows.length) return null;
  return <div className="mt-1 space-y-1">{rows}</div>;
};
