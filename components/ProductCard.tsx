"use client";

import { useState } from "react";
import Image from "next/image";
import AddToCart from "./AddToCart";
import type { Product } from "@/data/products";

// One product in the catalogue. The same card is reused for every product;
// only the data passed in changes. Products with several doses show a dose
// picker, and the photo changes to match the chosen dose.
export default function ProductCard({ product }: { product: Product }) {
  const options = product.options ?? [];
  const [selected, setSelected] = useState(options[0]?.label);
  const option = options.find((o) => o.label === selected);
  const image = option?.image ?? product.image;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="relative aspect-[3/2] overflow-hidden bg-white">
        <Image
          src={image}
          alt={option ? `${product.name} ${option.label}` : product.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex-1 px-5 pt-5 pb-4">
        {product.tag && (
          <p className="mb-1.5 text-xs font-semibold tracking-wide text-primary-dark uppercase">
            {product.tag}
          </p>
        )}
        <h4 className="font-heading text-lg leading-snug font-semibold text-heading">
          {product.name}
        </h4>
        <p className="mt-1 text-sm text-body">{product.format}</p>

        {/* A single dose is simply shown. */}
        {options.length === 1 && (
          <p className="mt-3 inline-flex rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-heading">
            {options[0].label}
          </p>
        )}

        {/* Several doses: real radio buttons (styled as pills), so the arrow keys work too. */}
        {options.length > 1 && (
          <fieldset className="mt-3">
            <legend className="sr-only">Choose a dose of {product.name}</legend>
            <div className="flex flex-wrap gap-2">
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
                  <span className="inline-flex rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-heading transition-colors peer-checked:border-button-dark peer-checked:bg-button-dark peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-dark hover:border-heading">
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
