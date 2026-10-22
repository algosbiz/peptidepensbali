"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash, WhatsappLogo, X } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import QuantityStepper from "./QuantityStepper";
import WhatsAppButton from "./WhatsAppButton";
import { useShopOffers } from "./ShopProvider";
import { hasWidePhoto } from "@/data/products";
import { productLabel, useCart, type CartItem } from "@/lib/cart";
import { findOffer, formatPrice, getCheckoutUrl, getOffers, type ShopOffer } from "@/lib/shop";
import { getCartMessage, getWhatsAppUrl } from "@/lib/whatsapp";

// A cart line together with its online shop offer (none if the shop doesn't sell it).
type CartLineWithOffer = CartItem & { offer?: ShopOffer };

// The name of a cart line, e.g. "Retatrutide Pen (10 mg, Reusable Pen)".
function lineLabel(line: CartLineWithOffer) {
  return productLabel(line.product, line.option?.label, line.offer?.penTypeName ?? line.penType);
}

// The WhatsApp order message for a list of cart lines.
function orderMessage(lines: CartLineWithOffer[]) {
  return getCartMessage(lines.map((line) => ({ name: lineLabel(line), quantity: line.quantity })));
}

// The cart panel that slides in from the right.
// It uses the browser's built-in <dialog> element, which already handles the
// Escape key, keeps keyboard focus inside the panel and dims the page behind it.
//
// "Proceed to Checkout" sends the products that the online shop sells and has in stock
// to the shop's checkout at peptidesbali.online, with the shop's prices. Products the shop
// doesn't sell (no shopId in data/products.ts) or has sold out are ordered on WhatsApp.
export default function CartDrawer() {
  const { items, count, isOpen, close, remove, setQuantity, clear } = useCart();
  const shopOffers = useShopOffers();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pressedOnBackdrop = useRef(false);

  // Show or hide the dialog whenever the cart is opened or closed.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // After removing items, move keyboard focus to the "Cart (n)" title, so it stays
  // inside the panel and screen readers hear the new count.
  function focusTitle() {
    titleRef.current?.focus();
  }

  // Split the cart: lines the shop has in stock go to the online checkout, the rest to WhatsApp.
  const lines: CartLineWithOffer[] = items.map((item) => ({
    ...item,
    offer: findOffer(getOffers(shopOffers, item.product.id, item.option?.label), item.penType),
  }));
  const shopLines = lines.flatMap((line) =>
    line.offer?.inStock ? [{ shopId: line.offer.shopId, quantity: line.quantity, price: line.offer.price }] : []
  );
  const whatsAppLines = lines.filter((line) => !line.offer?.inStock);
  const hasShopItems = shopLines.length > 0;
  const hasWhatsAppItems = whatsAppLines.length > 0;
  const subtotal = shopLines.reduce((total, line) => total + line.price * line.quantity, 0);

  let checkoutNote = "Prices, availability and delivery are confirmed by our team on WhatsApp.";
  // Kept to about two lines, so the cart list still has room on small phones.
  if (hasShopItems && hasWhatsAppItems) {
    checkoutNote = "Pay online for the rest, then send the items marked for WhatsApp to our team.";
  } else if (hasShopItems) {
    checkoutNote = "Any delivery or payment fees are added at checkout on peptidesbali.online.";
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="cart-title"
      onClose={close}
      // A click on the dimmed area outside the panel lands on the dialog itself.
      // Only close when the press also started there (not a drag out of the panel)
      // and it is not the second click of a double-click on "Add to cart".
      onPointerDown={(event) => {
        pressedOnBackdrop.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (pressedOnBackdrop.current && event.target === event.currentTarget && event.detail < 2) {
          close();
        }
      }}
      className="cart-drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-[420px] bg-white p-0 text-heading backdrop:bg-secondary/50 backdrop:backdrop-blur-sm"
    >
      {/* On very short screens (phones held sideways) the whole panel scrolls instead of
          only the list, so the products aren't squeezed above the checkout buttons.
          The title bar with the close button stays at the top. */}
      <div className="flex h-full flex-col [@media(max-height:500px)]:overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-5 py-4">
          <h2
            id="cart-title"
            ref={titleRef}
            tabIndex={-1}
            className="rounded-md font-heading text-lg font-semibold"
          >
            Cart <span className="font-normal text-body">({count})</span>
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-accent"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-accent text-primary-dark">
              <ShoppingBag size={28} aria-hidden="true" />
            </span>
            <p className="mt-5 font-heading text-lg font-semibold">Your cart is empty</p>
            <p className="mt-2 text-sm leading-relaxed text-body">
              Add peptide pens from the catalogue, then check out online or send your order to our
              team on WhatsApp.
            </p>
            <Button href="#pens" onClick={close} className="mt-6">
              Browse Peptide Pens
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4 [@media(max-height:500px)]:flex-none [@media(max-height:500px)]:overflow-visible">
              {lines.map((line) => {
                const { product, option, penType, quantity, offer } = line;
                const ref = { productId: product.id, option: option?.label, penType };
                const label = lineLabel(line);

                return (
                  <li
                    key={`${product.id}-${option?.label ?? ""}-${penType ?? ""}`}
                    className="flex gap-3 rounded-2xl bg-accent p-3"
                  >
                    {/* self-start keeps the thumbnail from stretching to the row height */}
                    <div
                      className={`relative w-24 shrink-0 self-start overflow-hidden rounded-xl bg-accent ${hasWidePhoto(product) ? "aspect-[3/2]" : "aspect-square"}`}
                    >
                      <Image
                        src={option?.image ?? product.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-heading text-[15px] leading-snug font-semibold">
                            {product.name}
                          </p>
                          <p className="text-xs text-body">
                            {option && (
                              <span className="font-semibold text-heading">{option.label} · </span>
                            )}
                            {offer?.penTypeName ?? product.format}
                          </p>
                          {!offer?.inStock && (
                            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary-dark">
                              <WhatsappLogo size={14} weight="fill" aria-hidden="true" />
                              {offer ? "Sold out online · order on WhatsApp" : "Order on WhatsApp"}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            remove(ref);
                            focusTitle();
                          }}
                          aria-label={`Remove ${label} from cart`}
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-body transition-colors hover:bg-white hover:text-heading"
                        >
                          <Trash size={16} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                        <QuantityStepper
                          value={quantity}
                          onChange={(value) => setQuantity(ref, value)}
                          label={`Quantity of ${label}`}
                        />
                        {offer?.inStock && (
                          <p className="font-heading text-sm font-semibold">
                            {formatPrice(offer.price * quantity)}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line bg-white px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              {/* The subtotal only counts what is bought online; WhatsApp items are priced in the chat. */}
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {hasShopItems ? (hasWhatsAppItems ? "Subtotal (online)" : "Subtotal") : "Items"}
                </span>
                <span className="font-heading text-lg font-semibold">
                  {hasShopItems ? formatPrice(subtotal) : count}
                </span>
              </div>
              {/* Hidden on very short screens (phones held sideways) to leave room for the list. */}
              <p className="mt-1.5 text-sm leading-snug text-body [@media(max-height:500px)]:hidden">
                {checkoutNote}
              </p>
              {hasShopItems ? (
                <Button href={getCheckoutUrl(shopLines)} newTab className="mt-4 w-full">
                  Proceed to Checkout
                  <span className="sr-only"> on peptidesbali.online (opens in a new tab)</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </Button>
              ) : (
                <WhatsAppButton message={orderMessage(lines)} className="mt-4 w-full">
                  Proceed to Checkout
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                  <ArrowRight size={16} weight="bold" aria-hidden="true" />
                </WhatsAppButton>
              )}
              {/* Mixed cart: the products that can't be bought online get their own WhatsApp order. */}
              {hasShopItems && hasWhatsAppItems && (
                <WhatsAppButton
                  message={orderMessage(whatsAppLines)}
                  variant="outline"
                  className="mt-2 w-full"
                >
                  Order the rest on WhatsApp
                  <span className="sr-only"> (opens in a new tab)</span>
                </WhatsAppButton>
              )}
              <div className="mt-3 flex items-center justify-center gap-6 text-sm text-body">
                {/* Everything is in the shop: WhatsApp stays available for the whole order. */}
                {hasShopItems && !hasWhatsAppItems && (
                  <a
                    href={getWhatsAppUrl(orderMessage(lines))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-1 underline-offset-4 hover:text-heading hover:underline"
                  >
                    Order on WhatsApp instead
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    clear();
                    focusTitle();
                  }}
                  className="py-1 underline-offset-4 hover:text-heading hover:underline"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
