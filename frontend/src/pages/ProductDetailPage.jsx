import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { ShopProductCard } from "@components/cards/ShopProductCard.jsx";
import { FavoriteButton } from "@components/common/FavoriteButton.jsx";
import { useCartStore } from "@stores/useCartStore.js";
import { apiClient } from "@utils/apiClient.js";
import { formatCurrencyNpr, resolveProductPrice, SHIPPING_THRESHOLD_NPR } from "@utils/currency.js";
import { fallbackProducts, mapProductsResponse, normalizeProduct } from "@utils/productMappers.js";

const FALLBACK_INGREDIENTS = ["Whole wheat pasta (100g)", "Chef-crafted sauce", "Seasonal vegetables", "Herb oil finish"];
const FALLBACK_NUTRITION = { calories: 420, protein: 15, carbs: 55, fat: 18 };
const PREMIUM_KEYWORDS = ["salmon", "steak", "shrimp", "prawn", "cod", "beef", "lamb", "turkey", "chicken", "pork", "tuna", "duck"];
const VALUE_KEYWORDS = ["sauce", "herb", "oil", "garnish", "seasoning", "spice", "dressing", "greens"];

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const addItem = useCartStore((state) => state.addItem);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const [customSelections, setCustomSelections] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let ignore = false;
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/products/${slug}`);
        const normalized = normalizeProduct(response.data);
        if (!ignore) {
          setProduct(normalized);
          setSelectedImage(normalized.gallery?.[0] ?? normalized.image ?? "");
          setQuantity((normalized.stock ?? 0) > 0 ? 1 : 0);
          setErrorMessage("");
        }
      } catch (error) {
        if (!ignore) {
          const status = error.response?.status;
          const serverMessage = error.response?.data?.message;
          if (status === 404 || status === 410) {
            setProduct(null);
            setErrorMessage(serverMessage ?? (status === 404 ? "Product not found." : "This product link is no longer available."));
          } else {
            const fallback = fallbackProducts.find((kit) => kit.slug === slug);
            if (fallback) {
              setProduct(fallback);
              setSelectedImage(fallback.gallery?.[0] ?? fallback.image ?? "");
              setQuantity((fallback.stock ?? 0) > 0 ? 1 : 0);
              setErrorMessage("Showing a featured kit while we reconnect.");
            } else {
              setProduct(null);
              setErrorMessage(serverMessage ?? "Unable to load product details.");
            }
          }
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchProduct();
    return () => {
      ignore = true;
    };
  }, [slug]);

  useEffect(() => {
    let ignore = false;
    const fetchRecommendations = async () => {
      try {
        const response = await apiClient.get("/products", { params: { limit: 6 } });
        const normalized = mapProductsResponse(response.data);
        if (!ignore) {
          setRelated(normalized.filter((item) => item.slug !== slug));
        }
      } catch {
        if (!ignore) {
          setRelated(fallbackProducts.filter((item) => item.slug !== slug).slice(0, 4));
        }
      }
    };

    fetchRecommendations();
    return () => {
      ignore = true;
    };
  }, [slug]);

  const ingredients = product?.ingredients?.length ? product.ingredients : FALLBACK_INGREDIENTS;
  const nutrition = product?.nutrition ?? FALLBACK_NUTRITION;
  const { priceNpr: basePriceNpr, comparePriceNpr: compareBaseNpr } = resolveProductPrice(product);
  const ingredientCustomizations = useMemo(
    () => buildIngredientCustomizations(product, ingredients, basePriceNpr),
    [product, ingredients, basePriceNpr]
  );

  useEffect(() => {
    const defaults = {};
    ingredientCustomizations.forEach((custom) => {
      defaults[custom.id] = custom.defaultQuantity ?? 0;
    });
    setCustomSelections(defaults);
  }, [ingredientCustomizations]);

  const gallery = useMemo(() => {
    if (!product) return [];
    if (Array.isArray(product.gallery) && product.gallery.length) return product.gallery;
    if (product.image) return [product.image];
    return [];
  }, [product]);

  const activeImage = selectedImage || gallery[0] || "";

  const customAdjustment = useMemo(() => {
    return ingredientCustomizations.reduce((sum, custom) => {
      const selectedQty = customSelections[custom.id] ?? custom.defaultQuantity ?? 0;
      const defaultQty = custom.defaultQuantity ?? 0;
      return sum + (selectedQty - defaultQty) * (custom.unitPrice ?? 0);
    }, 0);
  }, [ingredientCustomizations, customSelections]);

  const computedPriceNpr = Math.max(0, basePriceNpr + customAdjustment);
  const compareDisplayNpr = Math.max(0, compareBaseNpr + customAdjustment);

  const displayProduct = useMemo(() => {
    if (!product) return null;
    return {
      ...product,
      price: computedPriceNpr,
      comparePrice: compareDisplayNpr,
      currency: "NPR"
    };
  }, [product, computedPriceNpr, compareDisplayNpr]);

  const availableStock = product?.stock ?? 0;
  const ingredientShortage = useMemo(() => {
    return ingredientCustomizations.some((custom) => {
      const selectedQty = customSelections[custom.id] ?? custom.defaultQuantity ?? 0;
      const stockLimit = Number.isFinite(custom.stock) ? custom.stock : Infinity;
      return selectedQty > stockLimit;
    });
  }, [ingredientCustomizations, customSelections]);
  const canPurchase = availableStock > 0 && !ingredientShortage;


  if (loading) {
    return <p className="py-20 text-center text-sm text-black/70">Loading product…</p>;
  }

  if (!product) {
    return <p className="py-20 text-center text-sm text-black/70">{errorMessage || "Product not found."}</p>;
  }

  const handleQuantityChange = (delta) => {
    if (!canPurchase) return;
    setQuantity((prev) => {
      const next = Math.max(1, prev + delta);
      return Math.min(availableStock || 1, next);
    });
  };

  const handleCustomizationChange = (custom, delta) => {
    setCustomSelections((prev) => {
      const current = prev[custom.id] ?? custom.defaultQuantity ?? 0;
      const min = Number.isFinite(custom.minQuantity) ? custom.minQuantity : 0;
      const maxBase = Number.isFinite(custom.maxQuantity) ? custom.maxQuantity : min + 4;
      const stockLimit = Number.isFinite(custom.stock) ? custom.stock : null;
      const effectiveMax = stockLimit !== null ? Math.max(min, Math.min(maxBase, stockLimit)) : maxBase;
      const next = Math.max(min, Math.min(effectiveMax, current + delta));
      return { ...prev, [custom.id]: next };
    });
  };

  const handleAddToCart = () => {
    const selectedCustomizations = ingredientCustomizations.map((custom) => ({
      id: custom.id,
      name: custom.name,
      quantity: customSelections[custom.id] ?? custom.defaultQuantity ?? 0,
      defaultQuantity: custom.defaultQuantity ?? 0,
      unitPrice: custom.unitPrice ?? 0
    }));

    if (!canPurchase) {
      window.alert("This meal kit configuration is currently out of stock.");
      return;
    }
    if (quantity > availableStock) {
      window.alert("Only a limited number of kits are available.");
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        price: computedPriceNpr,
        basePrice: basePriceNpr,
        stock: availableStock,
        image: product.image,
        description: product.description,
        customizations: selectedCustomizations
      },
      quantity
    );
  };

  return (
    <div className="space-y-12 py-12">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="relative rounded-[32px] border border-orange-100 bg-white p-4 shadow-md">
            {activeImage ? <img alt={product.name} className="h-[28rem] w-full rounded-[28px] object-cover" src={activeImage} /> : null}
            <FavoriteButton className="absolute right-6 top-6" product={displayProduct ?? product} size="lg" />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {gallery.map((image) => (
              <button
                key={image}
                className={`h-20 w-24 flex-shrink-0 rounded-2xl border ${selectedImage === image ? "border-black" : "border-transparent"}`}
                onClick={() => setSelectedImage(image)}
                type="button"
              >
                <img alt="Gallery item" className="h-full w-full rounded-2xl object-cover" src={image} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-black/70">
              <RatingStars rating={product.rating} />
              <span>({product.reviewsCount ?? 120} reviews)</span>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">In Stock</span>
            </div>
            <h1 className="text-4xl font-black text-black">{product.name}</h1>
            <p className="text-base text-black/70">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <p className="text-4xl font-black text-black">{formatCurrencyNpr(computedPriceNpr)}</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-black/40 line-through">{formatCurrencyNpr(compareDisplayNpr)}</span>
                <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold text-black">Customizable</span>
              </div>
              <p className={`mt-2 text-sm font-semibold ${canPurchase ? "text-emerald-600" : "text-red-500"}`}>
                {canPurchase ? `${availableStock} kits in stock` : "Currently out of stock"}
              </p>
              {ingredientShortage && <p className="text-xs text-red-500">Adjust ingredients that are unavailable before adding to cart.</p>}
            </div>
          </div>

          <div className="rounded-[32px] border border-orange-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-black">Ingredients Included</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {ingredients.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-black/70">
                  <CheckIcon /> {item}
                </li>
              ))}
            </ul>
          </div>

          {ingredientCustomizations.length ? (
            <div className="rounded-[32px] border border-orange-100 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black">Customize your kit</h3>
              <p className="text-sm text-black/70">Remove ingredients you don&apos;t need or boost the ones you love. Pricing updates automatically.</p>
              <div className="mt-4 space-y-4">
                {ingredientCustomizations.map((custom) => {
                  const selectedQty = customSelections[custom.id] ?? custom.defaultQuantity ?? 0;
                  const diff = selectedQty - (custom.defaultQuantity ?? 0);
                  const adjustment = diff * (custom.unitPrice ?? 0);
                  const adjustmentLabel =
                    adjustment === 0 ? "Included" : `${diff > 0 ? "+" : "-"}${formatCurrencyNpr(Math.abs(adjustment))}`;
                  return (
                    <div key={custom.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-black/5 p-4">
                      <div className="min-w-[200px] flex-1">
                        <p className="font-semibold text-black">{custom.name}</p>
                        {custom.description && <p className="text-sm text-black/60">{custom.description}</p>}
                        <p className="text-xs text-black/50">
                          {custom.unitPrice >= 0 ? "+" : "-"}
                          {formatCurrencyNpr(Math.abs(custom.unitPrice ?? 0))} each · Limits {custom.minQuantity ?? 0}-{custom.maxQuantity ?? 2}
                        </p>
                        <p className="text-xs text-black/50">
                          {Number.isFinite(custom.stock) ? `In stock: ${custom.stock}` : "In stock: plenty available"}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          className="rounded-full border border-black px-3 py-1 text-lg font-semibold"
                          onClick={() => handleCustomizationChange(custom, -1)}
                          type="button"
                        >
                          −
                        </button>
                        <span className="text-base font-semibold">{selectedQty}</span>
                        <button
                          className="rounded-full border border-black px-3 py-1 text-lg font-semibold"
                          onClick={() => handleCustomizationChange(custom, 1)}
                          type="button"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-black">{adjustmentLabel}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-4">
            <NutritionBox label="Calories" unit="kcal" value={nutrition.calories} />
            <NutritionBox label="Protein" unit="g" value={nutrition.protein} />
            <NutritionBox label="Carbs" unit="g" value={nutrition.carbs} />
            <NutritionBox label="Fat" unit="g" value={nutrition.fat} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full border border-black/20 px-4 py-2">
              <button className="text-xl" onClick={() => handleQuantityChange(-1)} type="button">
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button className="text-xl" onClick={() => handleQuantityChange(1)} type="button">
                +
              </button>
            </div>
            <button className="flex-1 rounded-full bg-orange-500 px-6 py-3 text-base font-semibold text-black hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-black/10" disabled={!canPurchase} onClick={handleAddToCart} type="button">
              {canPurchase ? "Add to Cart" : "Out of Stock"}
            </button>
            <FavoriteButton product={displayProduct ?? product} />
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-black/70">
            <span className="flex items-center gap-2">
              <TruckIcon /> Free shipping on orders over {formatCurrencyNpr(SHIPPING_THRESHOLD_NPR)}
            </span>
            <span className="flex items-center gap-2">
              <ClockIcon /> Ready in 30 minutes
            </span>
            <span className="flex items-center gap-2">
              <LeafIcon /> Responsibly sourced ingredients
            </span>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/60">You Might Also Like</p>
            <h2 className="text-3xl font-bold text-black">Discover more delicious single-serve kits</h2>
          </div>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {related.length
            ? related.map((item) => <ShopProductCard key={item.id} product={item} />)
            : fallbackProducts.slice(0, 4).map((item) => <ShopProductCard key={item.id} product={item} />)}
        </div>
      </section>
    </div>
  );
};

const NutritionBox = ({ label, value, unit }) => (
  <div className="rounded-3xl border border-black/5 bg-white p-4 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">{label}</p>
    <p className="text-2xl font-black text-black">
      {typeof value === "number" ? value : "—"}
      {unit ? <span className="text-sm font-semibold text-black/60"> {unit}</span> : null}
    </p>
  </div>
);

const CheckIcon = () => (
  <svg className="h-4 w-4 text-orange-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const TruckIcon = () => (
  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M3 7h13v9H3z" />
    <path d="M16 10h3l2 3v3h-5z" />
    <circle cx="7.5" cy="18" r="1.5" />
    <circle cx="17.5" cy="18" r="1.5" />
  </svg>
);

const ClockIcon = () => (
  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M12 6v6l3 2" />
    <circle cx="12" cy="12" r="9" />
  </svg>
);

const LeafIcon = () => (
  <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M5 21c11 0 14-8 14-15-4 2-7 0-10 3s-3 6-3 12z" />
  </svg>
);

const RatingStars = ({ rating = 4.8 }) => (
  <span className="flex items-center gap-1 text-xs font-semibold text-black">
    <svg className="h-4 w-4 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l2.9 6.4 7.1.6-5.3 4.7 1.6 7-6.3-3.6-6.3 3.6 1.6-7L2 9l7.1-.6z" />
    </svg>
    {Number(rating).toFixed(1)}
  </span>
);

const buildIngredientCustomizations = (product, ingredients, basePriceNpr) => {
  if (Array.isArray(product?.customizations) && product.customizations.length) {
    return product.customizations.map((custom, index) => ({
      id: custom.id ?? custom._id ?? `custom-${index}`,
      name: custom.name ?? `Option ${index + 1}`,
      description: custom.description ?? "",
      minQuantity: Number.isFinite(custom.minQuantity) ? Number(custom.minQuantity) : 0,
      maxQuantity: Number.isFinite(custom.maxQuantity) ? Number(custom.maxQuantity) : 2,
      defaultQuantity: Number.isFinite(custom.defaultQuantity) ? Number(custom.defaultQuantity) : 0,
      unitPrice: Number(custom.unitPrice ?? 0),
      stock: typeof custom.stock === "number" ? custom.stock : undefined
    }));
  }

  const list = Array.isArray(ingredients) && ingredients.length ? ingredients : FALLBACK_INGREDIENTS;
  if (!list.length) return [];

  const targetTotal = Math.max(list.length * 80, Math.round(basePriceNpr));
  const weightedEntries = list.map((item, index) => ({
    item,
    index,
    weight: getIngredientWeight(item) + (index + 1) * 0.05
  }));
  const totalWeight = weightedEntries.reduce((sum, entry) => sum + entry.weight, 0) || list.length;
  const rawShares = weightedEntries.map((entry) => (entry.weight / totalWeight) * targetTotal);
  const units = rawShares.map((share) => Math.max(40, Math.floor(share)));
  let currentSum = units.reduce((sum, value) => sum + value, 0);

  const remainderOrder = rawShares
    .map((share, index) => ({ index, remainder: share - Math.floor(share) }))
    .sort((a, b) => b.remainder - a.remainder);

  let remainderPointer = 0;
  while (currentSum < targetTotal) {
    const idx = remainderOrder[remainderPointer % remainderOrder.length]?.index ?? 0;
    units[idx] += 1;
    currentSum += 1;
    remainderPointer += 1;
  }

  let trimPointer = 0;
  while (currentSum > targetTotal) {
    const candidate = remainderOrder[trimPointer % remainderOrder.length];
    if (!candidate) break;
    if (units[candidate.index] > 40) {
      units[candidate.index] -= 1;
      currentSum -= 1;
    }
    trimPointer += 1;
  }

  const ensureUnique = () => {
    const seen = new Map();
    for (let i = 0; i < units.length; i += 1) {
      let guard = 0;
      while (seen.has(units[i]) && guard < 20) {
        const donorIndex = units.findIndex((value, idx) => idx !== i && value > 40);
        if (donorIndex === -1) {
          units[i] += 1;
          currentSum += 1;
          break;
        }
        units[donorIndex] -= 1;
        units[i] += 1;
        guard += 1;
      }
      seen.set(units[i], true);
    }
  };

  ensureUnique();

  return weightedEntries.map((entry, idx) => ({
    id: `ingredient-${entry.index}-${entry.item?.toString().toLowerCase().replace(/[^a-z0-9]+/g, "-") || "ingredient"}`,
    name: entry.item,
    description: `Adjust the portion of ${entry.item?.toString().toLowerCase() ?? "this ingredient"}.`,
    minQuantity: 0,
    maxQuantity: 2,
    defaultQuantity: 1,
    unitPrice: units[idx],
    stock: 50
  }));
};

const getIngredientWeight = (item) => {
  const label = item?.toString().toLowerCase() ?? "";
  if (!label) return 1;
  if (PREMIUM_KEYWORDS.some((keyword) => label.includes(keyword))) return 1.8;
  if (label.includes("tofu") || label.includes("paneer") || label.includes("cheese") || label.includes("egg")) return 1.2;
  if (VALUE_KEYWORDS.some((keyword) => label.includes(keyword))) return 0.6;
  return 1;
};
