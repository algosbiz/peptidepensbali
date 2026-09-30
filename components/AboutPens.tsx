import Image from "next/image";
import { AirplaneTilt, Archive, Backpack, Cube, SealCheck } from "@phosphor-icons/react/ssr";
import Container from "./Container";

// "Many customers choose peptide pens because they are:"
const qualities = [
  "Ready to use",
  "Compact and portable",
  "Convenient for travel",
  "Easy to store",
  "Designed for straightforward administration",
  "Suitable for busy lifestyles",
];

// "Many customers appreciate that peptide pens are:"
const appreciated = [
  "Compact",
  "Portable",
  "Ready to use",
  "Convenient for travel",
  "Easy to carry",
  "Simple to store",
  "Suitable for busy lifestyles",
];

// "Why Choose Disposable Peptide Pens?"
const advantages = [
  { icon: Cube, title: "Convenient", text: "Everything is contained within a single device." },
  { icon: Backpack, title: "Portable", text: "Ideal for customers travelling throughout Bali." },
  { icon: Archive, title: "Easy Storage", text: "Compact design makes storage simple." },
  {
    icon: SealCheck,
    title: "Consistent Delivery",
    text: "Pens provide a practical solution for selected peptide products.",
  },
  {
    icon: AirplaneTilt,
    title: "Travel Friendly",
    text: "Many visitors to Bali appreciate the convenience of peptide pens while staying in hotels, villas and resorts.",
  },
];

export default function AboutPens() {
  return (
    <section id="about" className="py-20 lg:py-28">
      {/* What are peptide pens? */}
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:col-span-5 lg:aspect-[4/5]">
          <Image
            src="/images/about/discreet-packaging.webp"
            alt="A discreetly wrapped peptide pen package with a frangipani flower on marble"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow">Introduction</p>
          <h2 className="section-title mt-4">What Are Peptide Pens?</h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            Disposable peptide pens combine the peptide solution and delivery device into one
            convenient product.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-body">
            Many customers choose peptide pens because they are:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {qualities.map((quality) => (
              <li
                key={quality}
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3.5 font-medium text-heading"
              >
                <span aria-hidden="true" className="h-0.5 w-4 shrink-0 bg-primary" />
                {quality}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-body">
            Peptide pens have become increasingly popular among customers seeking a simple
            alternative to traditional vial-based products.
          </p>
        </div>
      </Container>

      {/* Why choose disposable peptide pens? */}
      <Container className="mt-24 lg:mt-32">
        <p className="eyebrow">Speciality</p>
        <h2 className="section-title mt-4 max-w-3xl">Why Choose Disposable Peptide Pens?</h2>
        <p className="mt-5 text-lg text-body">Disposable peptide pens offer several advantages.</p>

        {/* Five cards: three in the first row, two wider ones in the second. */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const isLast = index === advantages.length - 1;
            return (
              <div
                key={advantage.title}
                className={`rounded-2xl border border-line bg-white p-7 ${
                  index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                } ${isLast ? "sm:col-span-2 lg:col-span-3" : ""}`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary-light text-primary-dark">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-8 font-heading text-xl font-semibold text-heading">
                  {advantage.title}
                </h3>
                <p className="mt-2 leading-relaxed text-body">{advantage.text}</p>
              </div>
            );
          })}

        </div>

        {/* Why more customers are choosing peptide pens: a gold band under the cards */}
        <div className="mt-4 grid gap-8 rounded-3xl bg-primary p-6 text-secondary sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-secondary">Why Atlas Longevity?</p>
            <h3 className="mt-4 font-heading text-2xl leading-snug font-semibold sm:text-3xl">
              Why More Customers Are Choosing Peptide Pens
            </h3>
            <p className="mt-4 leading-relaxed text-secondary/85">
              Disposable peptide pens continue to grow in popularity because they offer a convenient
              alternative for selected peptide products.
            </p>
          </div>
          <div className="lg:col-span-7">
            <p className="font-medium">Many customers appreciate that peptide pens are:</p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {appreciated.map((item) => (
                <li
                  key={item}
                  className="pill bg-white/45"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-secondary/85">
              For visitors travelling around Bali, peptide pens can be an especially convenient
              option due to their compact design.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
