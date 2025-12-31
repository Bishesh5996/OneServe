import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";
import { apiClient } from "@utils/apiClient.js";

const FEATURES = [
  { title: "Pre-portioned Ingredients", description: "No waste, just perfect portions.", color: "bg-[#FFD27D]" },
  { title: "Fresh & Organic", description: "Quality ingredients delivered fresh.", color: "bg-[#7ED48C]" },
  { title: "Quick & Easy", description: "Ready in 30 minutes or less.", color: "bg-[#FFB347]" }
];

export const AuthPage = () => {
  const location = useLocation();
  const isSignup = location.pathname.endsWith("/signup");
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "buyer" });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const endpoint = isSignup ? "/auth/register" : "/auth/login";
      const payload = isSignup
        ? { name: form.name, email: form.email, password: form.password, role: form.role, businessName: form.businessName }
        : { email: form.email, password: form.password };
      const response = await apiClient.post(endpoint, payload);
      setSession({ token: response.data.token, user: response.data.user });
      navigate(isSignup ? ROUTE_PATHS.home : ROUTE_PATHS.userDashboard);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#e9f1f9] text-black">
      <main className="flex-1 bg-[#e9f1f9]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row">
          <section className="rounded-[32px] bg-white shadow-[0_20px_70px_rgba(15,23,42,0.12)] lg:flex-1">
            <div className="h-48 w-full overflow-hidden rounded-t-[32px]">
              <img alt="Welcome to OneServe" className="h-full w-full object-cover" src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80" />
            </div>
            <div className="space-y-5 px-8 py-8">
              <div>
                <h2 className="text-2xl font-semibold">Welcome to OneServe</h2>
                <p className="mt-2 text-sm text-black/70">Your journey to effortless single-serve cooking starts here. Fresh ingredients, perfectly portioned.</p>
              </div>
              <div className="space-y-4">
                {FEATURES.map((feature) => (
                  <FeatureRow key={feature.title} feature={feature} />
                ))}
              </div>
            </div>
          </section>

          <section className="rounded-[32px] bg-white px-8 py-8 shadow-[0_20px_70px_rgba(15,23,42,0.12)] lg:w-[420px]">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">{isSignup ? "Create Account" : "Welcome Back"}</h1>
              <p className="text-sm text-black/70">{isSignup ? "Join OneServe to personalize your meal kits." : "Sign in to your OneServe account"}</p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
              {isSignup && (
                <FormField label="Full Name">
                  <InputWrapper icon="user">
                    <input
                      className="flex-1 bg-transparent text-sm outline-none"
                      placeholder="Sarah Mitchell"
                      required
                      value={form.name}
                      onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                    />
                  </InputWrapper>
                </FormField>
              )}

              <FormField label="Email Address">
                <InputWrapper icon="mail">
                  <input
                    className="flex-1 bg-transparent text-sm outline-none"
                    placeholder="your@email.com"
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  />
                </InputWrapper>
              </FormField>

              <FormField label="Password">
                <InputWrapper icon="lock">
                  <input
                    className="flex-1 bg-transparent text-sm outline-none"
                    placeholder="Enter your password"
                    required
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                  />
                  <button className="text-xs font-semibold text-black/70" onClick={() => setShowPassword((prev) => !prev)} type="button">
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </InputWrapper>
              </FormField>

              {!isSignup && (
                <div className="flex items-center justify-between text-xs text-black/70">
                  <label className="inline-flex items-center gap-2">
                    <input checked={remember} className="h-4 w-4 rounded border-gray-300 text-[#ff7a1a] focus:ring-[#ff7a1a]" onChange={() => setRemember((prev) => !prev)} type="checkbox" />
                    Remember me
                  </label>
                  <button className="font-semibold text-[#ff7a1a] hover:underline" type="button">
                    Forgot Password?
                  </button>
                </div>
              )}

              {error && <p className="text-sm font-semibold text-red-500">{error}</p>}

              <button className="w-full rounded-full bg-[#ff7a1a] py-3 text-sm font-semibold text-white shadow hover:bg-[#f36e0c]" disabled={submitting} type="submit">
                {submitting ? (isSignup ? "Creating..." : "Signing In...") : isSignup ? "Create Account" : "Sign In"}
              </button>

              <Divider />

              <div className="flex gap-3 text-sm">
                <SocialButton label="Google" />
                <SocialButton label="Facebook" />
              </div>

              <div className="space-y-1 pt-2 text-center text-sm text-black/70">
                <p>
                  {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
                  <Link className="font-semibold text-[#ff7a1a] hover:underline" to={isSignup ? ROUTE_PATHS.login : ROUTE_PATHS.signup}>
                    {isSignup ? "Sign In" : "Sign Up"}
                  </Link>
                </p>
                <p>
                  Login as Admin?{" "}
                  <Link className="font-semibold text-[#ff7a1a] hover:underline" to={ROUTE_PATHS.adminLogin}>
                    Admin Login
                  </Link>
                </p>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

const FormField = ({ label, children }) => (
  <label className="block text-sm font-semibold text-black">
    {label}
    <div className="mt-2">{children}</div>
  </label>
);

const InputWrapper = ({ icon, children }) => (
  <div className="flex items-center rounded-full border border-black/10 bg-white px-4 py-2.5 focus-within:border-[#ff7a1a] focus-within:ring-2 focus-within:ring-[#ff7a1a]/30">
    <span className="mr-3 text-black/40">
      <InputIcon name={icon} />
    </span>
    {children}
  </div>
);

const FeatureRow = ({ feature }) => (
  <div className="flex items-start gap-3 rounded-2xl border border-black/5 bg-[#fdfdfd] p-4">
    <span className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full text-white ${feature.color}`}>✓</span>
    <div>
      <p className="text-sm font-semibold">{feature.title}</p>
      <p className="text-xs text-black/60">{feature.description}</p>
    </div>
  </div>
);

const Divider = () => (
  <div className="flex items-center gap-3 text-xs text-black/50">
    <span className="h-px flex-1 bg-black/10" />
    <span>Or continue with</span>
    <span className="h-px flex-1 bg-black/10" />
  </div>
);

const SocialButton = ({ label }) => (
  <button className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/10 bg-white py-2 text-sm font-semibold text-black transition hover:bg-black/5" type="button">
    <InputIcon name={label === "Google" ? "google" : "facebook"} />
    {label}
  </button>
);

const InputIcon = ({ name }) => {
  if (name === "user") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M12 13a5 5 0 100-10 5 5 0 000 10zm7 9a7 7 0 00-14 0" />
      </svg>
    );
  }
  if (name === "building") {
    return (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M4 22h16V8L12 2 4 8v14zM9 22v-4h6v4" />
      </svg>
    );
  }
  if (name === "google") {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24">
        <path
          d="M21 12.23c0-.74-.06-1.44-.18-2.11H12v4h5.03c-.23 1.19-.89 2.23-1.85 2.9v2.44h2.98C19.9 17.86 21 15.31 21 12.23zm-9 9.77c2.43 0 4.47-.81 5.96-2.19l-2.98-2.45c-.84.54-1.92.88-2.98.88-2.26 0-4.18-1.52-4.86-3.56H4v2.55A10 10 0 0012 22zm-4.86-5.31A6 6 0 016 12c0-.92.2-1.79.56-2.58V7H4a10 10 0 000 10c0 1.59.36 3.08 1.02 4.39l2.12-1.7z"
          fill="currentColor"
        />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15 8h3V4h-3c-3.31 0-5 1.69-5 5v3H7v4h3v6h4v-6h3l1-4h-4v-2c0-.55.45-1 1-1z" />
      </svg>
    );
  }
  const paths = {
    mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm0 2l8 7 8-7",
    lock: "M6 11h12v9H6zm3 0V8a3 3 0 016 0v3"
  };
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
      <path d={paths[name]} />
    </svg>
  );
};
