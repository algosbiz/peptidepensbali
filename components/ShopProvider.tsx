"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ShopOffers } from "@/lib/shop";

const ShopContext = createContext<ShopOffers>({});

// Makes the shop's prices, stock and pen types (read on the server in lib/shop-data.ts)
// available to every product card and to the cart. Wraps the whole page in app/page.tsx.
export default function ShopProvider({ offers, children }: { offers: ShopOffers; children: ReactNode }) {
  return <ShopContext value={offers}>{children}</ShopContext>;
}

// Inside a component: const offers = useShopOffers();
// then getOffers(offers, product.id, dose) from lib/shop.ts.
export function useShopOffers() {
  return useContext(ShopContext);
}
