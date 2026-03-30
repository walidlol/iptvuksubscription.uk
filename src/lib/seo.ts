/**
 * Metadata Builders
 * IPTV UK Subscription — iptvuksubscription.uk
 *
 * Every page MUST export generateMetadata() using these builders.
 * Rules from CLAUDE.md:
 *   - Title: {Primary KW} | {Benefit} — iptvuksubscription.uk (max 60 chars)
 *   - Description: primary KW + UK hook + CTA (max 155 chars)
 *   - Canonical on every page
 *   - OG image 1200×630
 */

import type { Metadata } from 'next'

const BASE_URL  = 'https://iptvuksubscription.uk'
const SITE_NAME = 'IPTV UK Subscription'

/* ============================================================
   OG Image defaults
   ============================================================ */

const DEFAULT_OG: NonNullable<Metadata['openGraph']>['images'] = [
  {
    url: `${BASE_URL}/images/og/homepage.jpg`,
    width: 1200,
    height: 630,
    alt: 'IPTV UK Subscription — 35,000+ Channels, 4K Quality',
  },
]

/* ============================================================
   Base metadata shared across all pages
   ============================================================ */

const baseMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false },
}

/* ============================================================
   Homepage Metadata
   Primary keyword: "iptv uk"
   ============================================================ */

export function buildHomepageMetadata(): Metadata {
  const title       = 'IPTV UK | Best Streaming Service — iptvuksubscription.uk'
  const description =
    'The UK\'s best IPTV subscription. 35,000+ channels, 100,000+ VODs, 99.9% uptime. Watch Premier League, BBC, Sky & more. Start from £9.99/mo.'

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk',
      'iptv uk subscription',
      'best iptv uk',
      'iptv uk channels',
      'iptv uk provider',
      'cheap iptv uk',
      'iptv subscription uk',
      'uk iptv service',
    ],
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      type: 'website',
      url: BASE_URL,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: DEFAULT_OG,
    },
  }
}

/* ============================================================
   /iptv-uk-subscription/ — Primary Money Page
   Primary keyword: "iptv uk subscription"
   ============================================================ */

export function buildIptvUkSubscriptionMetadata(): Metadata {
  const title       = 'IPTV UK Subscription 2026 | Best Plans — iptvuksubscription.uk'
  const description =
    'Best IPTV UK subscription in 2026. 35,000+ channels, 4K quality, EPG guide. Standard, Premium Annual & Family plans. Try free for 24 hours.'
  const url         = `${BASE_URL}/iptv-uk-subscription/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk subscription',
      'best iptv uk subscription',
      'iptv uk subscription 2026',
      'cheap iptv uk subscription',
      'iptv subscription uk',
      'iptv uk subscription review',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/images/og/iptv-uk-subscription.jpg`,
          width: 1200,
          height: 630,
          alt: 'Best IPTV UK Subscription 2026',
        },
      ],
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/* ============================================================
   /iptv-subscription-uk/ — Supporting Silo
   Primary keyword: "iptv subscription uk"
   ============================================================ */

export function buildIptvSubscriptionUkMetadata(): Metadata {
  const title       = 'IPTV Subscription UK | Premium TV Plans — iptvuksubscription.uk'
  const description =
    'Premium IPTV subscription for UK viewers. Watch live sport, drama & movies on Firestick, Smart TV or mobile. 99.9% uptime. From £9.99/month.'
  const url         = `${BASE_URL}/iptv-subscription-uk/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv subscription uk',
      'best iptv subscription uk',
      'iptv subscription uk review',
      'iptv subscription uk reddit',
      'uk iptv subscription service',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/* ============================================================
   /plans/ — Pricing Conversion Page
   ============================================================ */

export function buildPlansMetadata(): Metadata {
  const title       = 'IPTV UK Plans & Pricing | From £9.99 — iptvuksubscription.uk'
  const description =
    'View IPTV UK subscription plans. Monthly from £9.99, Annual from £79.99, Family Plan £129.99/yr. PayPal & crypto accepted. Cancel anytime.'
  const url         = `${BASE_URL}/plans/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk plans',
      'iptv uk pricing',
      'iptv uk subscription cost',
      'cheap iptv uk',
      'iptv uk monthly',
      'iptv uk annual plan',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${BASE_URL}/images/og/plans.jpg`,
          width: 1200,
          height: 630,
          alt: 'IPTV UK Subscription Plans and Pricing',
        },
      ],
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

/* ============================================================
   /channels/ — Channel List Page
   ============================================================ */

export function buildChannelsMetadata(): Metadata {
  const title       = 'IPTV UK Channel List | 35,000+ Channels — iptvuksubscription.uk'
  const description =
    'Full IPTV UK channel list. 5,000+ UK channels including BBC, ITV, Sky Sports, BT Sport, plus 30,000+ international channels. Updated daily.'
  const url         = `${BASE_URL}/channels/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk channels',
      'iptv uk channel list',
      'uk iptv channel list',
      'iptv channels uk 2026',
      'sky sports iptv uk',
      'bbc iptv uk',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ============================================================
   /setup-guide/ — Tutorial Hub
   ============================================================ */

export function buildSetupGuideMetadata(): Metadata {
  const title       = 'IPTV UK Setup Guide | Firestick, Smart TV & More — iptvuksubscription.uk'
  const description =
    'Step-by-step IPTV UK setup guide for Firestick, Android TV, Samsung Smart TV, iPhone & more. Get streaming in under 5 minutes.'
  const url         = `${BASE_URL}/setup-guide/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk setup',
      'how to setup iptv uk',
      'iptv uk firestick setup',
      'iptv uk smart tv setup',
      'iptv uk setup guide',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ============================================================
   /faq/ — FAQ Silo
   ============================================================ */

export function buildFAQMetadata(): Metadata {
  const title       = 'IPTV UK FAQ | Common Questions Answered — iptvuksubscription.uk'
  const description =
    'Answers to the most common IPTV UK questions. Devices, channels, pricing, setup, trials and more. Get help from UK\'s top IPTV provider.'
  const url         = `${BASE_URL}/faq/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk faq',
      'iptv uk questions',
      'iptv uk help',
      'is iptv legal uk',
      'iptv uk reddit',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ============================================================
   /reviews/ — Social Proof Page
   ============================================================ */

export function buildReviewsMetadata(): Metadata {
  const title       = 'IPTV UK Reviews | What UK Customers Say — iptvuksubscription.uk'
  const description =
    'Real IPTV UK reviews from customers in London, Manchester, Birmingham and across the UK. Rated 4.9/5 by 2,400+ subscribers.'
  const url         = `${BASE_URL}/reviews/`

  return {
    ...baseMetadata,
    title,
    description,
    keywords: [
      'iptv uk reviews',
      'iptv uk subscription review',
      'best iptv uk reddit',
      'iptv uk trustpilot',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: DEFAULT_OG,
      locale: 'en_GB',
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

/* ============================================================
   Generic page builder — for blog posts and future pages
   ============================================================ */

interface PageMetaOptions {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImagePath?: string
  type?: 'website' | 'article'
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  ogImagePath = '/images/og/homepage.jpg',
  type = 'website',
}: PageMetaOptions): Metadata {
  const url = `${BASE_URL}${path}`

  return {
    ...baseMetadata,
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${BASE_URL}${ogImagePath}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
