"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Check, List, X } from "@phosphor-icons/react/ssr";
import CartButton from "./CartButton";
import Container from "./Container";
import WhatsAppButton from "./WhatsAppButton";
import { NAV_LINKS } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// The three promises shown in the gold bar above the menu.
const promises = [
  "Premium quality products",
  "Fast delivery across Bali",
  "Trusted by customers throughout Bali",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const topMarker = useRef<HTMLDivElement>(null);

  // Give the header a solid background and border once the visitor scrolls.
  // We watch a tiny invisible marker at the top of the page: when it leaves the
  // screen, the page has been scrolled. This is lighter than a scroll listener.
  useEffect(() => {
    const marker = topMarker.current;
    if (!marker) return;

    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry.isIntersecting);
    });
    observer.observe(marker);
    return () => observer.disconnect();
  }, []);

  // Let keyboard users close the mobile menu with the Escape key.
  // If the cart panel is open on top, Escape only closes the cart.
  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !document.querySelector("dialog[open]")) setMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const isSolid = scrolled || menuOpen;

  return (
    <>
      <div ref={topMarker} aria-hidden="true" className="absolute top-0 h-4 w-px" />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-secondary focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>

      {/* Gold promise bar. Below laptop width only the first promise fits on one line. */}
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

      <header
        className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
          isSolid ? "border-line bg-white/90 backdrop-blur-md" : "border-transparent bg-white"
        }`}
      >
        <Container className="flex h-20 items-center justify-between gap-6">
          <a href="#top" aria-label="Peptide Pens Bali, back to top" className="shrink-0">
            <Image
              src="/images/logo/peptide-pens-bali-logo.png"
              alt="Peptide Pens Bali"
              width={147}
              height={48}
              loading="eager"
            />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[15px] font-medium text-heading/75 transition-colors hover:text-primary-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <WhatsAppButton message={WHATSAPP_MESSAGES.general}>Chat on WhatsApp</WhatsAppButton>
            </div>

            <CartButton />

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-heading lg:hidden"
            >
              {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
            </button>
          </div>
        </Container>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
            <Container className="pt-4 pb-8">
              <nav aria-label="Mobile">
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="block border-b border-line py-4 font-heading text-2xl font-medium text-heading"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <WhatsAppButton message={WHATSAPP_MESSAGES.general} className="mt-8 w-full">
                Chat on WhatsApp
              </WhatsAppButton>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
