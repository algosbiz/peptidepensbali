// Site-wide settings used in several places (SEO, header, footer).

export const SITE_URL = "https://peptidepensbali.com";

// The full Atlas Longevity catalogue, linked from the catalogue notes, CTA and footer.
export const CATALOGUE_URL = "https://peptidesbali.online/";

// Menu links. Each "href" jumps to the section with the matching id on the page.
// Used by both the header and the footer, so they always stay in sync.
export const NAV_LINKS = [
  { label: "Peptide Pens", href: "#pens" },
  { label: "About", href: "#about" },
  { label: "Delivery", href: "#delivery" },
  { label: "Why Atlas", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
];
