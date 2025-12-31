import { useState } from "react";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: ""
};

export const ContactPage = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setStatus("");
    setTimeout(() => {
      setSubmitting(false);
      setForm(INITIAL_FORM);
      setStatus("Thanks! We received your message and will reply within one business day.");
    }, 800);
  };

  return (
    <section className="space-y-10 py-12">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-black/60">Let&apos;s Talk</p>
        <h1 className="mt-3 text-5xl font-serif text-black">Contact Us</h1>
        <p className="mx-auto mt-2 max-w-2xl text-base text-black/70">
          We consider every detail of your cooking experience so you can change dinner time into something joyful.
        </p>
      </header>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow">
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <FormControl label="Name">
              <input
                className="w-full rounded-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                name="name"
                onChange={handleChange}
                placeholder="Enter your name"
                required
                value={form.name}
              />
            </FormControl>
            <FormControl label="Email">
              <input
                className="w-full rounded-full border border-black/10 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                name="email"
                onChange={handleChange}
                placeholder="Enter email address"
                required
                type="email"
                value={form.email}
              />
            </FormControl>
          </div>
          <FormControl label="Subject">
            <input
              className="w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              name="subject"
              onChange={handleChange}
              placeholder="Write a subject"
              required
              value={form.subject}
            />
          </FormControl>
          <FormControl label="Message">
            <textarea
              className="h-32 w-full rounded-2xl border border-black/10 px-4 py-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              name="message"
              onChange={handleChange}
              placeholder="Write your message"
              required
              value={form.message}
            />
          </FormControl>
          <div className="flex justify-center">
            <button className="w-full rounded-full bg-orange-500 px-8 py-3 text-base font-semibold text-black transition hover:bg-orange-400 md:w-60" disabled={submitting} type="submit">
              {submitting ? "Sending…" : "Send"}
            </button>
          </div>
          {status && <p className="text-center text-sm font-semibold text-emerald-600">{status}</p>}
        </form>
      </div>

      <div className="grid gap-6 text-center text-sm font-semibold text-black md:grid-cols-3">
        <ContactDetail heading="Call Us" lines={["Mon-Fri: 11am – 8pm", "Sat-Sun: 9am – 10pm", "+977 9812345678"]} />
        <ContactDetail heading="Email" lines={["support@oneserve.com", "orders@oneserve.com"]} />
        <ContactDetail heading="Our Location" lines={["113 DurbarMarg", "Kathmandu, Nepal"]} />
      </div>
    </section>
  );
};

const FormControl = ({ label, children }) => (
  <label className="block text-sm font-semibold text-black">
    {label}
    <div className="mt-2">{children}</div>
  </label>
);

const ContactDetail = ({ heading, lines }) => (
  <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow">
    <p className="text-xs uppercase tracking-[0.4em] text-black/60">{heading}</p>
    <ul className="mt-3 space-y-1 text-black/80">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  </div>
);
