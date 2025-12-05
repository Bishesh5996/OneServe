import { useCartStore } from "@stores/useCartStore.js";
import { formatCurrencyNpr, resolveProductPrice } from "@utils/currency.js";

const ClockIcon = () => (
  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 8v4l2.5 1.5M4 12a8 8 0 1116 0 8 8 0 01-16 0z" />
  </svg>
);

const FlameIcon = () => (
  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 3s5 4 5 9a5 5 0 11-10 0c0-2.5 2-4.5 2-4.5s0 2 2 3.5c1 0 2-1 2-2.5S12 3 12 3z" />
  </svg>
);

export const MealKitCard = ({ kit }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { priceNpr } = resolveProductPrice(kit);
  const defaultCustomizations = (kit.customizations ?? []).map((custom, index) => ({
    id: custom.id ?? `kit-custom-${index}`,
    name: custom.name,
    quantity: custom.defaultQuantity ?? 0,
    defaultQuantity: custom.defaultQuantity ?? 0,
    unitPrice: custom.unitPrice ?? 0
  }));
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <img alt={kit.name} className="h-48 w-full object-cover" src={kit.image} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-black shadow">{kit.badge}</span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black">{kit.diet}</p>
          <h3 className="text-xl font-bold text-black">{kit.name}</h3>
          <p className="text-sm text-black/70">{kit.description}</p>
        </header>
        <div className="flex flex-wrap gap-4 text-sm font-medium text-black">
          <span className="flex items-center gap-2">
            <ClockIcon />
            {kit.prepTime}
          </span>
          <span className="flex items-center gap-2">
            <FlameIcon />
            {kit.calories} cal
          </span>
          <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-black">⭐ {kit.rating.toFixed(1)}</span>
        </div>
        <footer className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-black">{formatCurrencyNpr(priceNpr)}</p>
            <p className="text-xs text-black/60">per serve</p>
          </div>
          <button
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-black shadow hover:bg-orange-400"
            onClick={() =>
              addItem(
                {
                  id: kit.id,
                  name: kit.name,
                  price: priceNpr,
                  basePrice: priceNpr,
                  image: kit.image,
                  stock: kit.stock ?? 0,
                  description: kit.description,
                  customizations: defaultCustomizations
                },
                1
              )
            }
            type="button"
          >
            Add to Cart
          </button>
        </footer>
      </div>
    </article>
  );
};
