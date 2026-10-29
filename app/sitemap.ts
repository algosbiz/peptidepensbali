import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { SITE_URL } from "@/lib/site";

// The photos of the page's banners and sections (product photos are added below).
const sectionImages = [
  "/images/hero/peptide-pen-bali.webp",
  "/images/about/peptide-pen-travel-case.webp",
  "/images/about/discreet-packaging.webp",
  "/images/delivery/peptide-pen-delivery-bali.webp",
];

// Creates /sitemap.xml so search engines can find the page.
// It also lists every photo on the page (an "image sitemap"), which helps the
// product photos show up in Google Images, e.g. for "retatrutide pen".
export default function sitemap(): MetadataRoute.Sitemap {
  const productImages = products.flatMap((product) => [
    product.image,
    ...(product.options ?? []).map((option) => option.image),
  ]);
  // A Set removes photos that are listed twice (e.g. a product photo that is also its first dose).
  const images = [...new Set([...sectionImages, ...productImages])]
    .filter((image) => image !== undefined)
    .map((image) => `${SITE_URL}${image}`);

  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1, images }];
}
