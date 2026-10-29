import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { CATALOGUE_URL, SITE_URL } from "@/lib/site";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import "./globals.css";

// The two brand fonts. next/font hosts them with the site, so they load fast
// and don't cause the text to jump around while the page loads.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// SEO: the title and description shown in Google and when the site is shared.
// Google cuts titles after about 60 characters and descriptions after about 155,
// so keep them within those lengths. "Peptides Bali" is the most searched phrase
// for this kind of shop in Indonesia (Ahrefs, October 2026), so both use it.
const title = "Peptide Pens Bali | Buy Peptides in Bali with Fast Delivery";
const description =
  "Buy peptides in Bali: Retatrutide, Tirzepatide, BPC-157, NAD+ and GHK-Cu peptide pens plus nasal sprays. Rupiah prices, fast discreet delivery across Bali.";
const shareImage = {
  url: "/images/og/peptide-pens-bali-og.jpg",
  width: 1200,
  height: 630,
  alt: "Peptide Pens Bali by Atlas Longevity",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Peptide Pens Bali",
    locale: "en_US",
    title,
    description,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

// Structured data describing the business, website and page for search engines.
// Kept to what the site really shows: the brand, its online shop, its website and a WhatsApp contact.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${SITE_URL}/#organization`,
      name: "Atlas Longevity",
      alternateName: "Peptide Pens Bali",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/peptide-pens-bali-logo.png`,
      image: `${SITE_URL}${shareImage.url}`,
      sameAs: [CATALOGUE_URL],
      areaServed: { "@type": "Place", name: "Bali, Indonesia" },
      currenciesAccepted: "IDR",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: `+${WHATSAPP_NUMBER}`,
        contactType: "customer service",
        areaServed: "Bali, Indonesia",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Peptide Pens Bali",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${shareImage.url}` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      {/* On phones and tablets the bottom padding keeps the end of the page clear of
          the shortcut toolbar fixed to the bottom of the screen (components/MobileToolbar.tsx). */}
      <body className="pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
