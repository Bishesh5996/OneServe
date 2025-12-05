import { Outlet } from "react-router-dom";

import { SiteFooter } from "@components/footer/SiteFooter.jsx";
import { MainNav } from "@components/navigation/MainNav.jsx";

export const SiteLayout = () => (
  <div className="min-h-screen bg-[#f8f5ef] text-black">
    <MainNav />
    <main className="mx-auto max-w-6xl px-4">
      <Outlet />
    </main>
    <SiteFooter />
  </div>
);
