import Container from "./Container";
import ProductCard from "./ProductCard";
import WhatsAppButton from "./WhatsAppButton";
import { categories, products } from "@/data/products";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// The grid shows 2 cards per row on phones, 3 on laptops (lg) and 4 on wide screens (xl).
// A category's note card stretches across whatever space is left in its last row,
// so rows never end with a gap.
const noteSpanLg = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];
const noteSpanXl = ["xl:col-span-4", "xl:col-span-3", "xl:col-span-2", "xl:col-span-1"];

export default function Products() {
  return (
    <section id="pens" className="pb-16 lg:pb-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our Range</p>
            <h2 className="section-title mt-4">Disposable Peptide Pens Available in Bali</h2>
            <p className="mt-4 text-lg text-body">
              Atlas Longevity offers a growing range of disposable peptide pens.
            </p>
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-heading text-lg font-semibold text-heading">
              Available Peptide Pen Categories
            </h3>
            <p className="mt-2 text-body">
              Atlas Longevity offers disposable peptide pens across several popular categories.
            </p>
          </div>
        </div>

        {/* Buttons that jump to each category. On phones the row scrolls sideways. */}
        <nav aria-label="Product categories" className="mt-8">
          <ul className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
            {categories.map((category) => (
              <li key={category.id} className="shrink-0">
                <a
                  href={`#category-${category.id}`}
                  className="pill inline-flex items-center gap-2 border border-line bg-white text-heading transition-colors hover:border-heading"
                >
                  {category.label}
                  <span className="text-body">
                    {products.filter((product) => product.category === category.id).length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-14 lg:space-y-16">
          {/* One block per category in data/products.ts: a dark title bar, then its products */}
          {categories.map((category) => {
            const items = products.filter((product) => product.category === category.id);

            return (
              <div key={category.id} id={`category-${category.id}`}>
                <div className="flex items-center justify-between gap-4 rounded-xl bg-secondary px-5 py-3.5 sm:px-6">
                  <h3 className="font-heading text-lg leading-snug font-semibold text-white sm:text-xl">
                    <span className="mr-2 text-primary">{category.number}</span>
                    {category.title}
                  </h3>
                  <p className="shrink-0 text-xs text-white/70 sm:text-sm">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </p>
                </div>
                <p className="mt-3 text-sm text-body">{category.intro}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}

                  {category.note && (
                    <div
                      className={`col-span-2 flex flex-col justify-between gap-6 rounded-xl bg-accent p-6 sm:p-7 ${noteSpanLg[items.length % 3]} ${noteSpanXl[items.length % 4]}`}
                    >
                      <p className="max-w-md font-heading text-lg leading-snug font-medium text-heading sm:text-xl">
                        {category.note}
                      </p>
                      <div>
                        <WhatsAppButton message={WHATSAPP_MESSAGES.general}>
                          Ask on WhatsApp
                        </WhatsAppButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-14 text-center text-body">
          Additional products continue to be added as they become available.
        </p>
      </Container>
    </section>
  );
}
