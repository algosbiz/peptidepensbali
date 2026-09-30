import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { SITE_URL } from "@/lib/site";
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
const title = "Peptide Pens Bali | Disposable Peptide Pens Delivered Across Bali";
const description =
  "Buy disposable peptide pens in Bali with fast, discreet delivery. Weight loss pens, recovery peptides and nasal spray peptides available throughout Bali.";
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

// Structured data describing the business and website for search engines.
// Kept to what the site really shows: the brand, its website and a WhatsApp contact.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Atlas Longevity",
      alternateName: "Peptide Pens Bali",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/peptide-pens-bali-logo.png`,
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
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable} antialiased`}>
      <body>
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
