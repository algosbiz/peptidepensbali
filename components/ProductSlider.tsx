"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react/ssr";
import Button from "./Button";
import Container from "./Container";
import { useShopOffers } from "./ShopProvider";
import { categories, featuredProductIds, hasWidePhoto, products, type Product } from "@/data/products";
import { formatPrice, getOffers, type ShopOffers } from "@/lib/shop";

const featured = featuredProductIds.flatMap((id) => products.filter((p) => p.id === id));

// The lowest online shop price of a product's doses as a disposable pen (the first offer
// of each dose), for the "From Rp..." line. Undefined when the shop doesn't sell it.
function lowestPrice(shopOffers: ShopOffers, product: Product) {
  const doses = product.options?.length ? product.options.map((o) => o.label) : [undefined];
  const prices = doses.flatMap((dose) =>
    getOffers(shopOffers, product.id, dose)
      .slice(0, 1)
      .map((offer) => offer.price)
  );
  return prices.length > 0 ? Math.min(...prices) : undefined;
}

// "5 mg" or "5-30 mg": the doses a product comes in.
function doseRange(product: Product) {
  const labels = (product.options ?? []).map((o) => o.label);
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  // Combination pens ("10 mg + 2 mg") don't make a readable range, so count them instead.
  if (labels.some((label) => label.includes("+"))) return `${labels.length} strengths`;
  const first = labels[0].replace(/\s*mg$/, "");
  return `${first}-${labels[labels.length - 1]}`;
}

// The slider at the top of the page with a few featured products
// (choose them with featuredProductIds in data/products.ts).
// It never moves by itself: visitors use the arrows, the dots, a swipe or the arrow keys.
export default function ProductSlider() {
  const [index, setIndex] = useState(0);
  // The fade animation only plays after the visitor changes the product, not on page load.
  const [moved, setMoved] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const shopOffers = useShopOffers();
  const product = featured[index];
  const count = featured.length;
  const fade = moved ? "slide-fade" : "";

  function show(next: number) {
    setIndex((next + count) % count);
    setMoved(true);
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured peptide pens"
      className="bg-linear-to-b from-surface to-white pt-4 pb-8 sm:pt-6 sm:pb-10 lg:pt-10 lg:pb-14"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") show(index - 1);
        if (event.key === "ArrowRight") show(index + 1);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 50) show(distance < 0 ? index + 1 : index - 1);
        touchStartX.current = null;
      }}
    >
      <Container>
        <div className="rounded-[2rem] bg-white p-2 shadow-[0_40px_90px_-50px_rgb(11_11_11/0.45)] ring-1 ring-line sm:p-4">
          <div className="rounded-3xl border border-line/70 p-4 sm:p-10 xl:p-14">
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${product.name}`}
              className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-14"
            >
              {/* The text of every featured product, stacked on top of each other with only
                  the current one visible. The longest one sets the height, so the
                  controls below never jump up and down. */}
              <div className="order-2 grid lg:order-1">
                {featured.map((item, i) => {
                  const current = i === index;
                  const category = categories.find((c) => c.id === item.category);
                  // The pen details only apply to the pre-filled pens, not to bundles,
                  // protocols, nasal sprays or accessories.
                  const isPen = /peptide pen$|blend pen$/i.test(item.format);
                  // Up to three small facts, taken from the product data and the Atlas pen details.
                  const facts = [
                    { value: doseRange(item), label: "Available doses" },
                    ...(isPen
                      ? [
                          { value: "Pre-filled", label: "Disposable pen" },
                          { value: "300 units", label: "3 ml cartridge" },
                        ]
                      : []),
                  ].filter((fact) => fact.value);
                  const price = lowestPrice(shopOffers, item);

                  return (
                    <div
                      key={item.id}
                      aria-hidden={!current}
                      inert={!current}
                      className={`col-start-1 row-start-1 lg:self-center ${current ? fade : "invisible"}`}
                    >
                      <p className="eyebrow">{category?.title}</p>
                      <p className="mt-4 font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-heading sm:text-5xl lg:text-4xl xl:text-5xl">
                        {item.name}
                        {/* On phones the category is already in the small label above. */}
                        <span className="mt-1 hidden text-primary italic sm:block">{category?.label}</span>
                      </p>
                      {price !== undefined && (
                        <p className="mt-3 font-heading text-lg font-semibold text-heading sm:mt-4 sm:text-2xl">
                          <span className="mr-1.5 text-sm font-medium text-body sm:text-base">From</span>
                          {formatPrice(price)}
                        </p>
                      )}
                      <p className="mt-5 hidden max-w-md leading-relaxed text-body sm:block">
                        {isPen
                          ? `${item.name} in the pre-filled Atlas Longevity pen format, delivered across Bali in discreet packaging.`
                          : `${item.format}, delivered across Bali in discreet packaging.`}
                      </p>

                      {/* Phones: a small table. Larger screens: boxes side by side. */}
                      {facts.length > 0 && (
                        <ul className="mt-5 divide-y divide-line rounded-2xl border border-line sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:rounded-none sm:border-0">
                          {facts.map((fact) => (
                            <li
                              key={fact.label}
                              className="flex flex-row-reverse items-baseline justify-between gap-3 px-4 py-2.5 sm:block sm:rounded-2xl sm:border sm:border-line sm:bg-white sm:p-4 sm:shadow-[0_12px_30px_-24px_rgb(11_11_11/0.5)] lg:p-3 xl:p-4"
                            >
                              <p className="font-heading text-sm font-semibold whitespace-nowrap text-heading sm:text-xl lg:text-lg xl:text-xl">
                                {fact.value}
                              </p>
                              <p className="text-xs leading-snug text-body sm:mt-1">{fact.label}</p>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
                        <Button href={`#product-${item.id}`}>
                          View product
                          <ArrowRight size={18} weight="bold" aria-hidden="true" />
                        </Button>
                        {/* Phones already have "Shop" in the bottom toolbar. */}
                        <div className="hidden sm:block">
                          <Button href="#pens" variant="outline">
                            All products
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="order-1 lg:order-2">
                {/* key={index} starts a fresh image (and its fade) for every product. */}
                <div
                  key={index}
                  className={`relative rotate-[1.5deg] rounded-3xl bg-white p-2 shadow-card ring-1 ring-line sm:p-3 ${fade}`}
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl ${hasWidePhoto(product) ? "aspect-[3/2]" : "aspect-square"}`}
                  >
                    {/* The first photo is the largest thing on the first screen,
                        so the browser fetches it before anything else. */}
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      loading="eager"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      sizes="(min-width: 1024px) 560px, calc(100vw - 72px)"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Tells screen-reader users which product is showing after they change it. */}
            <p aria-live="polite" className="sr-only">
              {moved ? `Product ${index + 1} of ${count}: ${product.name}` : ""}
            </p>

            {/* Counter and progress on the left, arrows (and dots on larger screens) on the right */}
            <div className="mt-6 flex items-center justify-between gap-5 sm:mt-8 lg:mt-12">
              <div className="min-w-0 flex-1 sm:max-w-sm">
                <p className="text-xs font-semibold tracking-[0.15em] text-heading uppercase">
                  {String(index + 1).padStart(2, "0")}
                  <span className="mx-2 text-body">/</span>
                  {String(count).padStart(2, "0")}
                  <span className="ml-3 hidden text-body sm:inline">{product.name}</span>
                </p>
                <div className="mt-3 h-1 rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-button to-primary transition-all duration-500"
                    style={{ width: `${((index + 1) / count) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => show(index - 1)}
                  aria-label="Previous product"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-heading transition-colors hover:border-heading"
                >
                  <CaretLeft size={18} weight="bold" aria-hidden="true" />
                </button>
                <div className="hidden items-center gap-1 rounded-full bg-accent px-3 py-2 sm:flex">
                  {featured.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => show(i)}
                      aria-label={`Show ${item.name}`}
                      aria-current={i === index ? "true" : undefined}
                      className="grid h-6 w-6 place-items-center"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all ${
                          i === index ? "w-6 bg-button-dark" : "w-2 bg-heading/25"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => show(index + 1)}
                  aria-label="Next product"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-heading transition-colors hover:border-heading"
                >
                  <CaretRight size={18} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
