"use client";

import { useState } from "react";
import { ShoppingBag, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "./Button";
import QuantityStepper from "./QuantityStepper";
import type { Product } from "@/data/products";
import { cart, clampQuantity, productLabel } from "@/lib/cart";
import { getProductMessage, getWhatsAppUrl } from "@/lib/whatsapp";

type AddToCartProps = {
  product: Product;
  // The dose picked on the card, for products with dose options.
  option?: string;
};

// Bottom of a product card: pick a quantity, add it to the cart, or skip the
// cart and ask about this one product straight away on WhatsApp.
export default function AddToCart({ product, option }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const label = productLabel(product, option);

  function handleAdd() {
    cart.add({ productId: product.id, option }, quantity);
    setQuantity(1);
  }

  return (
    <div className="border-t border-line p-4">
      <div className="flex items-center gap-2">
        <QuantityStepper
          value={quantity}
          onChange={(value) => setQuantity(clampQuantity(value))}
          label={`Quantity of ${label}`}
        />
        {/* The label starts with the visible words, so voice-control users can say "Add to cart". */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add to cart: ${quantity} x ${label}`}
          className={`inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold whitespace-nowrap transition duration-200 active:scale-[0.98] ${buttonVariants.primary}`}
        >
          <ShoppingBag size={18} weight="bold" aria-hidden="true" />
          Add to cart
        </button>
      </div>

      <a
        href={getWhatsAppUrl(getProductMessage(label))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Or ask on WhatsApp about ${label}`}
        className="mt-2 flex min-h-6 items-center justify-center gap-1.5 py-1 text-sm font-medium text-body transition-colors hover:text-primary-dark"
      >
        <WhatsappLogo size={16} weight="fill" className="text-primary-dark" aria-hidden="true" />
        Or ask on WhatsApp
      </a>
    </div>
  );
}
