import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Creates /robots.txt, which tells search engines they may index the site.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
