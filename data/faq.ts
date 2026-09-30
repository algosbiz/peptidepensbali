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
