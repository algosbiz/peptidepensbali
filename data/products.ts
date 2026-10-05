// Everything in the "Disposable Peptide Pens Available" section comes from this file.
// Products live here, separate from the React components, so they can be updated
// without touching any layout code.
// Product names, doses and photos follow the full catalogue at peptidesbali.online.

// CATEGORIES: the numbered rows of the catalogue, in the order they appear.
//   label: short name used on the category buttons at the top of the catalogue
//   note:  optional; adds a dark card after the products in that row
export const categories = [
  {
    id: "weight-management",
    number: "01",
    label: "Weight Management",
    title: "Weight Management Pens",
    intro: "Popular options include:",
  },
  {
    id: "recovery",
    number: "02",
    label: "Recovery",
    title: "Recovery Pens",
    intro: "Available options include:",
  },
  {
    id: "wellness",
    number: "03",
    label: "Wellness",
    title: "Wellness Pens",
    intro: "Including:",
  },
  {
    id: "longevity",
    number: "04",
    label: "Longevity",
    title: "Longevity Pens",
    intro: "Available options include:",
  },
  {
    id: "performance",
    number: "05",
    label: "Muscle & Performance",
    title: "Muscle Growth & Performance Pens",
    intro: "Available options include:",
  },
  {
    id: "focus-sleep",
    number: "06",
    label: "Focus & Sleep",
    title: "Focus & Sleep Pens",
    intro: "Available options include:",
  },
  {
    id: "libido",
    number: "07",
    label: "Libido & Sexual Wellness",
    title: "Libido & Sexual Wellness Pens",
    intro: "Available options include:",
    note: "Our range continues to expand as new products become available.",
  },
  {
    id: "nasal-sprays",
    number: "08",
    label: "Nasal Sprays",
    title: "Nasal Spray Peptides",
    intro: "Atlas Longevity also supplies selected peptide nasal sprays. Popular products include:",
    note: "Many customers choose nasal sprays as an alternative delivery option for selected compounds.",
  },
  {
    id: "bundles",
    number: "09",
    label: "Bundles",
    title: "Bundles",
    intro:
      "Save with expertly selected peptide bundles for weight management, recovery, longevity, cognitive performance and skin wellness.",
  },
  {
    id: "protocols",
    number: "10",
    label: "Peptide Protocols",
    title: "Peptide Protocols",
    intro: "Multi-product stacks, grouped by goal:",
  },
  {
    id: "accessories",
    number: "11",
    label: "Accessories & Services",
    title: "Pen Accessories & Services",
    intro: "Injection pens, cartridges, storage and reconstitution:",
  },
];

// PRODUCTS
// To add a product:
//   1. Copy one of the blocks below and paste it into the list (products show in
//      the order they are listed, inside their category).
//   2. Give it a NEW id number that no product has used before, a name, and the id of
//      its category (see above). Never change or reuse an id: visitors' saved carts
//      remember products by their id.
//   3. Put its image in /public/images/products/ and update the "image" path.
// The quantity picker, Add to cart button and WhatsApp link are created automatically.
//
// Optional fields:
//   tag:     small label above the name (used for the protocol goal, e.g. "Fat Loss Stacks")
//   options: dose choices, e.g. [{ label: "5 mg" }, { label: "10 mg" }]. Give an option
//            its own "image" if it has a different photo. With one option the dose is
//            simply shown on the card; with several, visitors pick one before adding.

export type ProductOption = {
  label: string;
  image?: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  format: string;
  tag?: string;
  image: string;
  options?: ProductOption[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Retatrutide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/retatrutide-pen-5-mg.webp",
    options: [
      { label: "5 mg", image: "/images/products/retatrutide-pen-5-mg.webp" },
      { label: "10 mg", image: "/images/products/retatrutide-pen-10-mg.webp" },
      { label: "20 mg", image: "/images/products/retatrutide-pen-20-mg.webp" },
      { label: "30 mg", image: "/images/products/retatrutide-pen-30-mg.webp" },
    ],
  },
  {
    id: 2,
    name: "Tirzepatide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/tirzepatide-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/tirzepatide-pen-10-mg.webp" },
      { label: "40 mg", image: "/images/products/tirzepatide-pen-40-mg.webp" },
    ],
  },
  {
    id: 3,
    name: "Semaglutide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/semaglutide-pen.webp",
  },
  {
    id: 10,
    name: "Retatrutide + Cagrilintide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/retatrutide-cagrilintide-pen-10-mg-2-mg.webp",
    options: [
      { label: "10 mg + 2 mg", image: "/images/products/retatrutide-cagrilintide-pen-10-mg-2-mg.webp" },
      { label: "20 mg + 4 mg", image: "/images/products/retatrutide-cagrilintide-pen-20-mg-4-mg.webp" },
      { label: "30 mg + 6 mg", image: "/images/products/retatrutide-cagrilintide-pen-30-mg-6-mg.webp" },
    ],
  },
  {
    id: 11,
    name: "Tesamorelin Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/tesamorelin-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/tesamorelin-pen-10-mg.webp" },
      { label: "20 mg", image: "/images/products/tesamorelin-pen-20-mg.webp" },
    ],
  },
  {
    id: 12,
    name: "Tesamorelin + Ipamorelin Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/tesamorelin-ipamorelin-pen.webp",
    options: [{ label: "10 mg + 5 mg" }],
  },
  {
    id: 13,
    name: "AOD-9604 Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/aod-9604-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 4,
    name: "BPC-157 Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/bpc-157-pen-5-mg.webp",
    options: [
      { label: "5 mg", image: "/images/products/bpc-157-pen-5-mg.webp" },
      { label: "10 mg", image: "/images/products/bpc-157-pen-10-mg.webp" },
    ],
  },
  {
    id: 5,
    name: "TB-500 Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/tb-500-pen-5-mg.webp",
    options: [
      { label: "5 mg", image: "/images/products/tb-500-pen-5-mg.webp" },
      { label: "10 mg", image: "/images/products/tb-500-pen-10-mg.webp" },
    ],
  },
  {
    id: 6,
    name: "MOTS-C Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/mots-c-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/mots-c-pen-10-mg.webp" },
      { label: "40 mg", image: "/images/products/mots-c-pen-40-mg.webp" },
    ],
  },
  {
    id: 14,
    name: "Wolverine Blend Pen",
    category: "recovery",
    format: "TB-500 + BPC-157 blend pen",
    image: "/images/products/wolverine-blend-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/wolverine-blend-pen-10-mg.webp" },
      { label: "20 mg", image: "/images/products/wolverine-blend-pen-20-mg.webp" },
      { label: "30 mg", image: "/images/products/wolverine-blend-pen-30-mg.webp" },
    ],
  },
  {
    id: 15,
    name: "KPV Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/kpv-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 7,
    name: "GHK-Cu Pen",
    category: "wellness",
    format: "Disposable peptide pen",
    image: "/images/products/ghk-cu-pen-50-mg.webp",
    options: [
      { label: "50 mg", image: "/images/products/ghk-cu-pen-50-mg.webp" },
      { label: "100 mg", image: "/images/products/ghk-cu-pen-100-mg.webp" },
    ],
  },
  {
    id: 16,
    name: "Glutathione Pen",
    category: "wellness",
    format: "Disposable peptide pen",
    image: "/images/products/glutathione-pen.webp",
    options: [{ label: "1500 mg" }],
  },
  {
    id: 17,
    name: "NAD+ Pen",
    category: "longevity",
    format: "Disposable peptide pen",
    image: "/images/products/nad-pen-500-mg.webp",
    options: [
      { label: "500 mg", image: "/images/products/nad-pen-500-mg.webp" },
      { label: "1000 mg", image: "/images/products/nad-pen-1000-mg.webp" },
    ],
  },
  {
    id: 18,
    name: "Epitalon Pen",
    category: "longevity",
    format: "Disposable peptide pen",
    image: "/images/products/epitalon-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/epitalon-pen-10-mg.webp" },
      { label: "50 mg", image: "/images/products/epitalon-pen-50-mg.webp" },
      { label: "100 mg", image: "/images/products/epitalon-pen-100-mg.webp" },
    ],
  },
  {
    id: 19,
    name: "SS-31 Pen",
    category: "longevity",
    format: "Disposable peptide pen",
    image: "/images/products/ss-31-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/ss-31-pen-10-mg.webp" },
      { label: "50 mg", image: "/images/products/ss-31-pen-50-mg.webp" },
    ],
  },
  {
    id: 20,
    name: "Glow Plus Pen",
    category: "longevity",
    format: "GHK-Cu + BPC-157 + TB-500 blend pen",
    image: "/images/products/glow-plus-pen.webp",
    options: [{ label: "70 mg" }],
  },
  {
    id: 21,
    name: "KLOW Pen",
    category: "longevity",
    format: "GHK-Cu + KPV + BPC-157 + TB-500 blend pen",
    image: "/images/products/klow-pen.webp",
    options: [{ label: "80 mg" }],
  },
  {
    id: 22,
    name: "CJC-1295 No DAC + Ipamorelin Pen",
    category: "performance",
    format: "Disposable peptide pen",
    image: "/images/products/cjc-1295-no-dac-ipamorelin-pen.webp",
    options: [{ label: "5 mg + 5 mg" }],
  },
  {
    id: 23,
    name: "Ipamorelin Pen",
    category: "performance",
    format: "Disposable peptide pen",
    image: "/images/products/ipamorelin-pen-5-mg.webp",
    options: [
      { label: "5 mg", image: "/images/products/ipamorelin-pen-5-mg.webp" },
      { label: "10 mg", image: "/images/products/ipamorelin-pen-10-mg.webp" },
    ],
  },
  {
    id: 24,
    name: "GHRP-6 Pen",
    category: "performance",
    format: "Disposable peptide pen",
    image: "/images/products/ghrp-6-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 25,
    name: "IGF-LR3 Pen",
    category: "performance",
    format: "Disposable peptide pen",
    image: "/images/products/igf-lr3-pen.webp",
    options: [{ label: "1 mg" }],
  },
  {
    id: 26,
    name: "5-Amino-1MQ Pen",
    category: "performance",
    format: "Disposable peptide pen",
    image: "/images/products/5-amino-1mq-pen.webp",
    options: [{ label: "50 mg" }],
  },
  {
    id: 27,
    name: "Semax Pen",
    category: "focus-sleep",
    format: "Disposable peptide pen",
    image: "/images/products/semax-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 28,
    name: "Selank Pen",
    category: "focus-sleep",
    format: "Disposable peptide pen",
    image: "/images/products/selank-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 29,
    name: "DSIP Pen",
    category: "focus-sleep",
    format: "Disposable peptide pen",
    image: "/images/products/dsip-pen-5-mg.webp",
    options: [
      { label: "5 mg", image: "/images/products/dsip-pen-5-mg.webp" },
      { label: "10 mg", image: "/images/products/dsip-pen-10-mg.webp" },
    ],
  },
  {
    id: 30,
    name: "Melatonin Pen",
    category: "focus-sleep",
    format: "Disposable peptide pen",
    image: "/images/products/melatonin-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 31,
    name: "PT-141 Pen",
    category: "libido",
    format: "Disposable peptide pen",
    image: "/images/products/pt-141-pen-10-mg.webp",
    options: [
      { label: "10 mg", image: "/images/products/pt-141-pen-10-mg.webp" },
      { label: "30 mg", image: "/images/products/pt-141-pen-30-mg.webp" },
    ],
  },
  {
    id: 32,
    name: "Kisspeptin Pen",
    category: "libido",
    format: "Disposable peptide pen",
    image: "/images/products/kisspeptin-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 33,
    name: "Melanotan II Pen",
    category: "libido",
    format: "Disposable peptide pen",
    image: "/images/products/melanotan-ii-pen.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 8,
    name: "Semax Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/semax-nasal-spray.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 9,
    name: "Selank Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/selank-nasal-spray.webp",
    options: [{ label: "10 mg" }],
  },
  {
    id: 34,
    name: "Bali Glow Bundle",
    category: "bundles",
    format: "KLOW Blend, Melanotan II & CJC-1295 + Ipamorelin",
    image: "/images/products/bali-glow-bundle.webp",
  },
  {
    id: 35,
    name: "Hangover Recovery Stack",
    category: "bundles",
    format: "Thymosin Alpha-1, Glutathione & BPC-157",
    image: "/images/products/hangover-recovery-stack.webp",
  },
  {
    id: 36,
    name: "Mind Bundle",
    category: "bundles",
    format: "Semax, Selank & Pinealon",
    image: "/images/products/mind-bundle.webp",
  },
  {
    id: 37,
    name: "Mitochondrial Reset",
    category: "bundles",
    format: "NAD+, MOTS-C & SS-31",
    image: "/images/products/mitochondrial-reset.webp",
  },
  {
    id: 38,
    name: "Summer Cut Bundle",
    category: "bundles",
    format: "Retatrutide, GHK-Cu & Tesamorelin",
    image: "/images/products/summer-cut-bundle.webp",
  },
  {
    id: 39,
    name: "Atlas Lean Launch Stack™",
    category: "protocols",
    format: "Beginner Weight Loss & Appetite Control Bundle",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-lean-launch-stack.webp",
  },
  {
    id: 40,
    name: "Atlas Balance & Burn Stack™",
    category: "protocols",
    format: "Women’s Hormonal Weight Loss System",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-balance-burn-stack.webp",
  },
  {
    id: 41,
    name: "Atlas Shred Elite Stack™",
    category: "protocols",
    format: "Premium Fat Loss & Transformation Bundle",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-shred-elite-stack.webp",
  },
  {
    id: 42,
    name: "Atlas Surf Recovery Stack™",
    category: "protocols",
    format: "Recovery & Performance Support System",
    tag: "Recovery Stacks",
    image: "/images/products/atlas-surf-recovery-stack.webp",
  },
  {
    id: 43,
    name: "Atlas Wolverine Recovery Stack™",
    category: "protocols",
    format: "Recovery, Mobility & Joint Support System",
    tag: "Recovery Stacks",
    image: "/images/products/atlas-wolverine-recovery-stack.webp",
  },
  {
    id: 44,
    name: "Atlas Lean Growth Stack™",
    category: "protocols",
    format: "Recovery, Growth & Performance System",
    tag: "Muscle Growth Stacks",
    image: "/images/products/atlas-lean-growth-stack.webp",
  },
  {
    id: 45,
    name: "Atlas Mass Elite Stack™",
    category: "protocols",
    format: "Ultimate Muscle Growth & Recovery System",
    tag: "Muscle Growth Stacks",
    image: "/images/products/atlas-mass-elite-stack.webp",
  },
  {
    id: 46,
    name: "Atlas Deep Reset Stack™",
    category: "protocols",
    format: "Sleep, Recovery & Stress Optimisation System",
    tag: "Longevity / Wellness Stacks",
    image: "/images/products/atlas-deep-reset-stack.webp",
  },
  {
    id: 47,
    name: "Atlas Longevity Elite Stack™",
    category: "protocols",
    format: "Advanced Longevity, Energy & Wellness Optimisation System",
    tag: "Longevity / Wellness Stacks",
    image: "/images/products/atlas-longevity-elite-stack.webp",
  },
  {
    id: 48,
    name: "Atlas Glow & Repair Stack™",
    category: "protocols",
    format: "Skin, Hair & Beauty Optimisation System",
    tag: "Beauty / Skin Stacks",
    image: "/images/products/atlas-glow-repair-stack.webp",
  },
  {
    id: 49,
    name: "Atlas Vitality Elite Stack™",
    category: "protocols",
    format: "Performance, Energy & Men’s Optimisation System",
    tag: "Men’s Performance Stacks",
    image: "/images/products/atlas-vitality-elite-stack.webp",
  },
  {
    id: 50,
    name: "Atlas Elite Transformation Stack™",
    category: "protocols",
    format: "Complete Premium Transformation Protocol",
    tag: "VIP Stacks",
    image: "/images/products/atlas-elite-transformation-stack.webp",
  },
  {
    id: 51,
    name: "Multi-Use Peptide Injection Pen",
    category: "accessories",
    format: "Reusable injection pen",
    image: "/images/products/multi-use-peptide-injection-pen.webp",
  },
  {
    id: 52,
    name: "One-Time Use Peptide Injection Pen",
    category: "accessories",
    format: "Disposable injection pen",
    image: "/images/products/one-time-use-peptide-injection-pen.webp",
  },
  {
    id: 53,
    name: "Single-Use Peptide Pen Cartridge",
    category: "accessories",
    format: "Pen cartridge",
    image: "/images/products/single-use-peptide-pen-cartridge.webp",
  },
  {
    id: 54,
    name: "Peptide Pen Case With Ice Pack",
    category: "accessories",
    format: "Travel case",
    image: "/images/products/peptide-pen-case-with-ice-pack.webp",
  },
  {
    id: 55,
    name: "Reconstitution Service for Disposable Peptide Pens",
    category: "accessories",
    format: "Service",
    image: "/images/products/reconstitution-service-for-disposable-peptide-pens.webp",
  },
  {
    id: 56,
    name: "Reconstitution Service for Reusable Peptide Pen Cartridges",
    category: "accessories",
    format: "Service",
    image: "/images/products/reconstitution-service-for-reusable-peptide-pen-cartridges.webp",
  },
];

// Safety checks: these stop the site from starting (with a clear message) if a
// product was added by mistake with a reused id or a category that doesn't exist.
if (new Set(products.map((product) => product.id)).size !== products.length) {
  throw new Error("Two products in data/products.ts have the same id. Give each product its own id.");
}
for (const product of products) {
  if (!categories.some((category) => category.id === product.category)) {
    throw new Error(`"${product.name}" in data/products.ts has an unknown category: "${product.category}".`);
  }
}
