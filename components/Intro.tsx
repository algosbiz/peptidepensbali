import { CheckCircle } from "@phosphor-icons/react/ssr";
import Container from "./Container";

// The checklist in the dark card on the right.
const reasons = [
  "Ready-to-use disposable pens",
  "Fast delivery throughout Bali",
  "Discreet packaging",
  "Convenient administration",
  "Wide range of peptide products",
  "Responsive customer support",
  "Trusted Atlas Longevity service",
];

export default function Intro() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="section-title">Looking for peptide pens in Bali?</h2>
          <p className="mt-7 text-xl leading-relaxed text-heading/85 sm:text-2xl sm:leading-relaxed">
            Atlas Longevity provides fast and discreet delivery of premium disposable peptide pens
            throughout Bali. Whether you’re staying in Canggu, Seminyak, Ubud, Sanur, Uluwatu or
            anywhere else on the island, we offer a convenient way to access a wide range of
            peptide pen products.
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
            Our catalogue includes weight management peptide pens, recovery peptide pens and
            selected wellness products, alongside injectable peptides and nasal spray formulations.
          </p>
        </div>

        <aside className="rounded-3xl bg-secondary p-8 text-white sm:p-10 lg:col-span-5">
          <h3 className="font-heading text-2xl font-semibold">Why Choose Our Peptide Pens?</h3>
          <ul className="mt-6 divide-y divide-white/10">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-center gap-3 py-3.5 text-white/85">
                <CheckCircle size={22} weight="fill" className="shrink-0 text-primary" aria-hidden="true" />
                {reason}
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </section>
  );
}
