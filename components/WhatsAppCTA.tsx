import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { CATALOGUE_URL } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export default function WhatsAppCTA() {
  return (
    <section className="bg-secondary py-20 text-white lg:py-28">
      <Container className="text-center">
        <p className="eyebrow text-primary">Contact us now</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-heading text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
          Order Peptide Pens in Bali Today
        </h2>
        <div className="mx-auto mt-6 max-w-2xl space-y-3 text-lg leading-relaxed text-white/70">
          <p>
            Whether you’re looking for convenient disposable peptide pens, injectable peptides or
            selected nasal spray formulations, Atlas Longevity provides fast and discreet delivery
            across Bali.
          </p>
          <p>Browse our growing range of peptide pens or contact our team for more information.</p>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <WhatsAppButton message={WHATSAPP_MESSAGES.general}>Chat on WhatsApp</WhatsAppButton>
          <Button href={CATALOGUE_URL} variant="light">
            Explore the full range
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
