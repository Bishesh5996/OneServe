import { create } from "zustand";
import { devtools } from "zustand/middleware";

const serializeCustomizations = (customizations = []) =>
  customizations
    .map((custom) => `${custom.id ?? custom.name}:${custom.quantity ?? custom.defaultQuantity ?? 0}`)
    .join("|");

export const useCartStore = create(
  devtools((set, get) => ({
    items: [],
    addItem: (item, qty = 1) => {
      const key = `${item.id}-${serializeCustomizations(item.customizations)}`;
      const existingIndex = get().items.findIndex((entry) => entry.uid === key);
      const rawLimit = Number.isFinite(item.stock) ? Math.max(0, item.stock) : Infinity;
      if (rawLimit === 0) {
        return;
      }
      if (existingIndex >= 0) {
        const current = get().items[existingIndex];
        const limit = Number.isFinite(rawLimit)
          ? rawLimit
          : Number.isFinite(current.stock)
            ? current.stock
            : Infinity;
        const nextQuantity = limit === Infinity ? current.quantity + qty : Math.min(limit, current.quantity + qty);
        set({
          items: get().items.map((entry, index) =>
            index === existingIndex ? { ...entry, quantity: nextQuantity, stock: limit } : entry
          )
        });
      } else {
        const initialQty = rawLimit === Infinity ? qty : Math.min(rawLimit, qty);
        set({
          items: [
            ...get().items,
            { ...item, quantity: Math.max(1, initialQty), uid: key, stock: Number.isFinite(rawLimit) ? rawLimit : undefined }
          ]
        });
      }
    },
    removeItem: (uid) => set({ items: get().items.filter((entry) => entry.uid !== uid) }),
    updateQuantity: (uid, quantity) =>
      set({
        items: get().items.map((entry) => {
          if (entry.uid !== uid) return entry;
          const limit = Number.isFinite(entry.stock) ? Math.max(1, entry.stock) : undefined;
          const nextQuantity = limit ? Math.min(limit, quantity) : quantity;
          return { ...entry, quantity: Math.max(1, nextQuantity) };
        })
      }),
    clear: () => set({ items: [] })
  }))
);
