import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

// Always-visible WhatsApp shortcut in the bottom-right corner, on laptops and desktops.
// Phones and tablets get the bottom toolbar instead (components/MobileToolbar.tsx),
// which has its own WhatsApp button.
export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Peptide Pens Bali on WhatsApp"
      className="fixed right-8 bottom-8 z-30 hidden h-14 w-14 place-items-center rounded-full bg-linear-to-b from-button to-button-dark text-white shadow-button ring-4 ring-white transition duration-200 hover:scale-105 hover:from-button-dark hover:to-button-dark lg:grid"
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
