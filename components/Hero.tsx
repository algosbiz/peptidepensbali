import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import Button from "./Button";
import WhatsAppButton from "./WhatsAppButton";
import { CATALOGUE_URL } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

// The wide photo banner with the main headline (the page's only H1).
// The photo fades to white on the left so the text stays easy to read.
export default function Hero() {
  return (
    <section className="pb-14 lg:pb-20">
      <Container>
        <div className="relative isolate overflow-hidden rounded-3xl bg-accent ring-1 ring-line/70">
          <Image
            src="/images/hero/peptide-pen-bali.webp"
            alt="A white and gold disposable peptide pen on marble under palm leaf shadows"
            fill
            sizes="(min-width: 1280px) 1216px, calc(100vw - 40px)"
            className="-z-20 object-cover object-[70%_55%]"
          />
          <div className="absolute inset-0 -z-10 bg-white/80 md:bg-transparent md:bg-linear-to-r md:from-white md:via-white/85 md:to-white/0" />

          <div className="max-w-xl px-6 py-12 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            <p className="eyebrow">Atlas Longevity — Bali</p>
            <h1 className="mt-4 font-heading text-5xl leading-[0.95] font-semibold tracking-[-0.045em] text-heading sm:text-6xl lg:text-7xl">
              Peptide <span className="whitespace-nowrap text-primary-dark italic">Pens Bali</span>
            </h1>
            <p className="mt-5 font-heading text-lg leading-snug font-medium text-heading/85 sm:text-xl">
              Premium Disposable Peptide Pens Delivered Across Bali
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {/* Goes to the full Atlas Longevity catalogue (CATALOGUE_URL in lib/site.ts). */}
              <Button href={CATALOGUE_URL}>
                Browse Peptide Pens
                <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
              </Button>
              <WhatsAppButton message={WHATSAPP_MESSAGES.general} variant="outline">
                Contact Our Team
              </WhatsAppButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
