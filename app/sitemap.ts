import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Creates /sitemap.xml so search engines can find the page.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
