import { testimonials } from "@assets/mealKits.js";

const CONTACT_INFO = [
  { label: "Call us", value: "+977 9812345678" },
  { label: "Email", value: "oneserve.com" },
  { label: "Office", value: "Durbarmarg,Nepal" }
];

const FEATURES = [
  { title: "Meal Kits", description: "Ingredients prepped and portioned so you only cook what you need." },
  { title: "Easy To Order", description: "Plan a week of single-serve meals in a couple of taps." },
  { title: "Fast Delivery", description: "Same-day delivery windows keep your fridge stocked." }
];

const STATS = [
  { label: "Cities Served", value: "3" },
  { label: "Founded", value: "2025" },
  { label: "Weekly Menu Items", value: "65+" },
  { label: "Customer Happiness", value: "100%" }
];

export const HowItWorksPage = () => (
  <div className="space-y-16 py-12">
    <section className="grid gap-8 rounded-[32px] border border-orange-100 bg-white p-10 shadow md:grid-cols-2">
      <div className="space-y-6">
        <img alt="Cooking team" className="h-72 w-full rounded-[28px] object-cover" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80" />
        <div className="rounded-[24px] bg-orange-500 p-6 text-white">
          <p className="text-lg font-semibold">Come and visit us</p>
          <div className="mt-4 space-y-3 text-sm">
            {CONTACT_INFO.map((info) => (
              <p key={info.label}>
                <span className="font-semibold">{info.label}:</span> {info.value}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-5">
        <p className="text-sm uppercase tracking-[0.4em] text-black/60">How OneServe Works</p>
        <h1 className="text-4xl font-black text-black">We provide chef-crafted meals for your table.</h1>
        <p className="text-lg text-black/70">
          OneServe delivers single-serve meal kits with fridge-fresh ingredients, step-by-step instructions, and flexible plans that keep solo cooks inspired
          every day.
        </p>
      </div>
    </section>

    <section className="rounded-[32px] bg-black/90 p-10 text-center text-white shadow">
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-3xl font-semibold">Feel the authentic, original taste from our kitchens.</p>
        <p className="text-sm text-white/70">Watch how we pack each kit with love and perfectly portioned ingredients.</p>
      </div>
    </section>

    <section className="grid gap-6 md:grid-cols-3">
      {FEATURES.map((feature) => (
        <article key={feature.title} className="rounded-[24px] border border-orange-100 bg-white p-6 shadow-sm">
          <p className="text-xl font-semibold text-black">{feature.title}</p>
          <p className="mt-2 text-sm text-black/60">{feature.description}</p>
        </article>
      ))}
    </section>

    <section className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-[32px] border border-orange-100 bg-white p-8 shadow">
        <p className="text-sm uppercase tracking-[0.3em] text-black/60">A little information</p>
        <h2 className="mt-2 text-3xl font-bold text-black">Our team does the prep so you can skip the stress.</h2>
        <p className="mt-4 text-sm text-black/70">
          Every kit is built inside our temperature-controlled kitchens, overseen by chefs and nutritionists who know how to balance flavor, freshness, and
          convenience.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-black/10 p-4 text-center">
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-xs uppercase tracking-[0.3em] text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <img alt="Preparing ingredients" className="h-full rounded-[32px] object-cover" src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=900&q=80" />
    </section>

    <section className="space-y-6">
      <h2 className="text-center text-3xl font-bold text-black">What Our Customers Say</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.author} className="rounded-[24px] border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-lg font-semibold text-black">“{testimonial.quote}”</p>
            <p className="mt-4 text-sm text-black/60">{testimonial.author}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-black/40">{testimonial.location}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);
