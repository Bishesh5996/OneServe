import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { OneServeLogo } from "@components/branding/OneServeLogo.jsx";

const FooterSection = ({ title, links }) => (
  <div>
    <p className="font-semibold text-black">{title}</p>
    <ul className="mt-3 space-y-2 text-sm text-black">
      {links.map((link) => (
        <li key={link.label}>
          <Link className="transition hover:underline" to={link.to}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com" },
  { label: "Pinterest", href: "https://www.pinterest.com" },
  { label: "YouTube", href: "https://www.youtube.com" }
];

const SHOP_LINKS = [
  { label: "All Meal Kits", to: ROUTE_PATHS.mealKits },
  { label: "Breakfast", to: `${ROUTE_PATHS.mealKits}?category=breakfast` },
  { label: "Lunch & Dinner", to: `${ROUTE_PATHS.mealKits}?category=lunch-dinner` },
  { label: "Vegetarian", to: `${ROUTE_PATHS.mealKits}?category=vegetarian` }
];

const COMPANY_LINKS = [
  { label: "About", to: ROUTE_PATHS.home },
  { label: "How it Works", to: ROUTE_PATHS.howItWorksPage },
  { label: "Blog", to: ROUTE_PATHS.blog },
  { label: "Contact", to: ROUTE_PATHS.contact }
];

const SUPPORT_LINKS = [
  { label: "FAQ", to: ROUTE_PATHS.howItWorksPage },
  { label: "Shipping Info", to: ROUTE_PATHS.orderTracking },
  { label: "Returns", to: ROUTE_PATHS.contact },
  { label: "Privacy Policy", to: ROUTE_PATHS.contact }
];

export const SiteFooter = () => (
  <footer className="mt-16 border-t border-black/10 bg-orange-500 px-4 py-12 text-black" id="footer">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-5">
      <div className="space-y-4 md:col-span-2">
        <OneServeLogo />
        <p className="text-sm">Single-serve cooking kits perfectly portioned and fun to prep.</p>
        <div className="flex gap-3">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              className="rounded-full border border-black px-3 py-1 text-xs font-semibold text-black transition hover:bg-black/10"
              href={social.href}
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
      <FooterSection title="Shop" links={SHOP_LINKS} />
      <FooterSection title="Company" links={COMPANY_LINKS} />
      <FooterSection title="Support" links={SUPPORT_LINKS} />
    </div>
    <p className="mx-auto mt-10 max-w-6xl border-t border-black/20 pt-6 text-xs uppercase tracking-[0.4em]">
      © {new Date().getFullYear()} OneServe. All rights reserved.
    </p>
  </footer>
);
