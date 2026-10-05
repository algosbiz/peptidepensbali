import Container from "./Container";
import ProductCard from "./ProductCard";
import WhatsAppButton from "./WhatsAppButton";
import { categories, products } from "@/data/products";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// On large screens each row holds 3 cards. A category's note card stretches
// across whatever space is left in its last row, so rows never end with a gap.
const noteSpan = ["lg:col-span-3", "lg:col-span-2", "lg:col-span-1"];

export default function Products() {
  return (
    <section id="pens" className="bg-accent py-20 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our Range</p>
            <h2 className="section-title mt-4">Disposable Peptide Pens Available</h2>
            <p className="mt-5 text-lg text-body">
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
        <nav aria-label="Product categories" className="mt-10">
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
          {/* One row per category in data/products.ts */}
          {categories.map((category) => {
            const items = products.filter((product) => product.category === category.id);

            return (
              // The category title sits beside its cards on wide screens (xl) and
              // above them on smaller ones, so the cards always have enough room.
              <div
                key={category.id}
                id={`category-${category.id}`}
                className="grid gap-8 border-t border-secondary/15 pt-8 xl:grid-cols-12 xl:gap-10"
              >
                <div className="xl:col-span-3">
                  <p className="font-heading text-sm font-semibold text-primary-dark">
                    {category.number}
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-semibold text-heading">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-body">{category.intro}</p>
                </div>

                <div className="render-when-near grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:col-span-9">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}

                  {category.note && (
                    <div
                      className={`flex flex-col justify-between gap-8 rounded-2xl bg-secondary p-7 sm:col-span-2 ${noteSpan[items.length % 3]}`}
                    >
                      <p className="max-w-md font-heading text-xl leading-snug font-medium text-white">
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
