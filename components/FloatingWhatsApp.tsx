import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import { WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/whatsapp";

// Always-visible WhatsApp shortcut in the bottom-right corner.
// The bottom offset includes the phone's "safe area", so it never sits under
// the iPhone home bar or Android navigation.
export default function FloatingWhatsApp() {
  return (
    <a
      href={getWhatsAppUrl(WHATSAPP_MESSAGES.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Peptide Pens Bali on WhatsApp"
      className="fixed right-5 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-30 grid h-14 w-14 place-items-center rounded-full bg-linear-to-b from-button to-button-dark text-white shadow-button ring-4 ring-white transition duration-200 hover:scale-105 hover:from-button-dark hover:to-button-dark sm:right-8 sm:bottom-8"
    >
      <WhatsappLogo size={30} weight="fill" aria-hidden="true" />
    </a>
  );
}
