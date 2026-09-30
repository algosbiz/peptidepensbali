import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// The top banner: a wide photo with a white card that overlaps its bottom edge
// and holds the headline, like a magazine cover.
export default function Hero() {
  return (
    <section id="top" className="pt-4 lg:pt-6">
      <Container>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl sm:aspect-[16/9] lg:aspect-[2.4/1]">
          <Image
            src="/images/hero/peptide-pen-bali.webp"
            alt="A white and gold disposable peptide pen on marble under palm leaf shadows"
            fill
            preload
            sizes="(min-width: 1280px) 1216px, calc(100vw - 40px)"
            className="object-cover object-[50%_58%]"
          />
        </div>

        {/* The negative top margin pulls the card up so it overlaps the photo. */}
        <div className="fade-up relative -mt-16 mr-3 ml-3 rounded-3xl border border-line bg-white p-7 shadow-card sm:-mt-24 sm:mr-auto sm:ml-8 sm:max-w-2xl sm:p-10 lg:-mt-40 lg:ml-12">
          <p className="eyebrow">Atlas Longevity — Bali</p>

          <h1 className="mt-4 font-heading text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-heading sm:text-6xl lg:text-7xl">
            Peptide <span className="text-primary italic">Pens Bali</span>
          </h1>

          <p className="mt-5 font-heading text-lg leading-snug font-medium text-heading/85 sm:text-xl">
            Premium Disposable Peptide Pens Delivered Across Bali
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button href="#pens">
              Browse Peptide Pens
              <ArrowDown size={18} weight="bold" aria-hidden="true" />
            </Button>
            <WhatsAppButton message={WHATSAPP_MESSAGES.general} variant="outline">
              Contact Our Team
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
