import { ROUTE_PATHS } from "@app/routes/paths.js";
import { mealKits } from "@assets/mealKits.js";
import { MealKitCard } from "@components/cards/MealKitCard.jsx";

export const FeaturedKitsSection = () => (
  <section className="space-y-8 py-12">
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black">Featured Meal Kits</p>
        <h2 className="text-3xl font-bold text-black">Handpicked favorites for you</h2>
      </div>
      <a className="text-sm font-semibold text-black hover:text-black/70" href={ROUTE_PATHS.mealKits}>
        View All →
      </a>
    </header>
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {mealKits.map((kit) => (
        <MealKitCard key={kit.id} kit={kit} />
      ))}
    </div>
  </section>
);
