// Questions and answers for the FAQ section.
// "link" is optional: add it when the answer should end with a clickable link.

export type Faq = {
  question: string;
  answer: string;
  link?: { text: string; href: string };
};

export const faqs: Faq[] = [
  {
    question: "What is a disposable peptide pen?",
    answer:
      "A disposable peptide pen is a ready-to-use delivery device that combines the peptide product and pen into one convenient unit.",
  },
  {
    question: "Which peptide pens are available?",
    answer:
      "Atlas Longevity stocks selected disposable peptide pens, including options for weight management, recovery and wellness.",
  },
  {
    question: "Where can I buy peptides in Bali?",
    answer:
      "Right here. Add peptide pens, nasal sprays or bundles to the cart and check out online, or order through WhatsApp. Atlas Longevity delivers throughout Bali.",
  },
  {
    question: "Are Retatrutide and Tirzepatide pens available in Bali?",
    answer:
      "Yes. Retatrutide and Tirzepatide pens are available in several strengths, alongside other weight management pens such as Cagrilintide and AOD-9604.",
  },
  {
    question: "How much do peptide pens cost in Bali?",
    answer:
      "Prices are shown in Indonesian rupiah on each product and depend on the dose and pen type (disposable pen, reusable pen or cartridge). For products without a listed price, ask us on WhatsApp.",
  },
  {
    question: "How do I order peptide pens online?",
    answer:
      "Choose the dose and pen type, add the product to the cart, then select Proceed to Checkout to pay in the Atlas Longevity online shop. You can also send your order through WhatsApp.",
  },
  {
    question: "Do you deliver peptide pens across Bali?",
    answer:
      "Yes. Delivery is available throughout Bali, including Canggu, Seminyak, Ubud, Sanur, Jimbaran, Nusa Dua and Uluwatu.",
  },
  {
    question: "Can peptide pens be delivered to hotels?",
    answer:
      "Yes. Orders can be delivered directly to hotels, villas, apartments and private residences across Bali.",
  },
  {
    question: "Are peptide pens travel friendly?",
    answer:
      "Many customers appreciate the compact size and convenience of disposable peptide pens while travelling.",
  },
  {
    question: "Do you also sell injectable peptides?",
    answer: "Yes. Atlas Longevity offers an extensive range of injectable peptide products.",
  },
  {
    question: "Are nasal spray peptides available?",
    answer: "Yes. Selected compounds are available in nasal spray formulations.",
  },
  {
    question: "Why choose Atlas Longevity?",
    answer:
      "Customers value our large product catalogue, fast delivery, responsive customer support and convenient ordering process.",
  },
];
