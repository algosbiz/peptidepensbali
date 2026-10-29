import { CheckCircle } from "@phosphor-icons/react/ssr";
import Container from "./Container";

// The reasons listed under "Why Choose Our Peptide Pens?".
const reasons = [
  "Ready-to-use disposable pens",
  "Fast delivery throughout Bali",
  "Discreet packaging",
  "Convenient administration",
  "Wide range of peptide products",
  "Responsive customer support",
  "Trusted Atlas Longevity service",
];

// An "about" card with a gold line on top: the introduction text in two columns
// and the reasons to choose these pens underneath.
export default function Intro() {
  return (
    <section className="pb-16 lg:pb-24">
      <Container>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-linear-to-br from-white to-accent p-7 shadow-[0_40px_90px_-60px_rgb(11_11_11/0.5)] ring-1 ring-line sm:p-10 lg:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-button via-primary to-primary-light"
          />
          <h2 className="max-w-2xl font-heading text-3xl leading-tight font-semibold tracking-[-0.02em] text-heading sm:text-4xl">
            Looking for peptides and peptide pens in Bali?
          </h2>

          <div className="mt-6 grid gap-6 text-[15px] leading-relaxed text-body md:grid-cols-2 md:gap-10">
            <p>
              <strong className="font-semibold text-heading">Atlas Longevity</strong> provides fast
              and discreet delivery of premium disposable peptide pens throughout Bali. Whether
              you’re staying in Canggu, Seminyak, Ubud, Sanur, Uluwatu or anywhere else on the
              island, we offer a convenient way to access a wide range of peptide pen products.
            </p>
            <p>
              Our catalogue includes weight management peptide pens, recovery peptide pens and
              selected wellness products, alongside injectable peptides and nasal spray
              formulations.
            </p>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <h3 className="font-heading text-base font-semibold text-heading">
              Why Choose Our Peptide Pens?
            </h3>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-center gap-2 text-sm font-medium text-heading">
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="shrink-0 text-primary-dark"
                    aria-hidden="true"
                  />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
