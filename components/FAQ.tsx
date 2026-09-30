import { Plus } from "@phosphor-icons/react/ssr";
import Container from "./Container";
import { faqs } from "@/data/faq";

// Structured data lets search engines understand these questions and answers.
// It is built from the same list as the visible FAQ, so the two never disagree.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.link ? `${faq.answer} ${faq.link.text}` : faq.answer,
    },
  })),
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-28">
      <Container>
        <div className="text-center">
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-4">Frequently Asked Questions</h2>
        </div>

        {/*
          Uses the browser's built-in <details> element, so no JavaScript is needed.
          Giving every item the same name="faq" means only one answer is open at a time.
        */}
        <div className="mt-12 grid gap-3 lg:grid-cols-2 lg:items-start">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              name="faq"
              className="group rounded-2xl border border-line bg-white transition-colors open:border-primary/50 open:bg-accent"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left font-heading font-medium text-heading">
                {faq.question}
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-accent text-primary-dark transition-colors group-open:bg-primary group-open:text-secondary">
                  <Plus
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                    className="transition-transform duration-300 group-open:rotate-45"
                  />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-body">
                {faq.answer}
                {faq.link && (
                  <>
                    {" "}
                    <a href={faq.link.href} className="text-link">
                      {faq.link.text}
                    </a>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
    </section>
  );
}
