import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";
import { apiClient } from "@utils/apiClient.js";

const DEFAULT_EMAIL = "Bishesh5996@gmail.com";
const DEFAULT_PASSWORD = "1234567890";

export const AdminLoginPage = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      if (response.data.user?.role !== "admin") {
        setError("This account is not authorized for admin access.");
        setSubmitting(false);
        return;
      }
      setSession({ token: response.data.token, user: response.data.user });
      navigate(ROUTE_PATHS.admin, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f2f4f7]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1600&q=80')" }}>
      <div className="w-full max-w-lg rounded-[32px] border border-white/50 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <div className="text-center">
          <p className="text-2xl font-bold text-black">OneServe Admin</p>
          <p className="text-sm text-black/60">Sign in to your dashboard</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-semibold text-black">
            Email
            <div className="mt-2 rounded-2xl border border-black/10 px-4 py-3">
              <input className="w-full bg-transparent text-sm outline-none" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </div>
          </label>
          <label className="block text-sm font-semibold text-black">
            Password
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-black/10 px-4 py-3">
              <input className="flex-1 bg-transparent text-sm outline-none" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required />
              <button className="text-xs font-semibold text-black/70" onClick={() => setShowPassword((prev) => !prev)} type="button">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          {error && <p className="rounded-2xl bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-full bg-[#ff7a1a] py-3 text-sm font-semibold text-white shadow hover:bg-[#f36e0c]" disabled={submitting} type="submit">
            {submitting ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};
