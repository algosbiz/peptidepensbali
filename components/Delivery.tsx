import Image from "next/image";
import { MapPin, Package } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import WhatsAppButton from "./WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// Delivery areas and places. Add or remove names here.
const areas = [
  "Canggu",
  "Berawa",
  "Pererenan",
  "Seminyak",
  "Kerobokan",
  "Umalas",
  "Jimbaran",
  "Uluwatu",
  "Bingin",
  "Padang Padang",
  "Nusa Dua",
  "Denpasar",
  "Ubud",
  "Amed",
  "Sidemen",
  "Lovina",
  "Munduk",
  "Sanur",
  "Legian",
  "Kuta",
];

const destinations = [
  "Hotels",
  "Villas",
  "Resorts",
  "Apartments",
  "Offices",
  "Private residences",
  "Coworking spaces",
];

export default function Delivery() {
  return (
    <section id="delivery" className="bg-accent py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          {/* The outer box stays in view while scrolling; the inner box holds the photo. */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
              <Image
                src="/images/delivery/peptide-pen-delivery-bali.webp"
                alt="A courier on a scooter delivering a gift-wrapped peptide pen order in Bali"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="eyebrow">Delivery</p>
          <h2 className="section-title mt-4">Peptide Pens Delivered Throughout Bali</h2>
          <p className="mt-5 text-lg text-body">Atlas Longevity delivers peptide pens across:</p>

          <ul className="mt-8 columns-2 gap-x-8 sm:columns-3 lg:columns-2 xl:columns-3">
            {areas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 py-2 font-heading text-lg font-medium text-heading break-inside-avoid"
              >
                <MapPin size={16} weight="fill" className="shrink-0 text-primary" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>

          <h3 className="mt-10 font-heading text-xl font-semibold text-heading">
            Orders can be delivered directly to:
          </h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {destinations.map((place) => (
              <li
                key={place}
                className="pill border border-primary/40 bg-white text-heading"
              >
                {place}
              </li>
            ))}
          </ul>

          <p className="mt-8 flex items-center gap-3 font-medium text-heading">
            <Package size={22} className="text-primary-dark" aria-hidden="true" />
            Every order is packaged discreetly.
          </p>

          <WhatsAppButton message={WHATSAPP_MESSAGES.delivery} variant="dark" className="mt-9">
            Check Delivery Availability
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
