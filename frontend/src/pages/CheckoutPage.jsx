import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";
import { useCartStore } from "@stores/useCartStore.js";
import { apiClient } from "@utils/apiClient.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const NEPAL_PROVINCES = ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpashchim"];
const SHIPPING_FEE = 4.99;
const TAX_RATE = 0.09;
const formatCurrency = (value) => formatCurrencyNpr(value);

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { items, clear } = useCartStore();
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+977 9812345678",
    street: "",
    city: "",
    state: "",
    zip: ""
  });
  const [payment, setPayment] = useState({
    method: "card",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardholder: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = items.length ? SHIPPING_FEE : 0;
  const tax = items.length ? subtotal * TAX_RATE : 0;
  const total = subtotal + shippingFee + tax;

  useEffect(() => {
    if (user?.email) {
      setShipping((prev) => ({ ...prev, email: prev.email || user.email }));
    }
  }, [user?.email]);

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentChange = (field, value) => {
    setPayment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      setSubmitError("Please sign in to complete your order.");
      return;
    }
    if (!items.length) {
      setSubmitError("Add a meal kit to your cart before checking out.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");
    try {
      const payload = {
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          name: item.name,
          price: item.price,
          image: item.image,
          customizations: item.customizations
        })),
        shippingAddress: shipping
      };
      const response = await apiClient.post("/orders", payload);
      clear();
      navigate(ROUTE_PATHS.orderConfirmed, { state: { order: response.data } });
    } catch (error) {
      setSubmitError(error.response?.data?.message ?? "Unable to place your order right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 py-12">
      <nav className="flex items-center gap-2 text-sm text-black/60">
        <Link className="hover:underline" to={ROUTE_PATHS.cart}>
          Cart
        </Link>
        <span>/</span>
        <span className="font-semibold text-black">Checkout</span>
        <span>/</span>
        <span>Complete</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form className="space-y-8 rounded-[32px] border border-orange-100 bg-white p-8 shadow" onSubmit={handleSubmit}>
          {!user && (
            <div className="rounded-2xl border border-black/10 bg-black/5 p-4 text-sm text-black">
              <p className="font-semibold">Sign in required</p>
              <p className="text-black/60">Please log in to complete checkout and view saved details.</p>
              <div className="mt-3 flex gap-3">
                <Link className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-black" to={ROUTE_PATHS.login}>
                  Login
                </Link>
                <Link className="rounded-full border border-black px-4 py-2 text-xs font-semibold text-black" to={ROUTE_PATHS.signup}>
                  Sign Up
                </Link>
              </div>
            </div>
          )}
          <section className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-black">Checkout</h1>
              <p className="text-sm text-black/60">Shipping details</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="First Name" value={shipping.firstName} onChange={(value) => handleShippingChange("firstName", value)} required />
              <TextField label="Last Name" value={shipping.lastName} onChange={(value) => handleShippingChange("lastName", value)} required />
              <TextField className="md:col-span-2" label="Email Address" type="email" value={shipping.email} onChange={(value) => handleShippingChange("email", value)} required />
              <TextField className="md:col-span-2" label="Phone Number" value={shipping.phone} onChange={(value) => handleShippingChange("phone", value)} required />
              <TextField className="md:col-span-2" label="Street Address" value={shipping.street} onChange={(value) => handleShippingChange("street", value)} required />
              <TextField label="City" value={shipping.city} onChange={(value) => handleShippingChange("city", value)} required />
              <label className="text-sm font-semibold text-black">
                State
                <select
                  className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
                  required
                  value={shipping.state}
                  onChange={(event) => handleShippingChange("state", event.target.value)}
                >
                  <option value="">Select Province</option>
                  {NEPAL_PROVINCES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </label>
              <TextField label="ZIP Code" value={shipping.zip} onChange={(value) => handleShippingChange("zip", value)} required />
            </div>
          </section>

          <section className="space-y-4 rounded-3xl border border-black/5 p-6">
            <h2 className="text-lg font-semibold text-black">Payment Information</h2>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-black">
              {["card", "cod"].map((method) => (
                <label key={method} className="flex cursor-pointer items-center gap-2">
                  <input checked={payment.method === method} name="paymentMethod" type="radio" value={method} onChange={(event) => handlePaymentChange("method", event.target.value)} />
                  {method === "card" ? "Credit Card" : "Cash on Delivery"}
                </label>
              ))}
            </div>
            {payment.method === "card" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextField className="md:col-span-2" label="Card Number" placeholder="1234 5678 9012 3456" value={payment.cardNumber} onChange={(value) => handlePaymentChange("cardNumber", value)} required />
                <TextField label="Expiry Date" placeholder="MM/YY" value={payment.expiry} onChange={(value) => handlePaymentChange("expiry", value)} required />
                <TextField label="CVV" value={payment.cvv} onChange={(value) => handlePaymentChange("cvv", value)} required />
                <TextField className="md:col-span-2" label="Cardholder Name" value={payment.cardholder} onChange={(value) => handlePaymentChange("cardholder", value)} required />
              </div>
            ) : (
              <p className="text-sm text-black/60">Have cash ready upon delivery. Our courier will provide a secure receipt.</p>
            )}
          </section>
          {submitError && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</p>}
          <button
            className="w-full rounded-full bg-orange-500 px-4 py-3 text-lg font-semibold text-black disabled:cursor-not-allowed disabled:bg-black/20"
            disabled={!items.length || !user || submitting}
            type="submit"
          >
            {submitting ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <aside className="space-y-6 rounded-[32px] border border-orange-100 bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-black">Order Summary</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <article key={item.uid} className="flex items-center gap-4">
                <img alt={item.name} className="h-16 w-16 rounded-2xl object-cover" src={item.image} />
                <div className="flex-1">
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="text-sm text-black/60">Qty: {item.quantity}</p>
                  {renderSummaryCustomizations(item)}
                </div>
                <p className="text-lg font-semibold text-black">{formatCurrency(item.price * item.quantity)}</p>
              </article>
            ))}
            {!items.length && <p className="text-sm text-black/60">No kits in cart.</p>}
          </div>
          <div className="space-y-2 text-sm text-black/70">
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="Shipping" value={shippingFee} />
            <SummaryRow label="Tax" value={tax} />
          </div>
          <div className="border-t border-slate-200 pt-4 text-lg font-semibold text-black">
            <SummaryRow label="Total" value={total} />
          </div>
          <p className="flex items-center gap-2 text-xs text-black/60">
            <LockIcon /> Secure checkout powered by SSL
          </p>
        </aside>
      </div>
    </div>
  );
};

const TextField = ({ label, value, onChange, className = "", type = "text", placeholder = "", required = false }) => (
  <label className={`text-sm font-semibold text-black ${className}`}>
    {label}
    <input
      className="mt-2 w-full rounded-2xl border border-black/10 px-4 py-3"
      placeholder={placeholder}
      required={required}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  </label>
);

const SummaryRow = ({ label, value }) => (
  <p className="flex items-center justify-between">
    <span>{label}</span>
    <span className="font-semibold text-black">{formatCurrency(value)}</span>
  </p>
);

const renderSummaryCustomizations = (item) => {
  if (!item.customizations?.length) return null;
  const rows = item.customizations
    .map((custom) => {
      const defaultQty = custom.defaultQuantity ?? 0;
      const diff = (custom.quantity ?? defaultQty) - defaultQty;
      if (!diff) return null;
      const priceChange = diff * (custom.unitPrice ?? 0);
      return (
        <p key={`${item.uid}-${custom.id ?? custom.name}`} className="text-xs text-black/60">
          {diff > 0 ? "+" : ""}
          {diff} {custom.name} ({priceChange > 0 ? "+" : priceChange < 0 ? "-" : ""}
          {formatCurrency(Math.abs(priceChange))})
        </p>
      );
    })
    .filter(Boolean);
  if (!rows.length) return null;
  return <div className="mt-1 space-y-1">{rows}</div>;
};

const LockIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M7 10V7a5 5 0 1110 0v3h1a1 1 0 011 1v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9a1 1 0 011-1h1zm3 5a2 2 0 104 0 2 2 0 00-4 0z" />
  </svg>
);
