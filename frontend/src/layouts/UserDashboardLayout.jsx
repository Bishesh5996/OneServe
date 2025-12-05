import { NavLink, Outlet } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { useAuthStore } from "@stores/useAuthStore.js";

const NAV_ITEMS = [
  { label: "Overview", to: ROUTE_PATHS.userDashboard },
  { label: "Favorites", to: ROUTE_PATHS.userDashboardFavorites },
  { label: "Orders", to: ROUTE_PATHS.userDashboardOrders },
  { label: "Profile", to: ROUTE_PATHS.userDashboardProfile }
];

export const UserDashboardLayout = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <section className="py-12 text-center">
        <h1 className="text-3xl font-semibold text-black">Please sign in</h1>
        <p className="mt-2 text-sm text-black/70">You need an account to access dashboard features.</p>
      </section>
    );
  }

  return (
    <div className="grid gap-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-4 rounded-3xl border border-black/5 bg-white p-4 shadow-sm">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">My Account</p>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `block rounded-2xl px-4 py-2 text-sm font-semibold ${isActive ? "bg-orange-500 text-black" : "text-black/70 hover:bg-black/5"}`
              }
              to={item.to}
              end={item.to === ROUTE_PATHS.userDashboard}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="rounded-3xl border border-black/5 bg-[#fefcf8] px-6 py-8 shadow-sm">
        <Outlet />
      </div>
    </div>
  );
};
