"use client";

import { useState } from "react";
import { ShoppingBag, WhatsappLogo } from "@phosphor-icons/react/ssr";
import { buttonVariants } from "./Button";
import QuantityStepper from "./QuantityStepper";
import type { Product } from "@/data/products";
import { cart, clampQuantity, productLabel } from "@/lib/cart";
import type { ShopOffer } from "@/lib/shop";
import { getProductMessage, getWhatsAppUrl } from "@/lib/whatsapp";

type AddToCartProps = {
  product: Product;
  // The dose picked on the card, for products with dose options.
  option?: string;
  // The online shop's offer for the picked dose and pen type (none if the shop doesn't sell it).
  offer?: ShopOffer;
};

// Bottom of a product card: pick a quantity, add it to the cart, or skip the
// cart and ask about this one product straight away on WhatsApp.
// On phones (narrow 2-column grid) the quantity and the button sit on top of each other.
export default function AddToCart({ product, option, offer }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const label = productLabel(product, option, offer?.penTypeName);
  // Sold out in the online shop: it can't be added, but visitors can still ask on WhatsApp.
  const soldOut = offer ? !offer.inStock : false;

  function handleAdd() {
    cart.add({ productId: product.id, option, penType: offer?.penType }, quantity);
    setQuantity(1);
  }

  return (
    <div className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <QuantityStepper
          value={quantity}
          onChange={(value) => setQuantity(clampQuantity(value))}
          label={`Quantity of ${label}`}
          fullWidthOnPhones
        />
        {/* The label starts with the visible words, so voice-control users can say "Add to cart". */}
        {soldOut ? (
          <button
            type="button"
            disabled
            className="inline-flex h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-accent px-3 text-[13px] font-semibold whitespace-nowrap text-body sm:flex-1 sm:text-sm"
          >
            Out of stock
          </button>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            aria-label={`Add to cart: ${quantity} x ${label}`}
            className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-3 text-[13px] font-semibold whitespace-nowrap transition duration-200 active:scale-[0.98] sm:flex-1 sm:text-sm ${buttonVariants.primary}`}
          >
            {/* The icon is dropped on the narrowest phones, so the words always fit. */}
            <ShoppingBag size={18} weight="bold" className="max-[359px]:hidden" aria-hidden="true" />
            Add to cart
          </button>
        )}
      </div>

      <a
        href={getWhatsAppUrl(getProductMessage(label))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ask on WhatsApp about ${label}`}
        className="mt-2 flex min-h-6 items-center justify-center gap-1.5 py-1 text-xs font-medium text-body transition-colors hover:text-primary-dark sm:text-sm"
      >
        <WhatsappLogo
          size={16}
          weight="fill"
          className="text-primary-dark max-[359px]:hidden"
          aria-hidden="true"
        />
        Ask on WhatsApp
      </a>
    </div>
  );
}
