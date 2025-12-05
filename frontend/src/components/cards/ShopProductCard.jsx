import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { FavoriteButton } from "@components/common/FavoriteButton.jsx";
import { useCartStore } from "@stores/useCartStore.js";
import { formatCurrencyNpr, resolveProductPrice } from "@utils/currency.js";

const Icon = ({ path }) => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d={path} />
  </svg>
);

const RatingBadge = ({ rating }) => (
  <span className="flex items-center gap-1 text-xs font-semibold text-black">
    <Icon path="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
    {rating.toFixed(1)}
  </span>
);

const withDefault = (value, fallback) => (typeof value === "number" && Number.isFinite(value) ? value : fallback);

export const ShopProductCard = ({ product, variant = "default", showFavoriteControl = true }) => {
  if (!product?.slug) {
    return null;
  }
  const addItem = useCartStore((state) => state.addItem);
  const linkSlug = product.slug;
  const { priceNpr, comparePriceNpr } = resolveProductPrice(product);
  const rating = withDefault(Number(product.rating), 4.8);
  const calories = withDefault(Number(product.nutrition?.calories ?? product.calories), 420);
  const prepTime = product.prepTime ?? "20 min";
  const description = product.description ?? "Saved from your favorite kits.";
  const category = product.category ?? "Featured";
  const defaultCustomizations = (product.customizations ?? []).map((custom) => ({
    id: custom.id,
    name: custom.name,
    quantity: custom.defaultQuantity ?? 0,
    defaultQuantity: custom.defaultQuantity ?? 0,
    unitPrice: custom.unitPrice ?? 0
  }));
  const handleAdd = () =>
    addItem(
      {
        id: product.id,
        name: product.name,
        price: priceNpr,
        basePrice: priceNpr,
        image: product.image,
        stock: product.stock ?? 0,
        description,
        customizations: defaultCustomizations
      },
      1
    );
  const link = `${ROUTE_PATHS.product}/${linkSlug}`;
  const badges = Array.isArray(product.tags) ? product.tags : [];

  if (variant === "compact") {
    return (
      <article className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
        <div className="relative overflow-hidden rounded-2xl">
          <Link className="block" to={link}>
            <img alt={product.name} className="h-32 w-full object-cover" src={product.image} />
          </Link>
          {showFavoriteControl ? <FavoriteButton className="absolute right-2 top-2" product={product} /> : null}
        </div>
        <div className="mt-4 flex flex-1 flex-col">
          <p className="text-xs font-semibold uppercase text-black/60">{category}</p>
          <Link className="mt-1 text-base font-semibold text-black hover:underline" to={link}>
            {product.name}
          </Link>
          <p className="mt-2 text-sm text-black/70">{description}</p>
          <div className="mt-auto flex items-center justify-between pt-3">
            <p className="text-lg font-bold text-black">{formatCurrencyNpr(priceNpr)}</p>
            <button className="rounded-full border border-black px-4 py-1 text-xs font-semibold text-black hover:bg-black/10" onClick={handleAdd} type="button">
              Add
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="flex h-full flex-col rounded-[32px] border border-orange-100 bg-white shadow transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link className="block" to={link}>
          <img alt={product.name} className="h-56 w-full rounded-[28px] object-cover" src={product.image} />
        </Link>
        {product.status && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase text-black">{product.status}</span>
        )}
        {showFavoriteControl ? <FavoriteButton className="absolute right-4 top-4" product={product} /> : null}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-center justify-between text-xs font-semibold uppercase text-black/60">
          <span>{category}</span>
          <RatingBadge rating={rating} />
        </div>
        <Link className="text-xl font-semibold text-black hover:underline" to={link}>
          {product.name}
        </Link>
        <p className="text-sm text-black/70">{description}</p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold text-black">
          <span className="flex items-center gap-1">
            <Icon path="M12 8v4l2.5 1.5M4 12a8 8 0 1116 0 8 8 0 01-16 0z" /> {prepTime}
          </span>
          <span className="flex items-center gap-1">
            <Icon path="M12 3s5 4 5 9a5 5 0 11-10 0c0-2.5 2-4.5 2-4.5s0 2 2 3.5c1 0 2-1 2-2.5S12 3 12 3z" /> {calories} cal
          </span>
          {badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full border border-black/10 px-3 py-1">
              {badge}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-2xl font-black text-black">{formatCurrencyNpr(priceNpr)}</p>
            {comparePriceNpr ? <p className="text-xs text-black/40 line-through">{formatCurrencyNpr(comparePriceNpr)}</p> : null}
          </div>
          <button className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black hover:bg-orange-400" onClick={handleAdd} type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
};
