"use client";

import { useSyncExternalStore } from "react";
import { products, type Product, type ProductOption } from "@/data/products";

// THE CART
// There is no shop backend on this site: the cart only lives in the visitor's browser
// (localStorage), so it survives a page refresh. "Proceed to Checkout" hands the cart
// to the online shop at peptidesbali.online (lib/shop.ts), and anything the shop doesn't
// sell becomes a WhatsApp message (see components/CartDrawer.tsx).
//
// Components read the cart with the useCart() hook below, e.g.
//   const { items, count, add, open } = useCart();

// One line in the cart: a product, its dose (for products with dose options), its pen type
// (the online shop's code, e.g. "reusable-pen"; see lib/shop.ts) and how many.
export type CartLine = { productId: number; option?: string; penType?: string; quantity: number };
// Points at one line: the same product in two doses or two pen types is two separate lines.
export type LineRef = { productId: number; option?: string; penType?: string };
// What components receive for each line.
export type CartItem = {
  product: Product;
  option?: ProductOption;
  penType?: string;
  quantity: number;
};

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

// The name used in the cart and in WhatsApp messages,
// e.g. "Retatrutide Pen (10 mg, Reusable Pen)".
export function productLabel(product: Product, option?: string, penTypeName?: string) {
  const details = [option, penTypeName].filter(Boolean).join(", ");
  return details ? `${product.name} (${details})` : product.name;
}

// Products with doses always get a valid dose (the first one if none or an old one is
// given); products without doses never get one.
function validOption(product: Product, option?: string) {
  if (!product.options?.length) return undefined;
  return product.options.some((o) => o.label === option) ? option : product.options[0].label;
}

function isSameLine(line: LineRef, ref: LineRef) {
  return (
    line.productId === ref.productId &&
    (line.option ?? "") === (ref.option ?? "") &&
    (line.penType ?? "") === (ref.penType ?? "")
  );
}

// Read the saved cart, ignoring anything broken or any product that no longer exists,
// and merging lines that point at the same product and dose.
function readSavedLines(): CartLine[] {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(saved)) return [];
    const lines: CartLine[] = [];
    for (const raw of saved) {
      const product = products.find((p) => p.id === raw?.productId);
      if (!product) continue;
      const line = {
        productId: product.id,
        option: validOption(product, typeof raw.option === "string" ? raw.option : undefined),
        penType: typeof raw.penType === "string" && raw.penType ? raw.penType : undefined,
        quantity: clampQuantity(Number(raw.quantity)),
      };
      const existing = lines.find((l) => isSameLine(l, line));
      if (existing) existing.quantity = clampQuantity(existing.quantity + line.quantity);
      else lines.push(line);
    }
    return lines;
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
  add(ref: LineRef, quantity = 1) {
    const product = products.find((p) => p.id === ref.productId);
    if (!product) return;
    const target = {
      productId: product.id,
      option: validOption(product, ref.option),
      penType: ref.penType || undefined,
    };
    const current = getSnapshot().lines;
    const existing = current.find((line) => isSameLine(line, target));
    const lines = existing
      ? current.map((line) =>
          isSameLine(line, target)
            ? { ...line, quantity: clampQuantity(line.quantity + quantity) }
            : line
        )
      : [...current, { ...target, quantity: clampQuantity(quantity) }];
    update({ lines, isOpen: true });
  },
  setQuantity(ref: LineRef, quantity: number) {
    update({
      lines: getSnapshot().lines.map((line) =>
        isSameLine(line, ref) ? { ...line, quantity: clampQuantity(quantity) } : line
      ),
    });
  },
  remove(ref: LineRef) {
    update({ lines: getSnapshot().lines.filter((line) => !isSameLine(line, ref)) });
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
    if (!product) return [];
    const option = product.options?.find((o) => o.label === line.option);
    return [{ product, option, penType: line.penType, quantity: line.quantity }];
  });
  const count = items.reduce((total, item) => total + item.quantity, 0);

  return { items, count, isOpen: current.isOpen, ...cart };
}
