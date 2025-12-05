import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTE_PATHS } from "@app/routes/paths.js";
import { apiClient } from "@utils/apiClient.js";
import { fallbackProducts, mapProductsResponse } from "@utils/productMappers.js";
import { formatCurrencyNpr, resolveProductPrice } from "@utils/currency.js";

const normalize = (value = "") => value.trim().toLowerCase();

const levenshtein = (a, b) => {
  const aLen = a.length;
  const bLen = b.length;
  if (aLen === 0) return bLen;
  if (bLen === 0) return aLen;
  const matrix = Array.from({ length: aLen + 1 }, (_, i) => [i]);
  for (let j = 0; j <= bLen; j += 1) matrix[0][j] = j;
  for (let i = 1; i <= aLen; i += 1) {
    for (let j = 1; j <= bLen; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(matrix[i - 1][j] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j - 1] + cost);
    }
  }
  return matrix[aLen][bLen];
};

const computeScore = (product, term) => {
  if (!term) return 0;
  const values = [product.name, product.category, ...(product.tags ?? [])].map((value) => normalize(value));
  const distances = values.map((value) => levenshtein(term, value.slice(0, 60)));
  const bestDistance = Math.min(...distances);
  const hasPrefix = values.some((value) => value.startsWith(term));
  const hasTerm = values.some((value) => value.includes(term));
  let score = bestDistance;
  if (hasPrefix) score -= 3;
  if (hasTerm) score -= 1;
  return score;
};

const mergeProducts = (primary = [], fallback = []) => {
  const map = new Map();
  fallback.forEach((product) => {
    if (product?.id) map.set(product.id, product);
  });
  primary.forEach((product) => {
    if (product?.id) {
      const existing = map.get(product.id) ?? {};
      map.set(product.id, { ...existing, ...product });
    }
  });
  return Array.from(map.values());
};

export const ProductSearchPanel = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || (products.length && !error)) return;
    let ignore = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiClient.get("/products", { params: { limit: 60 } });
        if (!ignore) {
          const normalized = mapProductsResponse(response.data);
          setProducts(mergeProducts(normalized, fallbackProducts));
        }
      } catch (err) {
        if (!ignore) {
          setProducts(mergeProducts([], fallbackProducts));
          setError("Showing featured kits while we reconnect.");
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      ignore = true;
    };
  }, [open, products.length]);

  useEffect(() => {
    if (!open) {
      setQuery("");
    }
  }, [open]);

  const filtered = useMemo(() => {
    if (!products.length) return [];
    const term = normalize(query);
    return products
      .map((product) => ({ product, score: computeScore(product, term) }))
      .sort((a, b) => {
        if (term) return a.score - b.score || a.product.name.localeCompare(b.product.name);
        return a.product.name.localeCompare(b.product.name);
      })
      .map((entry) => entry.product)
      .filter((product) => Boolean(product.slug))
      .slice(0, 6);
  }, [products, query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const targetSlug = filtered[0]?.slug;
    if (targetSlug) {
      navigate(`${ROUTE_PATHS.product}/${targetSlug}`);
      onClose?.();
    }
  };

  if (!open) return null;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-3xl border border-black/10 bg-white/95 p-4 text-sm text-black shadow-xl backdrop-blur" ref={panelRef}>
      <form className="flex items-center gap-2 rounded-2xl border border-black/10 px-3 py-2" onSubmit={handleSubmit}>
        <span className="text-black/50">🔍</span>
        <input
          autoFocus
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-black/40"
          placeholder="Search meal kits"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query && (
          <button className="text-xs font-semibold text-black/50" onClick={() => setQuery("")} type="button">
            Clear
          </button>
        )}
        <button className="hidden" type="submit">
          Search
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-orange-600">{error}</p>}
      {loading ? (
        <p className="mt-4 text-xs text-black/60">Loading kits…</p>
      ) : products.length && filtered.length ? (
        <>
          <p className="mt-3 text-[11px] uppercase tracking-[0.3em] text-black/50">Closest matches</p>
          <ul className="mt-2 space-y-2" aria-live="polite">
            {filtered.map((product) => {
              if (!product.slug) return null;
              const targetSlug = product.slug;
              return (
                <li key={`${product.id}-${targetSlug}`}>
                <Link
                  className="flex items-center gap-3 rounded-2xl border border-black/5 px-2 py-2 hover:bg-black/5"
                  onClick={onClose}
                  to={`${ROUTE_PATHS.product}/${targetSlug}`}
                >
                  {product.image ? <img alt={product.name} className="h-10 w-10 rounded-2xl object-cover" src={product.image} /> : <div className="h-10 w-10 rounded-2xl bg-black/5" />}
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-black/50">
                      Closest match · {product.category}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-black">{formatCurrencyNpr(resolveProductPrice(product).priceNpr)}</span>
                </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : !products.length ? (
        <p className="mt-4 text-xs text-black/60">Meal kits will appear here once loaded.</p>
      ) : (
        <p className="mt-4 text-xs text-black/60">No kits found.</p>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-black/60">
        <Link className="font-semibold text-orange-600 hover:underline" onClick={onClose} to={ROUTE_PATHS.mealKits}>
          View all meal kits
        </Link>
        <button className="font-semibold text-black/60 hover:text-black" onClick={onClose} type="button">
          Close
        </button>
      </div>
    </div>
  );
};
