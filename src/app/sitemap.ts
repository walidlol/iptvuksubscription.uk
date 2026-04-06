import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blogPosts";

const SITE_URL = "https://iptvuksubscription.uk";

// Last-modified date for static pages (update when content changes)
const STATIC_DATE = "2026-04-06";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Tier 1: Money pages (highest priority) ──
    {
      url: SITE_URL,
      lastModified: STATIC_DATE,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: STATIC_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ── Tier 2: High-value support pages ──
    {
      url: `${SITE_URL}/faq`,
      lastModified: STATIC_DATE,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: STATIC_DATE,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: STATIC_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Blog posts ──
    ...BLOG_POSTS.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),

    // ── Tier 3: Legal / utility pages ──
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: STATIC_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: STATIC_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified: STATIC_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
