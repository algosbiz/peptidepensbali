"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, List, MagnifyingGlass, Truck, WhatsappLogo, X } from "@phosphor-icons/react/ssr";
import CartButton from "./CartButton";
import CategoryMenu from "./CategoryMenu";
import Container from "./Container";
import MobileToolbar from "./MobileToolbar";
import SearchBox from "./SearchBox";
import WhatsAppButton from "./WhatsAppButton";
import { categories } from "@/data/products";
import { NAV_LINKS } from "@/lib/site";
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

// The three promises shown in the gold bar above the menu.
const promises = [
  "Premium quality products",
  "Fast delivery across Bali",
  "Trusted by customers throughout Bali",
];

// A shop-style header, in three parts:
//   1. the gold promise bar
//   2. desktop only: logo, product search and WhatsApp contact (scrolls away)
//   3. the bar that stays at the top while scrolling:
//        desktop: "Browse categories", the menu and the cart
//        phone:   menu button, logo, search button and cart
// On phones there is also a toolbar stuck to the bottom of the screen.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  // True once the desktop logo row has scrolled out of view. The bar that stays at
  // the top then shows a small logo and a soft shadow.
  const [stuck, setStuck] = useState(false);
  const logoRow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRow.current) return;
    const observer = new IntersectionObserver(([entry]) => setStuck(!entry.isIntersecting));
    observer.observe(logoRow.current);
    return () => observer.disconnect();
  }, []);

  // Let keyboard users close the phone menu with the Escape key.
  // If the cart panel is open on top, Escape only closes the cart.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const logo = (
    <a href="#top" aria-label="Peptide Pens Bali, back to top" className="shrink-0">
      <Image
        src="/images/logo/peptide-pens-bali-logo.png"
        alt="Peptide Pens Bali"
        width={147}
        height={48}
        loading="eager"
      />
    </a>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-secondary focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      {/* 1. Gold promise bar. Below laptop width only the first promise fits on one line. */}
      <div className="bg-primary text-secondary">
        <Container>
          <ul className="flex h-9 items-center justify-center gap-10 text-[11px] font-semibold tracking-[0.18em] uppercase">
            {promises.map((promise, index) => (
              <li
                key={promise}
                className={`items-center gap-2 ${index === 0 ? "flex" : "hidden lg:flex"}`}
              >
                <Check size={12} weight="bold" aria-hidden="true" />
                {promise}
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* 2. Desktop: logo, search and WhatsApp contact */}
      <div ref={logoRow} className="hidden bg-surface lg:block">
        <Container className="flex h-[84px] items-center gap-10">
          {logo}
          <div className="max-w-2xl flex-1">
            <SearchBox />
          </div>
          <a
            href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex shrink-0 items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-b from-button to-button-dark text-white">
              <WhatsappLogo size={22} weight="fill" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-heading">Order on WhatsApp</span>
              <span className="block text-xs text-body">{WHATSAPP_DISPLAY_NUMBER}</span>
            </span>
          </a>
        </Container>
      </div>

      {/* 3. The bar that stays at the top */}
      <header
        className={`sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
          stuck ? "shadow-[0_12px_32px_-20px_rgb(11_11_11/0.35)]" : ""
        }`}
      >
        {/* Desktop */}
        <Container className="hidden h-16 items-center lg:flex">
          {/* Small logo, wide screens only: it slides in once the logo row above has
              scrolled away. inert keeps it out of the keyboard order while hidden. */}
          <a
            href="#top"
            aria-label="Peptide Pens Bali, back to top"
            inert={!stuck}
            className={`hidden shrink-0 overflow-hidden transition-all duration-300 xl:block ${
              stuck ? "mr-6 max-w-28 opacity-100" : "mr-0 max-w-0 opacity-0"
            }`}
          >
            <Image
              src="/images/logo/peptide-pens-bali-logo.png"
              alt=""
              width={147}
              height={48}
              className="h-8 w-auto max-w-none"
            />
          </a>
          <CategoryMenu />
          <nav aria-label="Main" className="ml-6">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block rounded-full px-3 py-2 text-[13px] font-semibold tracking-[0.08em] text-heading uppercase transition-colors hover:bg-accent hover:text-primary-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="ml-auto flex items-center gap-4 pl-6">
            <p className="hidden items-center gap-3 xl:flex">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-light text-primary-dark">
                <Truck size={20} aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-heading">Fast delivery</span>{" "}
                <span className="block text-xs text-body">across Bali</span>
              </span>
            </p>
            <span aria-hidden="true" className="hidden h-8 w-px bg-line xl:block" />
            <CartButton labelled />
          </div>
        </Container>

        {/* Phone and tablet */}
        <Container className="flex h-16 items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-heading"
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
          {logo}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchOpen(!searchOpen);
                setMenuOpen(false);
              }}
              aria-expanded={searchOpen}
              aria-controls="mobile-search"
              aria-label={searchOpen ? "Close search" : "Search products"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-heading"
            >
              {searchOpen ? (
                <X size={22} aria-hidden="true" />
              ) : (
                <MagnifyingGlass size={22} aria-hidden="true" />
              )}
            </button>
            <CartButton />
          </div>
        </Container>

        {searchOpen && (
          <div id="mobile-search" className="border-t border-line bg-white lg:hidden">
            <Container className="py-3">
              <SearchBox autoFocus onNavigate={() => setSearchOpen(false)} />
            </Container>
          </div>
        )}

        {menuOpen && (
          <div
            id="mobile-menu"
            className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          >
            <Container className="pt-2 pb-8">
              <nav aria-label="Mobile">
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block border-b border-line py-3.5 font-heading text-xl font-medium text-heading"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <h2 className="mt-7 text-xs font-semibold tracking-[0.2em] text-primary-dark uppercase">
                Shop by category
              </h2>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#category-${category.id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center rounded-xl bg-accent px-3 py-2 text-sm font-medium text-heading"
                    >
                      {category.label}
                    </a>
                  </li>
                ))}
              </ul>

              <WhatsAppButton message={WHATSAPP_MESSAGES.general} className="mt-7 w-full">
                Chat on WhatsApp
              </WhatsAppButton>
            </Container>
          </div>
        )}
      </header>

      <MobileToolbar
        onOpenCategories={() => {
          setMenuOpen(true);
          setSearchOpen(false);
        }}
      />
    </>
  );
}
