import type { MetadataRoute } from "next";

const SITE_URL = "https://iptvuksubscription.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  // Only include pages that actually exist as routes.
  // Add new entries as pages are created.
  return [
    {
      url: SITE_URL,
      lastModified: "2026-03-31",
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];
}
