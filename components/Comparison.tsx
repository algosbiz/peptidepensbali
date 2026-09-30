import { Check } from "@phosphor-icons/react/ssr";
import Container from "./Container";

const pens = [
  "Ready to use",
  "Compact",
  "Portable",
  "Convenient for travel",
  "Simple storage",
  "All-in-one device",
];

const vials = [
  "Wide range of peptide options",
  "Popular across many peptide categories",
  "Flexible product selection",
];

export default function Comparison() {
  return (
    <section className="bg-accent py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Comparison</p>
          <h2 className="section-title mt-4">Peptide Pens vs Traditional Vials</h2>
          <p className="mt-5 text-lg leading-relaxed text-body">
            Customers often ask about the differences between disposable peptide pens and
            traditional vial products.
          </p>
        </div>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-secondary p-8 text-white sm:p-10">
            <h3 className="font-heading text-2xl font-semibold">Disposable Peptide Pens</h3>
            <ul className="mt-7 space-y-4">
              {pens.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-secondary">
                    <Check size={14} weight="bold" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The "vs" badge sits between the two cards on wider screens. */}
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 hidden h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-accent bg-white font-heading text-sm font-semibold text-heading md:grid"
          >
            vs
          </span>

          <div className="rounded-3xl border border-line bg-white p-8 sm:p-10">
            <h3 className="font-heading text-2xl font-semibold text-heading">Traditional Vials</h3>
            <ul className="mt-7 space-y-4">
              {vials.map((item) => (
                <li key={item} className="flex items-center gap-3 text-heading/85">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line text-primary-dark">
                    <Check size={14} weight="bold" aria-hidden="true" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center leading-relaxed text-body">
          Atlas Longevity supplies both disposable peptide pens and traditional injectable peptide
          products, allowing customers to choose the option that best suits their preferences.
        </p>
      </Container>
    </section>
  );
}
