import Image from "next/image";
import { ArrowUpRight, Truck, WhatsappLogo } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import { categories } from "@/data/products";
import { CATALOGUE_URL, NAV_LINKS } from "@/lib/site";
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

const columnTitle = "text-xs font-semibold tracking-[0.2em] text-heading uppercase";
const linkStyle = "text-sm text-body transition-colors hover:text-primary-dark";

// A shop-style footer: the logo with the summary text, then three columns of links
// (the page sections, the catalogue categories and how to reach the team).
export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <Image
            src="/images/logo/peptide-pens-bali-logo.png"
            alt="Peptide Pens Bali"
            width={184}
            height={60}
          />
          {/* Summary paragraph from the original site, kept for search engines. */}
          <p className="mt-6 text-sm leading-relaxed text-body">
            Atlas Longevity supplies premium disposable peptide pens throughout Bali with fast,
            discreet delivery to hotels, villas, apartments, resorts and private residences. Our
            collection includes weight management peptide pens, recovery peptide pens and wellness
            peptide pens, alongside injectable peptides and selected nasal spray formulations.
            Delivery is available across Canggu, Seminyak, Ubud, Sanur, Uluwatu, Jimbaran, Nusa
            Dua, Denpasar, Kerobokan, Berawa, Pererenan, Bingin, Padang Padang, Amed, Lovina,
            Sidemen and many other areas throughout Bali.
          </p>
        </div>

        <nav aria-labelledby="footer-information" className="lg:col-span-2">
          <h2 id="footer-information" className={columnTitle}>
            Information
          </h2>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkStyle}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* On tablets this column moves below the other two, where it has room for two columns. */}
        <nav
          aria-labelledby="footer-shop"
          className="sm:order-last sm:col-span-2 lg:order-none lg:col-span-4"
        >
          <h2 id="footer-shop" className={columnTitle}>
            Shop by category
          </h2>
          {/* Two columns, read from top to bottom */}
          <ul className="mt-5 columns-2 gap-x-6">
            {categories.map((category) => (
              <li key={category.id} className="mb-3 break-inside-avoid">
                <a href={`#category-${category.id}`} className={linkStyle}>
                  {category.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className={columnTitle}>Customer service</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a
                href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex gap-2.5"
              >
                <WhatsappLogo
                  size={18}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-primary-dark"
                  aria-hidden="true"
                />
                <span>
                  <span className="block font-semibold text-heading transition-colors group-hover:text-primary-dark">
                    WhatsApp
                  </span>
                  <span className="block text-body">{WHATSAPP_DISPLAY_NUMBER}</span>
                </span>
              </a>
            </li>
            <li className="flex gap-2.5 text-body">
              <Truck size={18} className="mt-0.5 shrink-0 text-primary-dark" aria-hidden="true" />
              Fast, discreet delivery across Bali
            </li>
            <li>
              <a href={CATALOGUE_URL} className="group flex gap-2.5">
                <ArrowUpRight
                  size={18}
                  weight="bold"
                  className="mt-0.5 shrink-0 text-primary-dark"
                  aria-hidden="true"
                />
                <span className="text-body transition-colors group-hover:text-primary-dark">
                  Full catalogue: Peptides Bali Online
                </span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="bg-accent">
        <Container className="py-5 text-center text-sm text-body">
          © {new Date().getFullYear()} Atlas Longevity. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
