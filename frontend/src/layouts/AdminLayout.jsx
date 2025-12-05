import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";

const NAV_ITEMS = [
  { label: "Overview", to: ROUTE_PATHS.adminDashboard },
  { label: "Orders", to: ROUTE_PATHS.adminOrders },
  { label: "Users", to: ROUTE_PATHS.adminUsers },
  { label: "Products", to: ROUTE_PATHS.adminProducts },
  { label: "Blogs", to: ROUTE_PATHS.adminBlogs }
];

export const AdminLayout = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate(ROUTE_PATHS.adminLogin, { replace: true });
    }
  }, [user, navigate]);

  if (!user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
        <p className="text-sm uppercase tracking-[0.4em] text-orange-200">Restricted</p>
        <h1 className="mt-2 text-3xl font-bold">Admin access required.</h1>
        <button className="mt-6 rounded-full border border-white px-6 py-2 text-sm font-semibold" onClick={() => navigate(ROUTE_PATHS.adminLogin)}>
          Go to Admin Login
        </button>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[220px_1fr]">
      <aside className="space-y-6 border-r border-slate-900 bg-slate-950 p-6">
        <p className="text-xl font-black uppercase tracking-widest">OneServe Admin</p>
        <nav className="space-y-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-xl px-3 py-2 text-sm font-semibold ${isActive ? "bg-orange-500 text-white" : "text-slate-400"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col bg-slate-900/40">
        <header className="border-b border-slate-800 px-6 py-4">
          <p className="text-sm uppercase tracking-[0.5em] text-orange-200">Admin Console</p>
          <h1 className="text-2xl font-bold">Operations Dashboard</h1>
        </header>
        <main className="flex-1 px-6 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
