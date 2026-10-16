"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown, List } from "@phosphor-icons/react/ssr";
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
    <div ref={wrapper} className="relative w-64 shrink-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="category-menu"
        className="flex h-12 w-full items-center gap-3 bg-secondary px-5 text-[13px] font-semibold tracking-wide text-white uppercase"
      >
        <List size={20} aria-hidden="true" />
        Browse categories
        <CaretDown
          size={16}
          weight="bold"
          aria-hidden="true"
          className={`ml-auto transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          id="category-menu"
          className="absolute inset-x-0 top-full z-50 rounded-b-2xl border border-t-0 border-line bg-white py-2 shadow-card"
        >
          {categories.map((category) => (
            <li key={category.id}>
              <a
                href={`#category-${category.id}`}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-3 px-5 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-accent hover:text-primary-dark"
              >
                {category.label}
                <span className="text-xs text-body">
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
