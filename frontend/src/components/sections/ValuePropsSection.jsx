const VALUE_PROPS = [
  {
    title: "Fresh Ingredients",
    description: "Sourced daily from local farms.",
    icon: "M3 12h18M12 3v18"
  },
  {
    title: "Single Portions",
    description: "Perfect for cooking solo.",
    icon: "M4 10h16M4 14h16M10 6v12"
  },
  {
    title: "Quick & Easy",
    description: "Ready in 20 minutes or less.",
    icon: "M12 8v4l3 2M4 12a8 8 0 1116 0 8 8 0 01-16 0z"
  },
  {
    title: "Fast Delivery",
    description: "Same-day delivery available.",
    icon: "M3 13h15l3-4H6l-3 4zm3 0l-2 5m13-5v5M6 18h12"
  }
];

const Icon = ({ path }) => (
  <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d={path} />
  </svg>
);

export const ValuePropsSection = () => (
  <section className="-mt-8 grid gap-4 rounded-3xl bg-white px-6 py-10 shadow-lg md:grid-cols-4">
    {VALUE_PROPS.map((prop) => (
      <article key={prop.title} className="flex items-start gap-4">
        <div className="rounded-full bg-orange-100 p-3">
          <Icon path={prop.icon} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-black">{prop.title}</h3>
          <p className="text-sm text-black/70">{prop.description}</p>
        </div>
      </article>
    ))}
  </section>
);
