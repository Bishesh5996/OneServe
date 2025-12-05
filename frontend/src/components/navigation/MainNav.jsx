import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { OneServeLogo } from "@components/branding/OneServeLogo.jsx";
import { ProfileMenu } from "@components/navigation/ProfileMenu.jsx";
import { ProductSearchPanel } from "@components/navigation/ProductSearchPanel.jsx";
import { useAuthStore } from "@stores/useAuthStore.js";
import { useCartStore } from "@stores/useCartStore.js";

const NAV_ITEMS = [
  { label: "Home", to: ROUTE_PATHS.root, type: "route" },
  { label: "Shop", to: ROUTE_PATHS.mealKits, type: "route" },
  { label: "How It Works", to: ROUTE_PATHS.howItWorksPage, type: "route" },
  { label: "Blog", to: ROUTE_PATHS.blog, type: "route" },
  { label: "Contact", to: ROUTE_PATHS.contact, type: "route" }
];

const IconButton = ({ children, label, ...props }) => (
  <button aria-label={label} className="rounded-full bg-black/10 p-2 text-black transition hover:bg-black/20" type="button" {...props}>
    {children}
  </button>
);

const Icon = ({ path }) => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" viewBox="0 0 24 24">
    <path d={path} />
  </svg>
);

export const MainNav = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const authUser = useAuthStore((state) => state.user);
  const isAdmin = authUser?.role === "admin";

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-orange-500 text-black backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link className="flex items-center" to={ROUTE_PATHS.root}>
          <OneServeLogo />
        </Link>
        <nav className="hidden gap-6 text-sm font-semibold md:flex">
          {NAV_ITEMS.map((item) =>
            item.type === "route" ? (
              <NavLink key={item.label} to={item.to} className={({ isActive }) => (isActive ? "text-black" : "text-black/70 hover:text-black")}>
                {item.label}
              </NavLink>
            ) : (
              <a key={item.label} className="text-black/70 hover:text-black" href={item.to}>
                {item.label}
              </a>
            )
          )}
        </nav>
        <div className="relative flex items-center gap-2 text-black">
          <div className="relative">
            <IconButton label="Search" onClick={() => setSearchOpen((prev) => !prev)}>
              <Icon path="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </IconButton>
            <ProductSearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
          </div>
          <IconButton label="Account" onClick={() => setProfileOpen((prev) => !prev)}>
            <Icon path="M12 12a4 4 0 100-8 4 4 0 000 8zm7 9a7 7 0 10-14 0" />
          </IconButton>
          <Link className="relative rounded-full bg-black/10 p-2 text-black transition hover:bg-black/20" aria-label="Cart" to={ROUTE_PATHS.cart}>
            <Icon path="M6 6h15l-1.5 7.5H8.5L7 4H3m5.5 15a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm9 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isAdmin && (
            <Link className="hidden rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/10 md:inline-block" to={ROUTE_PATHS.adminDashboard}>
              Admin Dashboard
            </Link>
          )}
          <Link className="hidden rounded-full border border-black px-4 py-2 text-sm font-semibold text-black transition hover:bg-black/10 md:inline-block" to={ROUTE_PATHS.checkout}>
            Order Now
          </Link>
          {profileOpen && (
            <div className="absolute right-0 top-12 z-50" onMouseLeave={() => setProfileOpen(false)}>
              <ProfileMenu onNavigate={() => setProfileOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
