"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCart from "./AddToCart";
import { hasWidePhoto, type Product } from "@/data/products";

// One product in the catalogue. The same card is reused for every product;
// only the data passed in changes. Products with several doses show a dose
// picker, and the photo changes to match the chosen dose.
// The card's id (product-1, product-2, ...) lets the search and the slider jump to it.
export default function ProductCard({ product }: { product: Product }) {
  const options = product.options ?? [];
  const [selected, setSelected] = useState(options[0]?.label);
  const option = options.find((o) => o.label === selected);
  const image = option?.image ?? product.image;

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
      </div>

      <AddToCart product={product} option={selected} />
    </article>
  );
}
