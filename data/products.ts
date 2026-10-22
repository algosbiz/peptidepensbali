// Everything in the "Disposable Peptide Pens Available" section comes from this file.
// Products live here, separate from the React components, so they can be updated
// without touching any layout code.
// Product names, doses and photos follow the full catalogue at peptidesbali.online.

// CATEGORIES: the numbered rows of the catalogue, in the order they appear.
//   label: short name used on the category buttons at the top of the catalogue
//   note:  optional; adds a dark card after the products in that row
//   widePhotos: optional; the photos in that row are wide (3:2) banners instead of
//               square product photos, so their cards use a wide picture frame
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
    widePhotos: true,
  },
  {
    id: "protocols",
    number: "10",
    label: "Peptide Protocols",
    title: "Peptide Protocols",
    intro: "Multi-product stacks, grouped by goal:",
    widePhotos: true,
  },
  {
    id: "accessories",
    number: "11",
    label: "Accessories & Services",
    title: "Pen Accessories & Services",
    intro: "Injection pens, cartridges, storage and reconstitution:",
    widePhotos: true,
  },
];

// FEATURED: the products shown in the slider at the top of the page, in this order.
// Use the product ids from the list below.
export const featuredProductIds = [1, 2, 10, 4, 7, 17];

// PRODUCTS
// To add a product:
//   1. Copy one of the blocks below and paste it into the list (products show in
//      the order they are listed, inside their category).
//   2. Give it a NEW id number that no product has used before, a name, and the id of
//      its category (see above). Never change or reuse an id: visitors' saved carts
//      remember products by their id.
//   3. Put its image in /public/images/products/ and update the "image" path.
//      Pen and nasal spray photos are square (e.g. 1200 x 1200 pixels); bundle, protocol
//      and accessory pictures are wide, 3:2 (e.g. 1200 x 800 pixels).
// The quantity picker, Add to cart button and WhatsApp link are created automatically.
//
// Optional fields:
//   tag:     small label above the name (used for the protocol goal, e.g. "Fat Loss Stacks")
//   options: dose choices, e.g. [{ label: "5 mg" }, { label: "10 mg" }]. Give an option
//            its own "image" if it has a different photo. With one option the dose is
//            simply shown on the card; with several, visitors pick one before adding.
//   shopId:  the product's id in the online shop at peptidesbali.online. It links the
//            product to the shop: its price, stock and pen types (disposable pen,
//            reusable pen, cartridge) are read from the shop automatically
//            (lib/shop-data.ts), and "Proceed to Checkout" puts it in the shop's cart.
//            Products with options get their shopIds on the options: the shop's id for
//            that dose as a DISPOSABLE PEN (the other pen types are found from it), not
//            on the product. A product or dose without a shopId shows no price and is
//            ordered on WhatsApp instead.
//            To find an id: open the shop's product list at
//            https://peptidesbali.online/wp-json/wc/store/v1/products?search=NAME
//            and look for "id" (and, for a dose, the "id" of the right item under "variations").

export type ProductOption = {
  label: string;
  image?: string;
  shopId?: number;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  format: string;
  tag?: string;
  image: string;
  options?: ProductOption[];
  shopId?: number;
};

// True when the product's photo is a wide (3:2) banner rather than a square photo.
export function hasWidePhoto(product: Product) {
  return categories.some((category) => category.id === product.category && category.widePhotos);
}

export const products: Product[] = [
  {
    id: 1,
    name: "Retatrutide Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/retatrutide-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/retatrutide-5-mg-peptide-pen-bali.webp", shopId: 9752 },
      { label: "10 mg", image: "/images/products/retatrutide-10-mg-peptide-pen-bali.webp", shopId: 9753 },
      { label: "20 mg", image: "/images/products/retatrutide-20-mg-peptide-pen-bali.webp", shopId: 9754 },
      { label: "30 mg", image: "/images/products/retatrutide-30-mg-peptide-pen-bali.webp", shopId: 9755 },
      { label: "40 mg", image: "/images/products/retatrutide-40-mg-peptide-pen-bali.webp", shopId: 10077 },
      { label: "50 mg", image: "/images/products/retatrutide-50-mg-peptide-pen-bali.webp", shopId: 10078 },
    ],
  },
  {
    id: 2,
    name: "Tirzepatide Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/tirzepatide-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/tirzepatide-5-mg-peptide-pen-bali.webp", shopId: 10089 },
      { label: "10 mg", image: "/images/products/tirzepatide-10-mg-peptide-pen-bali.webp", shopId: 9859 },
      { label: "20 mg", image: "/images/products/tirzepatide-20-mg-peptide-pen-bali.webp", shopId: 9860 },
      { label: "40 mg", image: "/images/products/tirzepatide-40-mg-peptide-pen-bali.webp", shopId: 9861 },
    ],
  },
  {
    id: 3,
    name: "Semaglutide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/semaglutide-peptide-pen-bali.webp",
    // No shopId: the online shop sells Semaglutide only as a vial, so this pen is ordered on WhatsApp.
  },
  {
    id: 10,
    name: "Retatrutide + Cagrilintide Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/retatrutide-10-mg-cagrilintide-2-mg-peptide-pen-bali.webp",
    // The "+ 5 mg" strengths come from the client's own photo set (not listed on peptidesbali.online),
    // so they have no shopId and are ordered on WhatsApp.
    options: [
      { label: "10 mg + 2 mg", image: "/images/products/retatrutide-10-mg-cagrilintide-2-mg-peptide-pen-bali.webp", shopId: 9765 },
      { label: "10 mg + 5 mg", image: "/images/products/retatrutide-10-mg-cagrilintide-5-mg-peptide-pen-bali.webp" },
      { label: "20 mg + 4 mg", image: "/images/products/retatrutide-20-mg-cagrilintide-4-mg-peptide-pen-bali.webp", shopId: 9769 },
      { label: "20 mg + 5 mg", image: "/images/products/retatrutide-20-mg-cagrilintide-5-mg-peptide-pen-bali.webp" },
      { label: "30 mg + 5 mg", image: "/images/products/retatrutide-30-mg-cagrilintide-5-mg-peptide-pen-bali.webp" },
      { label: "30 mg + 6 mg", image: "/images/products/retatrutide-30-mg-cagrilintide-6-mg-peptide-pen-bali.webp", shopId: 9773 },
    ],
  },
  {
    id: 57,
    name: "Cagrilintide Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/cagrilintide-5-mg-peptide-pen-bali.webp",
    options: [{ label: "5 mg", shopId: 9964 }],
  },
  {
    id: 11,
    name: "Tesamorelin Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/tesamorelin-10-mg-peptide-pen-bali.webp",
    options: [
      { label: "10 mg", image: "/images/products/tesamorelin-10-mg-peptide-pen-bali.webp", shopId: 9845 },
      { label: "20 mg", image: "/images/products/tesamorelin-20-mg-peptide-pen-bali.webp", shopId: 9846 },
    ],
  },
  {
    id: 12,
    name: "Tesamorelin + Ipamorelin Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/tesamorelin-10-mg-ipamorelin-5-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg + 5 mg", shopId: 9853 }],
  },
  {
    id: 13,
    name: "AOD-9604 Pen",
    category: "weight-management",
    format: "Peptide pen",
    image: "/images/products/aod-9604-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9592 }],
  },
  {
    id: 4,
    name: "BPC-157 Pen",
    category: "recovery",
    format: "Peptide pen",
    image: "/images/products/bpc-157-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/bpc-157-5-mg-peptide-pen-bali.webp", shopId: 9614 },
      { label: "10 mg", image: "/images/products/bpc-157-10-mg-peptide-pen-bali.webp", shopId: 9617 },
    ],
  },
  {
    id: 5,
    name: "TB-500 Pen",
    category: "recovery",
    format: "Peptide pen",
    image: "/images/products/tb-500-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/tb-500-5-mg-peptide-pen-bali.webp", shopId: 9812 },
      { label: "10 mg", image: "/images/products/tb-500-10-mg-peptide-pen-bali.webp", shopId: 9813 },
    ],
  },
  {
    id: 6,
    name: "MOTS-C Pen",
    category: "recovery",
    format: "Peptide pen",
    image: "/images/products/mots-c-10-mg-peptide-pen-bali.webp",
    options: [
      { label: "10 mg", image: "/images/products/mots-c-10-mg-peptide-pen-bali.webp", shopId: 9721 },
      { label: "20 mg", image: "/images/products/mots-c-20-mg-peptide-pen-bali.webp", shopId: 9722 },
      { label: "40 mg", image: "/images/products/mots-c-40-mg-peptide-pen-bali.webp", shopId: 9723 },
    ],
  },
  {
    id: 14,
    name: "Wolverine Blend Pen",
    category: "recovery",
    format: "TB-500 + BPC-157 blend pen",
    image: "/images/products/wolverine-blend-10-mg-peptide-pen-bali.webp",
    options: [
      { label: "10 mg", image: "/images/products/wolverine-blend-10-mg-peptide-pen-bali.webp", shopId: 9833 },
      { label: "20 mg", image: "/images/products/wolverine-blend-20-mg-peptide-pen-bali.webp", shopId: 9834 },
      { label: "30 mg", image: "/images/products/wolverine-blend-30-mg-peptide-pen-bali.webp", shopId: 9835 },
    ],
  },
  {
    id: 15,
    name: "KPV Pen",
    category: "recovery",
    format: "Peptide pen",
    image: "/images/products/kpv-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9705 }],
  },
  {
    id: 7,
    name: "GHK-Cu Pen",
    category: "wellness",
    format: "Peptide pen",
    image: "/images/products/ghk-cu-50-mg-peptide-pen-bali.webp",
    options: [
      { label: "50 mg", image: "/images/products/ghk-cu-50-mg-peptide-pen-bali.webp", shopId: 9656 },
      { label: "100 mg", image: "/images/products/ghk-cu-100-mg-peptide-pen-bali.webp", shopId: 9657 },
    ],
  },
  {
    id: 16,
    name: "Glutathione Pen",
    category: "wellness",
    format: "Peptide pen",
    image: "/images/products/glutathione-1500-mg-peptide-pen-bali.webp",
    options: [{ label: "1500 mg", shopId: 9674 }],
  },
  {
    id: 17,
    name: "NAD+ Pen",
    category: "longevity",
    format: "Peptide pen",
    image: "/images/products/nad-500-mg-peptide-pen-bali.webp",
    options: [
      { label: "500 mg", image: "/images/products/nad-500-mg-peptide-pen-bali.webp", shopId: 9733 },
      { label: "1000 mg", image: "/images/products/nad-1000-mg-peptide-pen-bali.webp", shopId: 9734 },
    ],
  },
  {
    id: 18,
    name: "Epitalon Pen",
    category: "longevity",
    format: "Peptide pen",
    image: "/images/products/epithalon-10-mg-peptide-pen-bali.webp",
    options: [
      { label: "10 mg", image: "/images/products/epithalon-10-mg-peptide-pen-bali.webp", shopId: 9643 },
      { label: "50 mg", image: "/images/products/epithalon-50-mg-peptide-pen-bali.webp", shopId: 9644 },
      { label: "100 mg", image: "/images/products/epithalon-100-mg-peptide-pen-bali.webp", shopId: 9645 },
    ],
  },
  {
    id: 19,
    name: "SS-31 Pen",
    category: "longevity",
    format: "Peptide pen",
    image: "/images/products/ss-31-10-mg-peptide-pen-bali.webp",
    options: [
      { label: "10 mg", image: "/images/products/ss-31-10-mg-peptide-pen-bali.webp", shopId: 9801 },
      { label: "50 mg", image: "/images/products/ss-31-50-mg-peptide-pen-bali.webp", shopId: 9802 },
    ],
  },
  {
    id: 20,
    name: "Glow Plus Pen",
    category: "longevity",
    format: "GHK-Cu + BPC-157 + TB-500 blend pen",
    image: "/images/products/glow-blend-70-mg-peptide-pen-bali.webp",
    options: [{ label: "70 mg", shopId: 9669 }],
  },
  {
    id: 21,
    name: "KLOW Pen",
    category: "longevity",
    format: "GHK-Cu + KPV + BPC-157 + TB-500 blend pen",
    image: "/images/products/klow-blend-80-mg-peptide-pen-bali.webp",
    options: [{ label: "80 mg", shopId: 9700 }],
  },
  {
    id: 22,
    name: "CJC-1295 No DAC + Ipamorelin Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/cjc-1295-no-dac-5-mg-ipamorelin-5-mg-peptide-pen-bali.webp",
    options: [{ label: "5 mg + 5 mg", shopId: 9626 }],
  },
  {
    id: 58,
    name: "CJC-1295 No DAC Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/cjc-1295-no-dac-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/cjc-1295-no-dac-5-mg-peptide-pen-bali.webp", shopId: 9974 },
      { label: "10 mg", image: "/images/products/cjc-1295-no-dac-10-mg-peptide-pen-bali.webp", shopId: 9975 },
    ],
  },
  {
    id: 23,
    name: "Ipamorelin Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/ipamorelin-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/ipamorelin-5-mg-peptide-pen-bali.webp", shopId: 9685 },
      { label: "10 mg", image: "/images/products/ipamorelin-10-mg-peptide-pen-bali.webp", shopId: 9686 },
    ],
  },
  {
    id: 24,
    name: "GHRP-6 Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/ghrp-6-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9664 }],
  },
  {
    id: 25,
    name: "IGF-LR3 Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/igf-lr3-1-mg-peptide-pen-bali.webp",
    options: [{ label: "1 mg", shopId: 9679 }],
  },
  {
    id: 59,
    name: "HGH Somatropin Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/hgh-somatropin-10-iu-peptide-pen-bali.webp",
    options: [
      { label: "10 IU", image: "/images/products/hgh-somatropin-10-iu-peptide-pen-bali.webp", shopId: 9984 },
      { label: "24 IU", image: "/images/products/hgh-somatropin-24-iu-peptide-pen-bali.webp", shopId: 10064 },
      { label: "36 IU", image: "/images/products/hgh-somatropin-36-iu-peptide-pen-bali.webp", shopId: 9985 },
      { label: "72 IU", image: "/images/products/hgh-somatropin-72-iu-peptide-pen-bali.webp", shopId: 10065 },
      { label: "108 IU", image: "/images/products/hgh-somatropin-108-iu-peptide-pen-bali.webp", shopId: 10066 },
    ],
  },
  {
    id: 26,
    name: "5-Amino-1MQ Pen",
    category: "performance",
    format: "Peptide pen",
    image: "/images/products/5-amino-1mq-50-mg-peptide-pen-bali.webp",
    options: [
      { label: "50 mg", image: "/images/products/5-amino-1mq-50-mg-peptide-pen-bali.webp", shopId: 9572 },
      { label: "100 mg", image: "/images/products/5-amino-1mq-100-mg-peptide-pen-bali.webp", shopId: 9573 },
    ],
  },
  {
    id: 27,
    name: "Semax Pen",
    category: "focus-sleep",
    format: "Peptide pen",
    image: "/images/products/semax-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9788 }],
  },
  {
    id: 28,
    name: "Selank Pen",
    category: "focus-sleep",
    format: "Peptide pen",
    image: "/images/products/selank-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9783 }],
  },
  {
    id: 60,
    name: "Pinealon Pen",
    category: "focus-sleep",
    format: "Peptide pen",
    image: "/images/products/pinealon-20-mg-peptide-pen-bali.webp",
    options: [{ label: "20 mg", shopId: 9993 }],
  },
  {
    id: 29,
    name: "DSIP Pen",
    category: "focus-sleep",
    format: "Peptide pen",
    image: "/images/products/dsip-5-mg-peptide-pen-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/dsip-5-mg-peptide-pen-bali.webp", shopId: 9633 },
      { label: "10 mg", image: "/images/products/dsip-10-mg-peptide-pen-bali.webp", shopId: 9634 },
    ],
  },
  {
    id: 31,
    name: "PT-141 Pen",
    category: "libido",
    format: "Peptide pen",
    image: "/images/products/pt-141-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 10298 }],
  },
  {
    id: 32,
    name: "Kisspeptin Pen",
    category: "libido",
    format: "Peptide pen",
    image: "/images/products/kisspeptin-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9695 }],
  },
  {
    id: 61,
    name: "HCG Pen",
    category: "libido",
    format: "Peptide pen",
    image: "/images/products/hcg-5000-iu-peptide-pen-bali.webp",
    options: [{ label: "5000 IU", shopId: 9956 }],
  },
  {
    id: 62,
    name: "Melanotan I Pen",
    category: "libido",
    format: "Peptide pen",
    image: "/images/products/melanotan-i-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9710 }],
  },
  {
    id: 33,
    name: "Melanotan II Pen",
    category: "libido",
    format: "Peptide pen",
    image: "/images/products/melanotan-ii-10-mg-peptide-pen-bali.webp",
    options: [{ label: "10 mg", shopId: 9714 }],
  },
  {
    id: 8,
    name: "Semax Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/semax-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 3691 }],
  },
  {
    id: 9,
    name: "Selank Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/selank-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 3677 }],
  },
  {
    id: 64,
    name: "Semax + Selank Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/semax-10-mg-selank-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg + 10 mg", shopId: 8837 }],
  },
  {
    id: 65,
    name: "DSIP Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/dsip-5-mg-peptide-nasal-spray-bali.webp",
    options: [
      { label: "5 mg", image: "/images/products/dsip-5-mg-peptide-nasal-spray-bali.webp", shopId: 6218 },
      { label: "10 mg", image: "/images/products/dsip-10-mg-peptide-nasal-spray-bali.webp", shopId: 4201 },
    ],
  },
  {
    id: 66,
    name: "Dihexa Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/dihexa-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 3465 }],
  },
  {
    id: 67,
    name: "Epitalon Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/epithalon-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 4504 }],
  },
  {
    id: 68,
    name: "GHK-Cu Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/ghk-cu-50-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "50 mg", shopId: 4203 }],
  },
  {
    id: 69,
    name: "Kisspeptin-10 Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/kisspeptin-10-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 8831 }],
  },
  {
    id: 70,
    name: "Melanotan II Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/melanotan-ii-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 4207 }],
  },
  {
    id: 71,
    name: "NAD+ Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/nad-500-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "500 mg", shopId: 4205 }],
  },
  {
    id: 72,
    name: "Oxytocin Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/oxytocin-2-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "2 mg", shopId: 4209 }],
  },
  {
    id: 73,
    name: "PT-141 Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/pt-141-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 3641 }],
  },
  {
    id: 74,
    name: "VIP Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/vip-10-mg-peptide-nasal-spray-bali.webp",
    options: [{ label: "10 mg", shopId: 8834 }],
  },
  {
    id: 34,
    name: "Bali Glow Bundle",
    category: "bundles",
    format: "KLOW Blend, Melanotan II & CJC-1295 + Ipamorelin",
    image: "/images/products/bali-glow-bundle.webp",
    shopId: 4972,
  },
  {
    id: 35,
    name: "Hangover Recovery Stack",
    category: "bundles",
    format: "Thymosin Alpha-1, Glutathione & BPC-157",
    image: "/images/products/hangover-recovery-stack.webp",
    shopId: 4973,
  },
  {
    id: 36,
    name: "Mind Bundle",
    category: "bundles",
    format: "Semax, Selank & Pinealon",
    image: "/images/products/mind-bundle.webp",
    shopId: 4971,
  },
  {
    id: 37,
    name: "Mitochondrial Reset",
    category: "bundles",
    format: "NAD+, MOTS-C & SS-31",
    image: "/images/products/mitochondrial-reset.webp",
    shopId: 4977,
  },
  {
    id: 38,
    name: "Summer Cut Bundle",
    category: "bundles",
    format: "Retatrutide, GHK-Cu & Tesamorelin",
    image: "/images/products/summer-cut-bundle.webp",
    shopId: 4976,
  },
  {
    id: 39,
    name: "Atlas Lean Launch Stack™",
    category: "protocols",
    format: "Beginner Weight Loss & Appetite Control Bundle",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-lean-launch-stack.webp",
    shopId: 4253,
  },
  {
    id: 40,
    name: "Atlas Balance & Burn Stack™",
    category: "protocols",
    format: "Women’s Hormonal Weight Loss System",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-balance-burn-stack.webp",
    shopId: 4259,
  },
  {
    id: 41,
    name: "Atlas Shred Elite Stack™",
    category: "protocols",
    format: "Premium Fat Loss & Transformation Bundle",
    tag: "Fat Loss Stacks",
    image: "/images/products/atlas-shred-elite-stack.webp",
    shopId: 4257,
  },
  {
    id: 42,
    name: "Atlas Surf Recovery Stack™",
    category: "protocols",
    format: "Recovery & Performance Support System",
    tag: "Recovery Stacks",
    image: "/images/products/atlas-surf-recovery-stack.webp",
    shopId: 4271,
  },
  {
    id: 43,
    name: "Atlas Wolverine Recovery Stack™",
    category: "protocols",
    format: "Recovery, Mobility & Joint Support System",
    tag: "Recovery Stacks",
    image: "/images/products/atlas-wolverine-recovery-stack.webp",
    shopId: 4269,
  },
  {
    id: 44,
    name: "Atlas Lean Growth Stack™",
    category: "protocols",
    format: "Recovery, Growth & Performance System",
    tag: "Muscle Growth Stacks",
    image: "/images/products/atlas-lean-growth-stack.webp",
    shopId: 4261,
  },
  {
    id: 45,
    name: "Atlas Mass Elite Stack™",
    category: "protocols",
    format: "Ultimate Muscle Growth & Recovery System",
    tag: "Muscle Growth Stacks",
    image: "/images/products/atlas-mass-elite-stack.webp",
    shopId: 4267,
  },
  {
    id: 46,
    name: "Atlas Deep Reset Stack™",
    category: "protocols",
    format: "Sleep, Recovery & Stress Optimisation System",
    tag: "Longevity / Wellness Stacks",
    image: "/images/products/atlas-deep-reset-stack.webp",
    shopId: 4276,
  },
  {
    id: 47,
    name: "Atlas Longevity Elite Stack™",
    category: "protocols",
    format: "Advanced Longevity, Energy & Wellness Optimisation System",
    tag: "Longevity / Wellness Stacks",
    image: "/images/products/atlas-longevity-elite-stack.webp",
    shopId: 4274,
  },
  {
    id: 48,
    name: "Atlas Glow & Repair Stack™",
    category: "protocols",
    format: "Skin, Hair & Beauty Optimisation System",
    tag: "Beauty / Skin Stacks",
    image: "/images/products/atlas-glow-repair-stack.webp",
    shopId: 4278,
  },
  {
    id: 49,
    name: "Atlas Vitality Elite Stack™",
    category: "protocols",
    format: "Performance, Energy & Men’s Optimisation System",
    tag: "Men’s Performance Stacks",
    image: "/images/products/atlas-vitality-elite-stack.webp",
    shopId: 4280,
  },
  {
    id: 50,
    name: "Atlas Elite Transformation Stack™",
    category: "protocols",
    format: "Complete Premium Transformation Protocol",
    tag: "VIP Stacks",
    image: "/images/products/atlas-elite-transformation-stack.webp",
    shopId: 4282,
  },
  {
    id: 51,
    name: "Multi-Use Peptide Injection Pen",
    category: "accessories",
    format: "Reusable injection pen",
    image: "/images/products/multi-use-peptide-injection-pen.webp",
    shopId: 4037,
  },
  {
    id: 52,
    name: "One-Time Use Peptide Injection Pen",
    category: "accessories",
    format: "Disposable injection pen",
    image: "/images/products/one-time-use-peptide-injection-pen.webp",
    shopId: 1257,
  },
  {
    id: 53,
    name: "Single-Use Peptide Pen Cartridge",
    category: "accessories",
    format: "Pen cartridge",
    image: "/images/products/single-use-peptide-pen-cartridge.webp",
    shopId: 4042,
  },
  {
    id: 54,
    name: "Peptide Pen Case With Ice Pack",
    category: "accessories",
    format: "Travel case",
    image: "/images/products/peptide-pen-case-with-ice-pack.webp",
    shopId: 4249,
  },
  {
    id: 63,
    name: "Portable Peptide Cooler & Insulin Travel Fridge",
    category: "accessories",
    format: "Travel cooler",
    image: "/images/products/portable-peptide-cooler-insulin-travel-fridge.webp",
    shopId: 10695,
  },
  {
    id: 55,
    name: "Reconstitution Service for Disposable Peptide Pens",
    category: "accessories",
    format: "Service",
    image: "/images/products/reconstitution-service-for-disposable-peptide-pens.webp",
    shopId: 4048,
  },
  {
    id: 56,
    name: "Reconstitution Service for Reusable Peptide Pen Cartridges",
    category: "accessories",
    format: "Service",
    image: "/images/products/reconstitution-service-for-reusable-peptide-pen-cartridges.webp",
    shopId: 4050,
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
const shopIds = products.flatMap((product) => [
  ...(product.shopId ? [product.shopId] : []),
  ...(product.options ?? []).flatMap((option) => (option.shopId ? [option.shopId] : [])),
]);
if (new Set(shopIds).size !== shopIds.length) {
  throw new Error("Two products or doses in data/products.ts have the same shopId. Check the shop ids.");
}
for (const id of featuredProductIds) {
  if (!products.some((product) => product.id === id)) {
    throw new Error(`featuredProductIds in data/products.ts lists id ${id}, but no product has that id.`);
  }
}
