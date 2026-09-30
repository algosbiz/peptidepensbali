// Everything in the "Disposable Peptide Pens Available" section comes from this file.
// Products live here, separate from the React components, so they can be updated
// without touching any layout code.

// CATEGORIES: the numbered rows of the catalogue, in the order they appear.
// "note" is optional: it adds a dark card after the products in that row.
export const categories = [
  {
    id: "weight-management",
    number: "01",
    title: "Weight Management Pens",
    intro: "Popular options include:",
  },
  {
    id: "recovery",
    number: "02",
    title: "Recovery Pens",
    intro: "Available options include:",
  },
  {
    id: "wellness",
    number: "03",
    title: "Wellness Pens",
    intro: "Including:",
    note: "Our range continues to expand as new products become available.",
  },
  {
    id: "nasal-sprays",
    number: "04",
    title: "Nasal Spray Peptides",
    intro: "Atlas Longevity also supplies selected peptide nasal sprays. Popular products include:",
    note: "Many customers choose nasal sprays as an alternative delivery option for selected compounds.",
  },
];

// PRODUCTS
// To add a product:
//   1. Copy one of the blocks below and paste it at the end of the list.
//   2. Give it a NEW id number that no product has used before, a name, and the id of
//      its category (see above). Never change or reuse an id: visitors' saved carts
//      remember products by their id.
//   3. Put its image in /public/images/products/ and update the "image" path.
// The quantity picker, Add to cart button and WhatsApp link are created automatically.

export type Product = {
  id: number;
  name: string;
  category: string;
  format: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Retatrutide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/retatrutide-pen.webp",
  },
  {
    id: 2,
    name: "Tirzepatide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/tirzepatide-pen.webp",
  },
  {
    id: 3,
    name: "Semaglutide Pen",
    category: "weight-management",
    format: "Disposable peptide pen",
    image: "/images/products/semaglutide-pen.webp",
  },
  {
    id: 4,
    name: "BPC-157 Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/bpc-157-pen.webp",
  },
  {
    id: 5,
    name: "TB-500 Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/tb-500-pen.webp",
  },
  {
    id: 6,
    name: "MOTS-C Pen",
    category: "recovery",
    format: "Disposable peptide pen",
    image: "/images/products/mots-c-pen.webp",
  },
  {
    id: 7,
    name: "GHK-Cu Pen",
    category: "wellness",
    format: "Disposable peptide pen",
    image: "/images/products/ghk-cu-pen.webp",
  },
  {
    id: 8,
    name: "Semax Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/semax-nasal-spray.webp",
  },
  {
    id: 9,
    name: "Selank Nasal Spray",
    category: "nasal-sprays",
    format: "Peptide nasal spray",
    image: "/images/products/selank-nasal-spray.webp",
  },
];

// Safety check: two products with the same id would mix them up in the cart,
// so the site refuses to start and tells you what to fix.
if (new Set(products.map((product) => product.id)).size !== products.length) {
  throw new Error("Two products in data/products.ts have the same id. Give each product its own id.");
}
