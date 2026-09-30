import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react/ssr";
import Container from "./Container";

// "Customers choose Atlas Longevity because we offer:"
const offers = [
  "Fast delivery across Bali",
  "Large selection of disposable peptide pens",
  "Wide peptide catalogue",
  "Nasal spray peptide options",
  "Professional customer support",
  "Discreet packaging",
  "Delivery to hotels, villas and private residences",
  "Convenient ordering process",
];

// "Atlas Longevity has become one of Bali's trusted peptide delivery providers through a focus on:"
const focusPoints = [
  "Fast delivery",
  "Large peptide catalogue",
  "Disposable peptide pens",
  "Nasal spray formulations",
  "Responsive customer support",
  "Professional service",
  "Discreet packaging",
];

// "Our team can assist with:"
const supportTopics = [
  "Product availability",
  "Delivery areas",
  "Ordering process",
  "Disposable peptide pens",
  "Nasal spray products",
  "General product information",
];

export default function WhyAtlas() {
  return (
    <section id="why-us" className="bg-accent py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow">Why Atlas</p>
            <h2 className="section-title mt-4">Why Choose Atlas Longevity for Peptide Pens?</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-body">
              <p>
                Atlas Longevity is committed to providing a professional and convenient peptide
                delivery service throughout Bali.
              </p>
              <p>
                Our disposable peptide pens have become increasingly popular with customers looking
                for a practical, ready-to-use option that fits around busy lifestyles, travel and
                wellness routines.
              </p>
              <p>
                Whether you’re living in Bali or visiting for a short stay, we provide fast delivery
                together with responsive customer support.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="font-medium text-heading">Customers choose Atlas Longevity because we offer:</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {offers.map((offer) => (
              <li
                key={offer}
                className="flex items-start gap-3 rounded-2xl bg-white p-5 font-medium text-heading"
              >
                <CheckCircle
                  size={22}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {offer}
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {/* Why choose Atlas Longevity? A dark band with the brand's focus points */}
      <Container className="mt-16 lg:mt-20">
        <div className="grid gap-8 rounded-3xl bg-secondary p-6 text-white sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-primary">Why Us</p>
            <h3 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
              Why Choose Atlas Longevity?
            </h3>
            <p className="mt-4 leading-relaxed text-white/70">
              Atlas Longevity has become one of Bali’s trusted peptide delivery providers through a
              focus on:
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2.5">
              {focusPoints.map((point) => (
                <li key={point} className="pill flex items-center gap-2 bg-white/10">
                  <CheckCircle
                    size={18}
                    weight="fill"
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-white/70">
              Whether you’re visiting Bali or living here permanently, we strive to make ordering
              peptide products as simple and convenient as possible.
            </p>
          </div>
        </div>
      </Container>

      {/* Customer support: a full-width card under the reasons */}
      <Container className="mt-4">
        <div className="grid overflow-hidden rounded-3xl bg-white md:grid-cols-12">
          <div className="relative aspect-[16/9] md:col-span-4 md:aspect-auto">
            <Image
              src="/images/support/customer-support.webp"
              alt="Two people shaking hands"
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 sm:p-10 md:col-span-8">
            <p className="eyebrow">Support</p>
            <h3 className="mt-3 font-heading text-2xl font-semibold text-heading sm:text-3xl">
              Customer Support
            </h3>
            <p className="mt-3 leading-relaxed text-body">
              Excellent customer service is one of our priorities. Our team can assist with:
            </p>
            <ul className="mt-5 grid gap-x-8 gap-y-3 text-heading sm:grid-cols-2 lg:grid-cols-3">
              {supportTopics.map((topic) => (
                <li key={topic} className="flex items-start gap-2.5">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {topic}
                </li>
              ))}
            </ul>
            <p className="mt-6 leading-relaxed text-body">
              We aim to provide prompt communication before, during and after every order.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
