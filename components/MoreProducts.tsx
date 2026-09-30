import { ArrowUpRight, Drop, Syringe } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import { CATALOGUE_URL } from "@/lib/site";

const injectableCategories = [
  "Recovery peptides",
  "Weight management peptides",
  "Performance peptides",
  "Longevity peptides",
  "Cognitive support peptides",
  "Research peptides",
];

export default function MoreProducts() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <p className="eyebrow">Categories</p>
        <h2 className="section-title mt-4 max-w-3xl">More Than Just Peptide Pens</h2>
        <p className="mt-5 text-lg text-body">
          We provide one of Bali’s broadest selections of peptide products.
        </p>

        <div className="mt-12 grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Injectable peptides: the large card on the left */}
          <div className="flex flex-col justify-between gap-10 rounded-3xl border border-line bg-white p-6 sm:p-10 lg:col-span-2 lg:row-span-2">
            <div>
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-light text-primary-dark">
                <Syringe size={24} aria-hidden="true" />
              </span>
              <p className="eyebrow mt-8">Injectable Peptides</p>
              <h3 className="mt-3 font-heading text-3xl font-semibold text-heading">
                Injectable Peptides Also Available
              </h3>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-heading/80">
                A comprehensive catalogue covering recovery, performance, longevity and wellness
                categories.
              </p>
              <p className="mt-3 max-w-xl leading-relaxed text-body">
                In addition to disposable peptide pens, Atlas Longevity offers a comprehensive
                selection of injectable peptide products across multiple categories.
              </p>
            </div>
            <div>
              <p className="font-medium text-heading">Available product categories include:</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {injectableCategories.map((category) => (
                  <li
                    key={category}
                    className="pill bg-accent text-heading"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nasal sprays */}
          <div className="rounded-3xl bg-accent p-8">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary-dark">
              <Drop size={24} aria-hidden="true" />
            </span>
            <p className="eyebrow mt-8">Nasal Sprays</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-heading">
              Peptide Nasal Sprays
            </h3>
            <p className="mt-3 leading-relaxed text-body">
              Selected compounds available as nasal sprays including:
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["Selank Nasal Spray", "Semax Nasal Spray"].map((spray) => (
                <li
                  key={spray}
                  className="pill bg-white text-heading"
                >
                  {spray}
                </li>
              ))}
            </ul>
          </div>

          {/* Research peptides */}
          <a
            href={CATALOGUE_URL}
            className="group flex flex-col justify-between gap-8 rounded-3xl bg-secondary p-8 text-white"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold">Research Peptides</h3>
              <p className="mt-3 leading-relaxed text-white/75">
                One of Bali’s largest peptide catalogues covering a broad range of products.
              </p>
            </div>
            <span className="flex items-center gap-2 font-semibold text-primary">
              Explore the full range
              <ArrowUpRight
                size={18}
                weight="bold"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
