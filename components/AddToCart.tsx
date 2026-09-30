"use client";

import { useState } from "react";
import { ShoppingBag, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "./Button";
import QuantityStepper from "./QuantityStepper";
import type { Product } from "@/data/products";
import { cart, clampQuantity } from "@/lib/cart";
import { getProductMessage, getWhatsAppUrl } from "@/lib/whatsapp";

// Bottom of a product card: pick a quantity, add it to the cart, or skip the
// cart and ask about this one product straight away on WhatsApp.
export default function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  function handleAdd() {
    cart.add(product.id, quantity);
    setQuantity(1);
  }

  return (
    <div className="border-t border-line p-4">
      <div className="flex items-center gap-2">
        <QuantityStepper
          value={quantity}
          onChange={(value) => setQuantity(clampQuantity(value))}
          label={`Quantity of ${product.name}`}
        />
        {/* The label starts with the visible words, so voice-control users can say "Add to cart". */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add to cart: ${quantity} x ${product.name}`}
          className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition duration-200 active:scale-[0.98] ${buttonVariants.primary}`}
        >
          <ShoppingBag size={18} weight="bold" aria-hidden="true" />
          Add to cart
        </button>
      </div>

      <a
        href={getWhatsAppUrl(getProductMessage(product.name))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Or ask on WhatsApp about ${product.name}`}
        className="mt-3 flex items-center justify-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-primary-dark"
      >
        <WhatsappLogo size={16} weight="fill" className="text-primary-dark" aria-hidden="true" />
        Or ask on WhatsApp
      </a>
    </div>
  );
}
