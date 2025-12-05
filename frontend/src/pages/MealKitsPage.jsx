import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { ShopProductCard } from "@components/cards/ShopProductCard.jsx";
import { apiClient } from "@utils/apiClient.js";
import { fallbackProducts, mapProductsResponse } from "@utils/productMappers.js";
import { formatCurrencyNpr } from "@utils/currency.js";

const CATEGORY_OPTIONS = ["Breakfast", "Lunch", "Dinner", "Snacks", "Desserts"];
const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Low-Carb"];
const PREP_TIME_OPTIONS = [
  { label: "Under 15 min", value: "under-15" },
  { label: "15-30 min", value: "15-30" },
  { label: "30-45 min", value: "30-plus" }
];
const SORT_OPTIONS = [
  { value: "featured", label: "Sort by: Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Rating" }
];

const slugify = (value = "") => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const DIETARY_ALIASES = {
  vegetarian: ["vegetarian", "veg", "plantbased"],
  vegan: ["vegan", "plantbased"],
  "glutenfree": ["glutenfree", "gluten-free"],
  keto: ["keto", "lowcarb"],
  lowcarb: ["lowcarb", "keto"]
};

const FilterCheckbox = ({ label, checked, onChange, value, disabled = false }) => (
  <label className={`flex cursor-pointer items-center gap-3 text-sm font-semibold ${disabled ? "text-black/30" : "text-black"}`}>
    <input
      checked={checked}
      className="h-4 w-4 rounded border-black/40 text-orange-500 focus:ring-orange-500"
      disabled={disabled}
      onChange={() => onChange(value)}
      type="checkbox"
    />
    {label}
  </label>
);

export const MealKitsPage = () => {
  const [products, setProducts] = useState(fallbackProducts);
  const [total, setTotal] = useState(fallbackProducts.length);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [selectedPrep, setSelectedPrep] = useState("");
  const [priceRange, setPriceRange] = useState(50);
  const [sortOption, setSortOption] = useState("featured");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/products", { params: { limit: 24 } });
        const normalized = mapProductsResponse(response.data);
        if (!ignore) {
          setProducts(normalized.length ? normalized : fallbackProducts);
          setTotal(response.data?.total ?? normalized.length ?? fallbackProducts.length);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          setProducts(fallbackProducts);
          setTotal(fallbackProducts.length);
          setError("Unable to reach the server. Showing sample kits.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  const sortedProducts = useMemo(() => {
    const items = [...products];
    if (sortOption === "price-asc") items.sort((a, b) => a.price - b.price);
    if (sortOption === "price-desc") items.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") items.sort((a, b) => b.rating - a.rating);
    return items;
  }, [products, sortOption]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter((product) => {
      if (priceRange && product.price > priceRange) return false;

      if (selectedCategories.length) {
        const productCategory = slugify(product.category ?? "");
        if (!selectedCategories.includes(productCategory)) return false;
      }

      if (selectedDietary.length) {
        const tagSlugs = (product.tags ?? []).map((tag) => slugify(tag));
        const dietSlug = slugify(product.diet ?? product.category ?? "");
        const matchesDiet = selectedDietary.some((value) => {
          const synonyms = DIETARY_ALIASES[value] ?? [value];
          return synonyms.some((synonym) => tagSlugs.includes(synonym) || dietSlug.includes(synonym));
        });
        if (!matchesDiet) return false;
      }

      if (selectedPrep) {
        const minutes = Number.parseInt(product.prepTime, 10) || 0;
        if (selectedPrep === "under-15" && minutes > 15) return false;
        if (selectedPrep === "15-30" && (minutes <= 15 || minutes > 30)) return false;
        if (selectedPrep === "30-plus" && minutes <= 30) return false;
      }

      return true;
    });
  }, [sortedProducts, priceRange, selectedCategories, selectedDietary, selectedPrep]);

  const handleCategoryToggle = (value) => {
    setSelectedCategories((current) => (current.includes(value) ? current.filter((item) => item !== value) : [...current, value]));
  };

  const toggleDietary = (value) => {
    setSelectedDietary((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  const handlePrepToggle = (value) => {
    setSelectedPrep((current) => (current === value ? "" : value));
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedDietary([]);
    setSelectedPrep("");
    setPriceRange(50);
    setRefreshKey((key) => key + 1);
  };

  const handleApplyFilters = () => setRefreshKey((key) => key + 1);

  return (
    <div className="space-y-10 py-12">
      <section className="rounded-[32px] bg-gradient-to-r from-orange-600 to-orange-400 px-10 py-12 text-black shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.4em]">Single-Serve Meal Kits</p>
        <h1 className="mt-4 text-4xl font-black">Perfectly portioned ingredients for one-person meals.</h1>
        <p className="mt-3 max-w-2xl text-base">
          Browse 150+ kits designed for busy solo cooks. Ready in minutes with chef-tested flavors, no waste, and flexible plans.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white" to={ROUTE_PATHS.checkout}>
            Shop Now
          </Link>
          <button className="rounded-full border border-black px-6 py-3 text-sm font-semibold text-black hover:bg-black/10" onClick={handleApplyFilters} type="button">
            Apply Filters
          </button>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-[32px] border border-orange-100 bg-white p-6 shadow">
          <div>
            <h3 className="text-lg font-bold text-black">Filters</h3>
            <p className="text-sm text-black/70">Fine tune your kits for the week.</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60">Category</p>
            <div className="mt-3 space-y-3">
              {CATEGORY_OPTIONS.map((label) => {
                const value = slugify(label);
                return <FilterCheckbox key={label} checked={selectedCategories.includes(value)} label={label} onChange={handleCategoryToggle} value={value} />;
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60">Dietary</p>
            <div className="mt-3 space-y-3">
              {DIETARY_OPTIONS.map((label) => {
                const value = slugify(label);
                return <FilterCheckbox key={label} checked={selectedDietary.includes(value)} label={label} onChange={toggleDietary} value={value} />;
              })}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60">Price Range</p>
            <div className="mt-3">
              <input className="w-full accent-orange-500" max="50" min="5" onChange={(event) => setPriceRange(Number(event.target.value))} step="1" type="range" value={priceRange} />
              <p className="mt-2 text-sm text-black">Up to {formatCurrencyNpr(priceRange)}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60">Prep Time</p>
            <div className="mt-3 space-y-3">
              {PREP_TIME_OPTIONS.map((option) => (
                <FilterCheckbox key={option.value} checked={selectedPrep === option.value} label={option.label} onChange={handlePrepToggle} value={option.value} />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex-1 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-black hover:bg-orange-400" onClick={handleApplyFilters} type="button">
              Apply Filters
            </button>
            <button className="flex-1 rounded-full border border-black px-4 py-2 text-sm font-semibold text-black hover:bg-black/10" onClick={handleClearFilters} type="button">
              Clear All
            </button>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-black">All Meal Kits</h2>
              <p className="text-sm text-black/70">
                Showing {filteredProducts.length} of {total} products
              </p>
              {error ? <p className="text-xs text-red-600">{error}</p> : null}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="rounded-full border border-black/30 px-4 py-2 text-sm text-black" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex gap-2">
                <button className="rounded-full border border-black/20 p-2 text-black" type="button">
                  <IconGrid />
                </button>
                <button className="rounded-full border border-black/20 p-2 text-black" type="button">
                  <IconList />
                </button>
              </div>
            </div>
          </div>
          {loading ? (
            <p className="py-10 text-center text-sm text-black/70">Loading kits…</p>
          ) : filteredProducts.length === 0 ? (
            <p className="py-10 text-center text-sm text-black/70">No meal kits match these filters yet.</p>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ShopProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const IconGrid = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />
  </svg>
);

const IconList = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M8 6h13M3 6h.01M8 12h13M3 12h.01M8 18h13M3 18h.01" />
  </svg>
);
