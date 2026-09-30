"use client";

import { useSyncExternalStore } from "react";
import { products, type Product } from "@/data/products";

// THE CART
// There is no shop backend: the cart only lives in the visitor's browser
// (localStorage), so it survives a page refresh. "Proceed to Checkout" turns the
// cart into a WhatsApp message (see components/CartDrawer.tsx).
//
// Components read the cart with the useCart() hook below, e.g.
//   const { items, count, add, open } = useCart();

export type CartLine = { productId: number; quantity: number };
export type CartItem = { product: Product; quantity: number };

export const MAX_QUANTITY = 99;
const STORAGE_KEY = "peptide-pens-bali-cart";

type CartState = { lines: CartLine[]; isOpen: boolean };

const EMPTY: CartState = { lines: [], isOpen: false };
let state: CartState = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

// Keep a quantity between 1 and MAX_QUANTITY, whatever is typed or saved.
export function clampQuantity(quantity: number) {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)));
}

// Read the saved cart, ignoring anything broken or any product that no longer exists.
function readSavedLines(): CartLine[] {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(saved)) return [];
    return saved
      .filter((line) => products.some((product) => product.id === line?.productId))
      .map((line) => ({ productId: line.productId, quantity: clampQuantity(line.quantity) }));
  } catch {
    return [];
  }
}

function update(next: Partial<CartState>) {
  // getSnapshot() makes sure the saved cart is loaded first, so a very early click
  // (while the page is still starting up) can never overwrite it.
  state = { ...getSnapshot(), ...next };
  if (next.lines) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    } catch {
      // Private browsing or full storage: the cart still works until the page closes.
    }
  }
  listeners.forEach((listener) => listener());
}

// Keeps two open tabs in sync when the cart changes in one of them.
function handleStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY) {
    state = { ...state, lines: readSavedLines() };
    listeners.forEach((listener) => listener());
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    state = { ...state, lines: readSavedLines() };
  }
  return state;
}

// The server has no localStorage, so it always renders an empty cart.
function getServerSnapshot() {
  return EMPTY;
}

// Actions. They can be called from any component, e.g. onClick={() => cart.open()}
export const cart = {
  add(productId: number, quantity = 1) {
    const current = getSnapshot().lines;
    const existing = current.find((line) => line.productId === productId);
    const lines = existing
      ? current.map((line) =>
          line.productId === productId
            ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
            : line
        )
      : [...current, { productId, quantity: clampQuantity(quantity) }];
    update({ lines, isOpen: true });
  },
  setQuantity(productId: number, quantity: number) {
    update({
      lines: getSnapshot().lines.map((line) =>
        line.productId === productId ? { ...line, quantity: clampQuantity(quantity) } : line
      ),
    });
  },
  remove(productId: number) {
    update({ lines: getSnapshot().lines.filter((line) => line.productId !== productId) });
  },
  clear() {
    update({ lines: [] });
  },
  open() {
    update({ isOpen: true });
  },
  close() {
    update({ isOpen: false });
  },
};

export function useCart() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const items: CartItem[] = current.lines.flatMap((line) => {
    const product = products.find((p) => p.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return { items, count, isOpen: current.isOpen, ...cart };
}
