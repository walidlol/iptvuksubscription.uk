import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/blogPosts'

const BASE_URL = 'https://iptvuksubscription.uk'

/* Priority + changefreq guide:
   1.0  = homepage (crawled daily)
   0.9  = primary money pages
   0.8  = supporting silos + conversion pages
   0.7  = content/utility pages
   0.5  = secondary content
*/

export default function sitemap(): MetadataRoute.Sitemap {
  const now      = new Date().toISOString()
  const blogUrls = getAllSlugs().map(slug => ({
    url:             `${BASE_URL}/blog/${slug}/`,
    lastModified:    now,
    changeFrequency: 'monthly' as const,
    priority:        0.6,
  }))

  return [
    {
      url:            BASE_URL,
      lastModified:   now,
      changeFrequency: 'daily',
      priority:       1.0,
    },
    {
      url:            `${BASE_URL}/iptv-uk-subscription/`,
      lastModified:   now,
      changeFrequency: 'weekly',
      priority:       0.9,
    },
    {
      url:            `${BASE_URL}/iptv-subscription-uk/`,
      lastModified:   now,
      changeFrequency: 'weekly',
      priority:       0.9,
    },
    {
      url:            `${BASE_URL}/plans/`,
      lastModified:   now,
      changeFrequency: 'weekly',
      priority:       0.8,
    },
    {
      url:            `${BASE_URL}/channels/`,
      lastModified:   now,
      changeFrequency: 'weekly',
      priority:       0.8,
    },
    {
      url:            `${BASE_URL}/setup-guide/`,
      lastModified:   now,
      changeFrequency: 'monthly',
      priority:       0.7,
    },
    {
      url:            `${BASE_URL}/faq/`,
      lastModified:   now,
      changeFrequency: 'monthly',
      priority:       0.7,
    },
    {
      url:            `${BASE_URL}/reviews/`,
      lastModified:   now,
      changeFrequency: 'weekly',
      priority:       0.7,
    },
    {
      url:            `${BASE_URL}/free-trial/`,
      lastModified:   now,
      changeFrequency: 'monthly',
      priority:       0.7,
    },
    {
      url:            `${BASE_URL}/blog/`,
      lastModified:   now,
      changeFrequency: 'daily',
      priority:       0.6,
    },
    {
      url:            `${BASE_URL}/terms/`,
      lastModified:   now,
      changeFrequency: 'yearly',
      priority:       0.3,
    },
    {
      url:            `${BASE_URL}/privacy/`,
      lastModified:   now,
      changeFrequency: 'yearly',
      priority:       0.3,
    },
    {
      url:            `${BASE_URL}/refund-policy/`,
      lastModified:   now,
      changeFrequency: 'yearly',
      priority:       0.3,
    },
    ...blogUrls,
  ]
}
