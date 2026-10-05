"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash, X } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import QuantityStepper from "./QuantityStepper";
import WhatsAppButton from "./WhatsAppButton";
import { productLabel, useCart } from "@/lib/cart";
import { getCartMessage } from "@/lib/whatsapp";

// The cart panel that slides in from the right.
// It uses the browser's built-in <dialog> element, which already handles the
// Escape key, keeps keyboard focus inside the panel and dims the page behind it.
export default function CartDrawer() {
  const { items, count, isOpen, close, remove, setQuantity, clear } = useCart();
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

  const checkoutMessage = getCartMessage(
    items.map((item) => ({
      name: productLabel(item.product, item.option?.label),
      quantity: item.quantity,
    }))
  );

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
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line bg-white px-5 py-4">
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
              Add peptide pens from the catalogue, then send your order to our team on WhatsApp.
            </p>
            <Button href="#pens" onClick={close} className="mt-6">
              Browse Peptide Pens
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto p-4">
              {items.map(({ product, option, quantity }) => {
                const ref = { productId: product.id, option: option?.label };
                const label = productLabel(product, option?.label);

                return (
                  <li
                    key={`${product.id}-${option?.label ?? ""}`}
                    className="flex gap-3 rounded-2xl bg-accent p-3"
                  >
                    {/* self-start keeps the 3:2 thumbnail from stretching to the row height */}
                    <div className="relative aspect-[3/2] w-24 shrink-0 self-start overflow-hidden rounded-xl bg-accent">
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
                            {product.format}
                          </p>
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
                      <div className="mt-2">
                        <QuantityStepper
                          value={quantity}
                          onChange={(value) => setQuantity(ref, value)}
                          label={`Quantity of ${label}`}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-line bg-white px-5 pt-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <span className="font-medium">Items</span>
                <span className="font-heading text-lg font-semibold">{count}</span>
              </div>
              {/* Hidden on very short screens (phones held sideways) to leave room for the list. */}
              <p className="mt-2 text-sm leading-relaxed text-body [@media(max-height:500px)]:hidden">
                Prices, availability and delivery are confirmed by our team on WhatsApp.
              </p>
              <WhatsAppButton message={checkoutMessage} className="mt-4 w-full">
                Proceed to Checkout
                <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </WhatsAppButton>
              <button
                type="button"
                onClick={() => {
                  clear();
                  focusTitle();
                }}
                className="mt-3 w-full py-1 text-center text-sm text-body underline-offset-4 hover:text-heading hover:underline"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}
