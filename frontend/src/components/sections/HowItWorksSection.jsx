const STEPS = [
  {
    title: "Choose Your Meal",
    description: "Browse our menu and select from dozens of chef-designed recipes."
  },
  {
    title: "We Deliver Fresh",
    description: "Perfectly portioned ingredients arrive chilled at your doorstep."
  },
  {
    title: "Cook & Enjoy",
    description: "Follow easy instructions and enjoy your restaurant-quality meal."
  }
];

export const HowItWorksSection = () => (
  <section className="space-y-8 py-12" id="how-it-works">
    <header className="space-y-2 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black">How OneServe Works</p>
      <h2 className="text-3xl font-bold text-black">Three simple steps to delicious meals</h2>
    </header>
    <div className="grid gap-6 md:grid-cols-3">
      {STEPS.map((step, index) => (
        <article key={step.title} className="space-y-4 rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/10 text-3xl font-bold text-black">{index + 1}</div>
          <h3 className="text-xl font-semibold text-black">{step.title}</h3>
          <p className="text-sm text-black/70">{step.description}</p>
        </article>
      ))}
    </div>
  </section>
);
