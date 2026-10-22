"use client";

import { useState } from "react";
import Image from "next/image";
import { CaretDown } from "@phosphor-icons/react/ssr";
import AddToCart from "./AddToCart";
import { useShopOffers } from "./ShopProvider";
import { hasWidePhoto, type Product } from "@/data/products";
import { findOffer, formatPrice, getOffers } from "@/lib/shop";

// One product in the catalogue. The same card is reused for every product;
// only the data passed in changes. Products with several doses show a dose
// picker, and the photo changes to match the chosen dose.
// Pens sold in the online shop also get a pen type picker (disposable pen, reusable pen,
// cartridge) and show the shop's price for the chosen dose and pen type.
// The card's id (product-1, product-2, ...) lets the search and the slider jump to it.
export default function ProductCard({ product }: { product: Product }) {
  const options = product.options ?? [];
  const [selected, setSelected] = useState(options[0]?.label);
  const [penType, setPenType] = useState<string>();
  const option = options.find((o) => o.label === selected);
  const image = option?.image ?? product.image;

  // The shop's offers for the chosen dose, one per pen type (none if the shop doesn't sell it).
  const offers = getOffers(useShopOffers(), product.id, selected);
  // The chosen pen type, or the disposable pen when the chosen one isn't sold in this dose.
  const offer = findOffer(offers, penType) ?? offers[0];
  const penTypes = offers.filter((o) => o.penType);

  return (
    <article
      id={`product-${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-white ring-1 ring-line/80 transition duration-300 target:ring-2 target:ring-primary hover:-translate-y-0.5 hover:shadow-card"
    >
      {/* Square frame for pen photos, wide (3:2) frame for bundle, protocol and accessory pictures */}
      <div
        className={`relative overflow-hidden bg-white ${hasWidePhoto(product) ? "aspect-[3/2]" : "aspect-square"}`}
      >
        <Image
          src={image}
          alt={option ? `${product.name} ${option.label}` : product.name}
          fill
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 31vw, 48vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-3 pt-4 pb-3 text-center sm:px-4">
        {product.tag && (
          <p className="mb-1 text-[10px] font-semibold tracking-wide text-primary-dark uppercase sm:text-xs">
            {product.tag}
          </p>
        )}
        <h4 className="font-heading text-sm leading-snug font-semibold text-heading sm:text-base">
          {product.name}
        </h4>
        <p className="mt-1 text-xs leading-snug text-body">{product.format}</p>

        {/* A single dose is simply shown. */}
        {options.length === 1 && (
          <p className="mt-3 inline-flex rounded-full bg-accent px-3 py-1.5 text-[11px] font-semibold text-heading sm:text-xs">
            {options[0].label}
          </p>
        )}

        {/* Several doses: real radio buttons (styled as pills), so the arrow keys work too. */}
        {options.length > 1 && (
          <fieldset className="mt-3">
            <legend className="sr-only">Choose a dose of {product.name}</legend>
            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {options.map((o) => (
                <label key={o.label} className="cursor-pointer">
                  <input
                    type="radio"
                    name={`dose-${product.id}`}
                    value={o.label}
                    checked={o.label === selected}
                    onChange={() => setSelected(o.label)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex rounded-full border border-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-heading transition-colors peer-checked:border-button-dark peer-checked:bg-button-dark peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-dark hover:border-heading sm:px-3 sm:text-xs">
                    {o.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {/* Pen type: a dropdown, because three pen types don't fit side by side on phones.
            The card shows "Disposable" instead of the shop's "Disposable Pen" so it fits on
            small phones; the cart and WhatsApp messages use the full name. */}
        {penTypes.length > 1 && (
          <div className="relative mt-2 w-full max-w-[13rem]">
            <select
              value={offer?.penType}
              onChange={(event) => setPenType(event.target.value)}
              aria-label={`Pen type of ${product.name}`}
              className="h-9 w-full cursor-pointer appearance-none rounded-full border border-line bg-white pr-8 pl-4 text-center text-[11px] font-semibold text-heading transition-colors hover:border-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark sm:text-xs"
            >
              {penTypes.map((o) => (
                <option key={o.penType} value={o.penType}>
                  {o.penTypeName?.replace(/ pen$/i, "")}
                </option>
              ))}
            </select>
            <CaretDown
              size={12}
              weight="bold"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-body"
            />
          </div>
        )}

        {/* mt-auto keeps the prices of a row of cards on one line, just above the buttons. */}
        <p className="mt-auto pt-3 font-heading text-[15px] font-semibold text-heading sm:text-base">
          {offer ? (
            <>
              {offer.regularPrice > offer.price && (
                <s className="mr-1.5 text-xs font-normal text-body">
                  <span className="sr-only">Regular price </span>
                  {formatPrice(offer.regularPrice)}
                </s>
              )}
              {formatPrice(offer.price)}
            </>
          ) : (
            <span className="text-[11px] font-medium whitespace-nowrap text-body sm:text-sm">
              Price on WhatsApp
            </span>
          )}
        </p>
      </div>

      <AddToCart product={product} option={selected} offer={offer} />
    </article>
  );
}
