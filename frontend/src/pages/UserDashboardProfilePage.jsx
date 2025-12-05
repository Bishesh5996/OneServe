import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useDashboardData } from "@/hooks/useDashboardData.js";
import { useAuthStore } from "@stores/useAuthStore.js";
import { apiClient } from "@utils/apiClient.js";

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const InfoRow = ({ label, value }) => (
  <div className="flex flex-col rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
    <p className="text-xs uppercase tracking-[0.3em] text-black/50">{label}</p>
    <p className="text-base font-semibold text-black">{value || "—"}</p>
  </div>
);

export const UserDashboardProfilePage = () => {
  const { user, stats, favoriteItems } = useDashboardData();
  const updateUser = useAuthStore((state) => state.updateUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    avatar: user?.avatar ?? ""
  }));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [avatarStatus, setAvatarStatus] = useState("");

  useEffect(() => {
    if (user) {
      setForm({ name: user.name ?? "", email: user.email ?? "", phone: user.phone ?? "", avatar: user.avatar ?? "" });
      setAvatarStatus("");
    }
  }, [user]);

  if (!user) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-semibold text-black">Sign in to view your profile</h1>
        <p className="mt-2 text-sm text-black/70">Once signed in, you can manage your orders and saved kits.</p>
      </section>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;
    setSaving(true);
    setError("");
    try {
      const response = await apiClient.patch("/users/me", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        avatar: form.avatar ?? null
      });
      updateUser(response.data);
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.message ?? "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarStatus("Processing photo…");
    try {
      const issues = [];
      if (!file.type.startsWith("image/")) issues.push("not detected as an image");
      if (file.size > 5 * 1024 * 1024) issues.push("over 5MB");
      const dataUrl = await readFileAsDataUrl(file);
      setForm((prev) => ({ ...prev, avatar: dataUrl }));
      setAvatarStatus(`Saved ${file.name}${issues.length ? ` (${issues.join(", ")})` : ""}`);
    } catch (uploadError) {
      setAvatarStatus("Could not read that file, but you can try another photo.");
    } finally {
      event.target.value = "";
    }
  };

  const handleAvatarClear = () => {
    setForm((prev) => ({ ...prev, avatar: "" }));
    setAvatarStatus("Photo removed");
  };

  return (
    <section className="space-y-6 py-12">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">Your Profile</p>
        <h1 className="text-3xl font-bold text-black">{user.name}</h1>
        <p className="text-sm text-black/60">{user.email}</p>
        {user.phone && <p className="text-sm text-black/60">Phone: {user.phone}</p>}
        <div className="mt-4 flex items-center gap-4">
          {form.avatar ? (
            <img alt="Profile avatar" className="h-20 w-20 rounded-full border border-black/10 object-cover" src={form.avatar} />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-black/10 bg-black/5 text-2xl font-bold text-black/50">
              {user.name?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <div className="space-y-2 text-xs text-black/70">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black px-3 py-1 font-semibold text-black hover:bg-black/10">
              <input accept="image/*" className="hidden" type="file" onChange={handleAvatarUpload} />
              Upload photo
            </label>
            <div className="flex items-center gap-3">
              {form.avatar && (
                <button className="text-xs font-semibold text-red-600 underline" onClick={handleAvatarClear} type="button">
                  Remove photo
                </button>
              )}
              {avatarStatus && <span className="rounded-full bg-black/5 px-3 py-1 text-[11px]">{avatarStatus}</span>}
            </div>
            <p className="text-[11px] text-black/50">We’ll use the photo you upload. Non-image or large files will still save but may look off.</p>
          </div>
        </div>
        <button className="mt-3 rounded-full border border-black px-4 py-2 text-xs font-semibold text-black hover:bg-black/10" onClick={() => setEditing((prev) => !prev)} type="button">
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        <InfoRow label="Role" value={user.role} />
        <InfoRow label="Orders" value={stats.totalOrders} />
        <InfoRow label="Favorites" value={favoriteItems.length} />
        <InfoRow label="Phone" value={user.phone ?? "Not added"} />
      </div>
      {editing && (
        <form className="space-y-4 rounded-3xl border border-black/5 bg-white p-5 shadow-sm" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold text-black">Update Profile</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-black">
              Full Name
              <input className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200" required value={form.name} onChange={(event) => handleChange("name", event.target.value)} />
            </label>
            <label className="text-sm font-semibold text-black">
              Email Address
              <input className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200" required type="email" value={form.email} onChange={(event) => handleChange("email", event.target.value)} />
            </label>
          </div>
          <label className="text-sm font-semibold text-black">
            Phone Number
            <input className="mt-1 w-full rounded-2xl border border-black/10 px-4 py-2 text-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200" placeholder="+1 555-123-4567" value={form.phone} onChange={(event) => handleChange("phone", event.target.value)} />
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-black disabled:opacity-60" disabled={saving} type="submit">
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </form>
      )}
      {user.businessName && (
        <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-black">Business Details</h2>
          <p className="text-sm text-black/70">{user.businessName}</p>
        </div>
      )}
      <div className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-black">Need to update your info?</h2>
        <p className="text-sm text-black/70">Reach out to support and we&apos;ll help you keep everything up to date.</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link className="rounded-full border border-black px-4 py-2 text-xs font-semibold text-black hover:bg-black/10" to={ROUTE_PATHS.mealKits}>
            Browse Meal Kits
          </Link>
          <Link className="rounded-full border border-black px-4 py-2 text-xs font-semibold text-black hover:bg-black/10" to={ROUTE_PATHS.orderTracking}>
            Track Order
          </Link>
        </div>
      </div>
    </section>
  );
};
