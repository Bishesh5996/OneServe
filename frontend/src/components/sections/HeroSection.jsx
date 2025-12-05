import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { heroImage } from "@assets/mealKits.js";

const STATS = [
  { label: "Handpicked recipes", value: "40+" },
  { label: "5-star reviews", value: "12k" },
  { label: "Avg. delivery", value: "30 min" }
];

export const HeroSection = () => (
  <section className="grid gap-10 rounded-[32px] border border-orange-100 bg-gradient-to-r from-orange-200 via-orange-50 to-orange-200 px-8 py-12 md:grid-cols-2 md:items-center md:px-12">
    <div className="space-y-6">
      <span className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-black shadow-sm">
        <span className="h-2 w-2 rounded-full bg-black" />
        New Launch Special
      </span>
      <h1 className="text-5xl font-black leading-tight text-black">
        Fresh Meals, One Serve At a Time
      </h1>
      <p className="text-lg text-black">
        Perfectly portioned ingredient kits for delicious single-serve meals. No waste, no fuss, just fresh cooking made simple.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link className="rounded-full bg-orange-500 px-8 py-3 text-lg font-semibold text-black shadow hover:bg-orange-600/90" to={ROUTE_PATHS.mealKits}>
          Shop Now
        </Link>
        <Link className="rounded-full border border-black px-8 py-3 text-lg font-semibold text-black hover:bg-black/5" to={ROUTE_PATHS.checkout}>
          Learn More
        </Link>
      </div>
      <div className="grid gap-6 text-sm font-semibold text-black sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-black text-black">{stat.value}</p>
            <p className="text-xs uppercase tracking-widest text-black/60">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="relative">
      <div className="absolute inset-0 -left-6 rounded-[40px] bg-[url('https://www.toptal.com/designers/subtlepatterns/uploads/dot-grid.png')] opacity-20" />
      <div className="relative rounded-[36px] bg-white p-4 shadow-2xl">
        <img alt="Fresh meal" className="h-full w-full rounded-[28px] object-cover" src={heroImage} />
      </div>
    </div>
  </section>
);
