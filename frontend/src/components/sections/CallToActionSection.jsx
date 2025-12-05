import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";

export const CallToActionSection = () => (
  <section className="rounded-3xl bg-orange-500 px-8 py-12 text-center text-black shadow-lg">
    <p className="text-xs font-semibold uppercase tracking-[0.4em]">Ready to Start Cooking?</p>
    <h2 className="mt-3 text-3xl font-bold">Get 20% off your first order with code: FIRST20</h2>
    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
      <Link className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow hover:bg-black/5" to={ROUTE_PATHS.mealKits}>
        Shop Meal Kits
      </Link>
      <Link className="rounded-full border border-black px-8 py-3 text-sm font-semibold text-black hover:bg-black/10" to={ROUTE_PATHS.mealKits}>
        View Menu
      </Link>
    </div>
  </section>
);
