"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, SquaresFour } from "@phosphor-icons/react/ssr";
import { categories, products } from "@/data/products";

// The "Browse categories" button in the desktop header. It opens a list of all
// catalogue categories; each one jumps to its row in the catalogue.
export default function CategoryMenu() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  // Close when clicking anywhere else, or when pressing Escape.
  useEffect(() => {
    if (!open) return;

    function handleClick(event: MouseEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapper} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="category-menu"
        className="flex h-11 items-center gap-3 rounded-full bg-secondary py-1.5 pr-5 pl-1.5 text-[13px] font-semibold tracking-[0.08em] text-white uppercase shadow-[0_10px_24px_-14px_rgb(11_11_11/0.8)] transition-colors hover:bg-[#262626]"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-b from-primary to-button-dark">
          <SquaresFour size={16} weight="fill" aria-hidden="true" />
        </span>
        Browse categories
        <CaretDown
          size={14}
          weight="bold"
          aria-hidden="true"
          className={`ml-1 text-primary transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* The list floats just below the button, with the category number in gold
          and the number of products on the right. */}
      {open && (
        <ul
          id="category-menu"
          className="absolute top-[calc(100%+0.75rem)] left-0 z-50 w-80 rounded-2xl border border-line bg-white p-2 shadow-[0_28px_60px_-24px_rgb(11_11_11/0.4)]"
        >
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#category-${category.id}`}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-accent"
              >
                <span className="w-5 text-xs font-semibold text-primary-dark">{category.number}</span>
                {category.label}
                <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-xs text-body transition-colors group-hover:bg-white">
                  {products.filter((product) => product.category === category.id).length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
