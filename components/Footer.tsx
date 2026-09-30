import Image from "next/image";
import Container from "./Container";
import { CATALOGUE_URL, NAV_LINKS } from "@/lib/site";
import { WHATSAPP_DISPLAY_NUMBER, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-white">
      <Container className="py-16 text-center">
        <Image
          src="/images/logo/peptide-pens-bali-logo.png"
          alt="Peptide Pens Bali"
          width={220}
          height={72}
          className="mx-auto"
        />

        {/* Summary paragraph from the original site, kept for search engines. */}
        <p className="mx-auto mt-8 max-w-4xl leading-relaxed text-body">
          Atlas Longevity supplies premium disposable peptide pens throughout Bali with fast,
          discreet delivery to hotels, villas, apartments, resorts and private residences. Our
          collection includes weight management peptide pens, recovery peptide pens and wellness
          peptide pens, alongside injectable peptides and selected nasal spray formulations.
          Delivery is available across Canggu, Seminyak, Ubud, Sanur, Uluwatu, Jimbaran, Nusa Dua,
          Denpasar, Kerobokan, Berawa, Pererenan, Bingin, Padang Padang, Amed, Lovina, Sidemen and
          many other areas throughout Bali.
        </p>

        <nav aria-label="Footer" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3 font-medium text-heading">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary-dark">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-3 text-body">
          <li>
            <a
              href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary-dark"
            >
              WhatsApp: {WHATSAPP_DISPLAY_NUMBER}
            </a>
          </li>
          <li>
            <a href={CATALOGUE_URL} className="transition-colors hover:text-primary-dark">
              Full catalogue: Peptides Bali Online
            </a>
          </li>
        </ul>
      </Container>

      <div className="bg-accent">
        {/* Extra right padding keeps the text clear of the floating WhatsApp button. */}
        <Container className="py-5 pr-24 text-center text-sm text-body sm:pr-8">
          © {new Date().getFullYear()} Atlas Longevity. All rights reserved.
        </Container>
      </div>
    </footer>
  );
}
