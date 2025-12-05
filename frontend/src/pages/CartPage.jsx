import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { ShopProductCard } from "@components/cards/ShopProductCard.jsx";
import { fallbackProducts } from "@utils/productMappers.js";
import { useCartStore } from "@stores/useCartStore.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const SHIPPING_FEE = 4.99;
const TAX_RATE = 0.09;

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length ? SHIPPING_FEE : 0;
  const tax = items.length ? subtotal * TAX_RATE : 0;
  const total = subtotal + shipping + tax;

  const recommendations = useMemo(() => {
    const selected = new Set(items.map((item) => item.id));
    return fallbackProducts.filter((product) => !selected.has(product.id)).slice(0, 4);
  }, [items]);

  const formatCurrency = (value) => formatCurrencyNpr(value);

  return (
    <div className="space-y-10 py-12">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/60">Cart</p>
        <h1 className="text-3xl font-black text-black">Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})</h1>
      </header>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.6fr]">
        <div className="space-y-6 rounded-[32px] border border-orange-100 bg-white p-8 shadow">
          {items.length === 0 ? (
            <p className="py-10 text-center text-sm text-black/60">Your cart is empty. Add your favorite kits to get started.</p>
          ) : (
            items.map((item) => {
              const fallback = fallbackProducts.find((product) => product.id === item.id);
              const description = item.description ?? fallback?.description ?? "Chef-crafted kit.";
              return (
                <article key={item.uid} className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-6 last:border-none last:pb-0">
                  <img alt={item.name} className="h-20 w-20 rounded-2xl object-cover" src={item.image} />
                  <div className="flex-1 min-w-[200px]">
                    <p className="text-lg font-semibold text-black">{item.name}</p>
                    <p className="text-sm text-black/60">{description}</p>
                    <p className="text-xs text-black/40">SKU: {(fallback?.id ?? item.id).toUpperCase()}</p>
                    {renderCustomizations(item)}
                  </div>
                  <div className="flex items-center gap-3">
                    <QuantityControl quantity={item.quantity} onChange={(newQty) => updateQuantity(item.uid, newQty)} />
                    <button aria-label="Remove item" className="text-black/40 transition hover:text-red-500" onClick={() => removeItem(item.uid)} type="button">
                      <TrashIcon />
                    </button>
                  </div>
                  <p className="ml-auto text-lg font-bold text-black">{formatCurrency(item.price * item.quantity)}</p>
                </article>
              );
            })
          )}
        </div>
        <aside className="rounded-[32px] border border-orange-100 bg-white p-8 shadow">
          <h2 className="text-2xl font-bold text-black">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm text-black/70">
            <SummaryRow label={`Subtotal (${items.length} items)`} value={formatCurrency(subtotal)} />
            <SummaryRow label="Shipping" value={items.length ? formatCurrency(shipping) : formatCurrency(0)} />
            <SummaryRow label="Tax" value={formatCurrency(tax)} />
          </div>
          <div className="mt-4 border-t border-slate-200 pt-4 text-lg font-semibold text-black">
            <SummaryRow label="Total" value={formatCurrency(total)} />
          </div>
          <div className="mt-6 flex gap-3">
            <input className="flex-1 rounded-full border border-black/20 px-4 py-2 text-sm" placeholder="Enter promo code" type="text" />
            <button className="rounded-full border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-black/10" type="button">
              Apply
            </button>
          </div>
          <button
            className="mt-6 w-full rounded-full bg-orange-500 px-4 py-3 text-base font-semibold text-black disabled:cursor-not-allowed disabled:bg-black/20"
            disabled={!items.length}
            onClick={() => navigate(ROUTE_PATHS.checkout)}
            type="button"
          >
            Proceed to Checkout
          </button>
          <button className="mt-3 w-full rounded-full border border-black px-4 py-3 text-sm font-semibold text-black hover:bg-black/10" onClick={() => navigate(ROUTE_PATHS.mealKits)} type="button">
            Continue Shopping
          </button>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-black/60">
            <ShieldIcon /> Secure checkout · Free shipping over {formatCurrency(50)} · 30-day returns
          </p>
        </aside>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-black">You might also like</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendations.map((product) => (
            <ShopProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

const renderCustomizations = (item) => {
  if (!item.customizations?.length) return null;
  const rows = item.customizations
    .map((custom) => {
      const defaultQty = custom.defaultQuantity ?? 0;
      const diff = (custom.quantity ?? defaultQty) - defaultQty;
      if (!diff) return null;
      const priceChange = diff * (custom.unitPrice ?? 0);
      const label = `${diff > 0 ? "+" : ""}${diff} ${custom.name}`;
      const priceLabel = priceChange === 0 ? "Included" : `${priceChange > 0 ? "+" : "-"}${formatCurrencyNpr(Math.abs(priceChange))}`;
      return (
        <li key={`${item.uid}-${custom.id ?? custom.name}`} className="flex justify-between">
          <span>{label}</span>
          <span>{priceLabel}</span>
        </li>
      );
    })
    .filter(Boolean);
  if (!rows.length) return null;
  return <ul className="mt-2 space-y-1 text-xs text-black/60">{rows}</ul>;
};

const QuantityControl = ({ quantity, onChange }) => (
  <div className="flex items-center rounded-full border border-black/20">
    <button aria-label="Decrease quantity" className="px-3 py-2 text-lg" onClick={() => onChange(Math.max(1, quantity - 1))} type="button">
      −
    </button>
    <span className="px-4 text-sm font-semibold">{quantity}</span>
    <button aria-label="Increase quantity" className="px-3 py-2 text-lg" onClick={() => onChange(quantity + 1)} type="button">
      +
    </button>
  </div>
);

const SummaryRow = ({ label, value }) => (
  <p className="flex items-center justify-between">
    <span>{label}</span>
    <span className="font-semibold text-black">{value}</span>
  </p>
);

const TrashIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M4 7h16M10 11v6M14 11v6M5 7l1 12a2 2 0 002 2h8a2 2 0 002-2l1-12M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6z" />
  </svg>
);
