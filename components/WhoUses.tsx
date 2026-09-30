import Image from "next/image";
import Container from "./Container";

const customers = [
  "Fitness enthusiasts",
  "Digital nomads",
  "Active travellers",
  "Wellness-focused individuals",
  "Recovery-focused customers",
  "Entrepreneurs",
  "Bodybuilders",
  "Biohackers",
  "Long-term Bali residents",
  "Health-conscious visitors",
];

export default function WhoUses() {
  return (
    <section className="py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Who Uses</p>
          <h2 className="section-title mt-4">Who Uses Peptide Pens?</h2>
          <p className="mt-6 text-lg leading-relaxed text-body">
            Peptide pens are popular with a wide range of customers, including:
          </p>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {customers.map((customer) => (
              <li
                key={customer}
                className="pill bg-accent text-heading"
              >
                {customer}
              </li>
            ))}
          </ul>
          <p className="mt-7 leading-relaxed text-body">
            Many customers prefer disposable pens because they integrate easily into active
            lifestyles.
          </p>
        </div>

        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <Image
            src="/images/about/peptide-pen-travel-case.webp"
            alt="Two white and gold peptide pens in an insulated travel case"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
