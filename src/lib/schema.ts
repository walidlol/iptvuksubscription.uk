/**
 * JSON-LD Schema Generators
 * IPTV UK Subscription — iptvuksubscription.uk
 *
 * Every page must call at least one generator and inject via:
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */

const BASE_URL = 'https://iptvuksubscription.uk'
const BRAND    = 'IPTV UK Subscription'

/* ============================================================
   Organisation & Website (homepage only)
   ============================================================ */

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND,
    url: BASE_URL,
    description:
      'The UK\'s best IPTV subscription service. 35,000+ channels, 100,000+ VODs, 99.9% uptime. Standard, Premium Annual, and Family plans.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/channels?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
        width: 300,
        height: 60,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        availableLanguage: 'English',
        areaServed: 'GB',
      },
    },
  }
}

/* ============================================================
   BreadcrumbList — every inner page
   ============================================================ */

interface BreadcrumbItem {
  name: string
  path: string
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  }
}

/* ============================================================
   FAQPage — minimum 5 Q&As per CLAUDE.md
   ============================================================ */

interface FAQItem {
  question: string
  answer: string
}

export function buildFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/* ============================================================
   Product — Pricing plans (one per tier)
   ============================================================ */

interface ProductSchemaOptions {
  name: string
  description: string
  price: string
  priceCurrency?: string
  priceValidUntil?: string
  url: string
  ratingValue?: string
  reviewCount?: number
}

export function buildProductSchema({
  name,
  description,
  price,
  priceCurrency = 'GBP',
  priceValidUntil = '2027-01-01',
  url,
  ratingValue = '4.9',
  reviewCount = 847,
}: ProductSchemaOptions) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    brand: {
      '@type': 'Brand',
      name: BRAND,
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}${url}`,
      priceCurrency,
      price,
      priceValidUntil,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: BRAND,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating: '5',
      worstRating: '1',
      reviewCount,
    },
  }
}

/* ============================================================
   Homepage — three Product schemas (Standard, Premium, Family)
   ============================================================ */

export function buildAllPricingSchemas() {
  return [
    buildProductSchema({
      name: 'IPTV UK Standard Monthly Subscription',
      description:
        'Monthly rolling IPTV subscription for the UK. Access 35,000+ channels, 100,000+ VODs, HD and Full HD quality. Cancel anytime.',
      price: '9.99',
      url: '/plans/',
    }),
    buildProductSchema({
      name: 'IPTV UK Premium Annual Subscription',
      description:
        'Best value annual IPTV subscription for UK viewers. 35,000+ channels, 100,000+ VODs, 4K Ultra HD, EPG guide, and catch-up TV. Less than £0.22/day.',
      price: '79.99',
      url: '/plans/',
      reviewCount: 1203,
    }),
    buildProductSchema({
      name: 'IPTV UK Family Plan — 5 Connections',
      description:
        'Annual IPTV family subscription for UK households. Up to 5 simultaneous connections, 35,000+ channels, 100,000+ VODs, family-friendly filter.',
      price: '129.99',
      url: '/plans/',
      reviewCount: 412,
    }),
  ]
}

/* ============================================================
   LocalBusiness / Service — trust signal
   ============================================================ */

export function buildServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'IPTV UK Subscription Service',
    serviceType: 'Internet Protocol Television (IPTV)',
    provider: {
      '@type': 'Organization',
      name: BRAND,
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    description:
      'Premium IPTV subscription service for the UK. Watch 35,000+ live channels and 100,000+ on-demand movies and series on any device.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'GBP',
      lowPrice: '9.99',
      highPrice: '129.99',
      offerCount: 3,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      reviewCount: 2462,
    },
  }
}

/* ============================================================
   Homepage FAQ — canonical Q&As
   ============================================================ */

export const homepageFAQs: Array<{ question: string; answer: string }> = [
  {
    question: 'What is IPTV and how does it work in the UK?',
    answer:
      'IPTV (Internet Protocol Television) delivers live TV channels and on-demand video over your broadband connection instead of through a satellite dish or cable. In the UK, you need a stable broadband connection of at least 10 Mbps for HD or 25 Mbps for 4K. Our service works on Firestick, Android TV, Smart TVs, and mobile devices.',
  },
  {
    question: 'Which UK channels are included in the subscription?',
    answer:
      'Our IPTV UK subscription includes 5,000+ UK and US channels including BBC One, ITV, Channel 4, Channel 5, Sky Sports, BT Sport, Premier League matches, and much more. We also carry 35,000+ international channels across 80+ countries.',
  },
  {
    question: 'What devices can I use to watch IPTV UK?',
    answer:
      'Our IPTV UK subscription works on Amazon Firestick, Android TV boxes, Samsung and LG Smart TVs, Android and iOS smartphones, tablets, MAG boxes, and any device with IPTV Smarters, TiviMate, or a compatible app installed.',
  },
  {
    question: 'How do I get started after purchasing a plan?',
    answer:
      'After purchasing, message us on WhatsApp and we\'ll send your login credentials within 15 minutes during UK business hours. You\'ll receive your M3U playlist URL or Xtream Codes login to use with your preferred IPTV player. We also provide a step-by-step setup guide.',
  },
  {
    question: 'Is there a free trial available for IPTV UK?',
    answer:
      'Yes, we offer a premium 24-hour free trial with access to all channels and VODs. Trials are limited to 20 per day to maintain service quality. Click the "Free Trial" button to request yours via WhatsApp — we respond quickly.',
  },
  {
    question: 'What is the uptime guarantee for your IPTV service?',
    answer:
      'We deliver 99.9% uptime across our UK and international channel lineup. Our server infrastructure uses geographically distributed nodes to ensure minimal buffering even during peak times like Premier League matches and major sporting events.',
  },
  {
    question: 'Can I watch Premier League and other UK sport on IPTV?',
    answer:
      'Yes. Our IPTV UK subscription includes comprehensive sports coverage — Premier League, Championship, FA Cup, Carabao Cup, Formula 1, Wimbledon, Six Nations Rugby, and more through Sky Sports, BT Sport, and TNT Sports channels.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer:
      'Yes. All paid plans come with a 7-day money-back guarantee. If you are not completely satisfied with the service within the first 7 days, contact us via WhatsApp and we will issue a full refund — no questions asked.',
  },
  {
    question: 'How many simultaneous connections do I get?',
    answer:
      'Our Standard plan includes 1 connection, Premium Annual includes 2 connections, and the Family plan includes 4 simultaneous connections. This means multiple people in your household can watch different channels on different devices at the same time.',
  },
  {
    question: 'What internet speed do I need for IPTV UK?',
    answer:
      'For standard HD (720p) channels, a minimum of 10 Mbps download speed is recommended. For Full HD (1080p) streams, we recommend 15 Mbps. For 4K Ultra HD streams, you will need at least 25 Mbps dedicated to the IPTV stream. Most UK broadband connections comfortably exceed these requirements.',
  },
  {
    question: 'Is a VPN required to use your IPTV UK service?',
    answer:
      'No VPN is required. Our service is designed to work without a VPN on any UK or international broadband connection. If you are watching from outside the UK, a VPN is not needed either — our service works globally. However, if your ISP throttles streaming traffic, a VPN can help improve performance.',
  },
  {
    question: 'Which IPTV player apps do you recommend?',
    answer:
      'For Firestick and Android TV: TiviMate (best experience), IPTV Smarters Pro, or GSE Smart IPTV. For Samsung and LG Smart TVs: IPTV Smarters or SS IPTV. For iPhone/iPad: GSE Smart IPTV or IPTV Smarters Pro. For Android phones: TiviMate or IPTV Smarters Pro. All are free to download.',
  },
  {
    question: 'Do you include VOD (on-demand movies and TV shows)?',
    answer:
      'Yes. Our subscription includes 100,000+ Video on Demand titles — movies and TV series. The VOD library covers new releases, Hollywood blockbusters, UK series, and international content. Premium Annual and Family plans get priority access to new VOD additions.',
  },
  {
    question: 'Can I record live TV with your IPTV service?',
    answer:
      'Yes, if your IPTV player supports PVR (Personal Video Recorder) functionality. TiviMate on Firestick and Android TV supports recording to external storage. The recording feature is handled entirely by your player app — our service provides the stream, and TiviMate handles the recording locally.',
  },
  {
    question: 'How quickly will I receive my subscription credentials?',
    answer:
      'Credentials are delivered within 15 minutes of purchase during UK business hours (9am–10pm). For orders placed overnight, delivery is typically within 30 minutes of the next business day opening. All credentials are sent via WhatsApp with your M3U URL and Xtream Codes login details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept PayPal, all major credit and debit cards (Visa, Mastercard, American Express), bank transfers, and cryptocurrency (Bitcoin, Ethereum, USDT). Cryptocurrency payments receive a 10% discount. All payments are processed securely.',
  },
  {
    question: 'Can I upgrade my plan after purchasing?',
    answer:
      'Yes. You can upgrade from Standard to Premium Annual or Family plan at any time. Contact us via WhatsApp with your account details and we will apply a pro-rated credit from your current plan toward the upgrade cost.',
  },
  {
    question: 'Does the service work outside the UK?',
    answer:
      'Yes. Our IPTV UK subscription works from any country worldwide. Whether you are in Spain, the USA, Australia, or anywhere else, you can watch all UK channels and international content without geo-restrictions. No VPN required.',
  },
  {
    question: 'What happens if a channel goes down?',
    answer:
      'Our team monitors channel status 24/7. If a channel goes down, it is typically restored within 2 hours. For major channels (BBC, ITV, Sky Sports), restoration time is usually under 30 minutes. You can report a specific channel issue via WhatsApp and we will prioritise it.',
  },
]
