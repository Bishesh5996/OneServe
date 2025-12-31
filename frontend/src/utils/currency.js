const USD_TO_NPR = 133;
const PRICE_DEDUCTION_NPR = 1000;
const USD_VALUE_THRESHOLD = 60;

const toNumber = (value) => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

export const convertUsdToNpr = (value) => Math.max(0, toNumber(value) * USD_TO_NPR - PRICE_DEDUCTION_NPR);

export const ensureNprValue = (value, currencyHint) => {
  const numeric = toNumber(value);
  if (!numeric) return 0;
  if (currencyHint && currencyHint.toUpperCase() === "NPR") {
    return Math.round(Math.max(0, numeric));
  }
  if (numeric > USD_VALUE_THRESHOLD) {
    return Math.round(Math.max(0, numeric));
  }
  return Math.round(convertUsdToNpr(numeric));
};

export const formatCurrencyNpr = (value) => `Rs ${Math.round(Math.max(0, toNumber(value))).toLocaleString("en-IN")}`;

export const resolveProductPrice = (product, options = {}) => {
  const compareMultiplier = options.compareMultiplier ?? 1.2;
  const basePrice = toNumber(product?.price);
  const comparePrice = toNumber(product?.comparePrice ?? (product?.price ?? 0) * compareMultiplier);
  return {
    priceNpr: ensureNprValue(basePrice, product?.currency),
    comparePriceNpr: ensureNprValue(comparePrice, product?.currency)
  };
};

export const resolveCustomizationPrice = (unitPrice, currencyHint) => ensureNprValue(unitPrice, currencyHint);

export const SHIPPING_THRESHOLD_NPR = ensureNprValue(25, "USD");

export const currencyConstants = {
  USD_TO_NPR,
  PRICE_DEDUCTION_NPR,
  USD_VALUE_THRESHOLD
};

// Explicit re-export for compatibility with named imports in navigation/profile
export { formatCurrencyNpr as formatCurrency };
