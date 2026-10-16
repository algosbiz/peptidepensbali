"use client";

import { useId, useState } from "react";
import { flushSync } from "react-dom";
import Image from "next/image";
import { MagnifyingGlass } from "@phosphor-icons/react/ssr";
import { categories, hasWidePhoto, products, type Product } from "@/data/products";

// Everything a visitor might type to find a product: its name, category,
// format, protocol goal and doses.
function searchText(product: Product) {
  const category = categories.find((c) => c.id === product.category);
  return [
    product.name,
    product.format,
    product.tag,
    category?.title,
    ...(product.options ?? []).map((o) => o.label),
  ]
    .join(" ")
    .toLowerCase();
}

type SearchBoxProps = {
  // Called after a result is picked (the phone header uses it to close its search bar).
  onNavigate?: () => void;
  // Put the cursor in the search field straight away (used when the phone search bar opens).
  autoFocus?: boolean;
};

// Product search in the header. It searches the products in data/products.ts
// and each result jumps to that product's card in the catalogue.
export default function SearchBox({ onNavigate, autoFocus = false }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputId = useId();

  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results =
    query.trim().length >= 2
      ? products.filter((p) => words.every((word) => searchText(p).includes(word))).slice(0, 6)
      : [];

  function goTo(product: Product) {
    // Close the results (and the phone search bar) before scrolling, so the page
    // already has its final layout when the browser works out where the product is.
    flushSync(() => {
      setOpen(false);
      setQuery("");
      onNavigate?.();
    });
    const id = `product-${product.id}`;
    // Jumping to the same product twice: the address doesn't change, so scroll ourselves.
    if (window.location.hash === `#${id}`) {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    } else {
      window.location.hash = id;
    }
  }

  return (
    <div
      className="relative w-full"
      // Close the results when keyboard focus or a click moves outside the search.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          if (results[0]) goTo(results[0]);
        }}
        className="flex h-11 w-full overflow-hidden rounded-full border border-line bg-white focus-within:border-primary-dark"
      >
        <label htmlFor={inputId} className="sr-only">
          Search products
        </label>
        <input
          id={inputId}
          type="search"
          value={query}
          placeholder="Search peptide pens, bundles, protocols…"
          autoComplete="off"
          autoFocus={autoFocus}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setQuery("");
              setOpen(false);
            }
          }}
          className="min-w-0 flex-1 bg-transparent px-5 text-sm text-heading placeholder:text-body focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid w-12 shrink-0 place-items-center bg-linear-to-b from-button to-button-dark text-white"
        >
          <MagnifyingGlass size={20} weight="bold" aria-hidden="true" />
        </button>
      </form>

      {open && query.trim().length >= 2 && (
        <div
          // Keeps focus in the search field while a result is clicked or tapped.
          // Otherwise Safari would close the list before the click arrives.
          onMouseDown={(event) => event.preventDefault()}
          className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-card"
        >
          <p aria-live="polite" className="sr-only">
            {results.length} products found
          </p>
          {results.length > 0 ? (
            <ul className="max-h-[60vh] overflow-y-auto py-2">
              {results.map((product) => (
                <li key={product.id}>
                  <a
                    href={`#product-${product.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(product);
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-accent focus-visible:bg-accent"
                  >
                    <span
                      className={`relative w-14 shrink-0 overflow-hidden rounded-md bg-accent ${hasWidePhoto(product) ? "aspect-[3/2]" : "aspect-square"}`}
                    >
                      <Image src={product.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-heading">
                        {product.name}
                      </span>
                      <span className="block truncate text-xs text-body">
                        {categories.find((c) => c.id === product.category)?.title}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-body">
              No products found for “{query.trim()}”. Try another name, or ask us on WhatsApp.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
