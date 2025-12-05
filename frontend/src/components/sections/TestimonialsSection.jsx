import { testimonials } from "@assets/mealKits.js";

const Stars = ({ count = 5 }) => (
  <div className="flex gap-1 text-black">
    {Array.from({ length: count }).map((_, index) => (
      <svg
        key={`star-${index}`}
        className="h-4 w-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.802 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.034a1 1 0 00-1.175 0l-2.802 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.95-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const TestimonialsSection = () => (
  <section className="space-y-8 py-12">
    <header className="space-y-2 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black">What Our Customers Say</p>
      <h2 className="text-3xl font-bold text-black">Join thousands of happy solo cooks</h2>
    </header>
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <article key={testimonial.author} className="flex h-full flex-col rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <Stars count={testimonial.rating} />
          <p className="mt-4 flex-1 text-base text-black">“{testimonial.quote}”</p>
          <div className="mt-6">
            <p className="text-sm font-semibold text-black">{testimonial.author}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-black/60">{testimonial.location}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);
