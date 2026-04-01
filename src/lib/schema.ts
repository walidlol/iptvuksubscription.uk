// ─── JSON-LD Schema Builders ───
// All functions return plain objects for serialization via
// <script type="application/ld+json">.

const SITE_URL = "https://iptvuksubscription.uk";
const SITE_NAME = "IPTV UK Subscription";
const WHATSAPP_NUMBER = "+447451296412";

// ─── WebSite Schema ───

export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      "Premium IPTV UK subscription with 30,000+ live channels, 4K quality, and 99.9% uptime.",
    inLanguage: "en-GB",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Organization Schema ───

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: WHATSAPP_NUMBER,
      contactType: "customer service",
      availableLanguage: "English",
      areaServed: "GB",
    },
    sameAs: [
      `https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`,
    ],
  };
}

// ─── BreadcrumbList Schema ───

interface BreadcrumbItem {
  readonly name: string;
  readonly url: string;
}

export function buildBreadcrumbSchema(items: readonly BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url ?? SITE_URL}/#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── WebPage Schema ───

interface WebPageInput {
  readonly name: string;
  readonly description: string;
  readonly url: string;
}

export function buildWebPageSchema(page: WebPageInput) {
  return {
    "@type": "WebPage",
    "@id": `${page.url}/#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-GB",
  };
}

// ─── Service Schema ───

export function buildServiceSchema() {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "IPTV UK Subscription Service",
    description:
      "Premium IPTV streaming service for the UK with 30,000+ live channels, 4K quality, 99.9% uptime, and support for all major devices.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
    serviceType: "IPTV Streaming Service",
    offers: [
      buildOfferSchema({
        name: "Monthly Plan",
        price: "9.99",
        priceCurrency: "GBP",
        billingPeriod: "P1M",
        url: `${SITE_URL}/plans`,
      }),
      buildOfferSchema({
        name: "Annual Plan",
        price: "59",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/plans`,
      }),
      buildOfferSchema({
        name: "Family Plan",
        price: "129.99",
        priceCurrency: "GBP",
        billingPeriod: "P1Y",
        url: `${SITE_URL}/plans`,
      }),
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "2847",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

// ─── Offer Schema ───

interface OfferInput {
  readonly name: string;
  readonly price: string;
  readonly priceCurrency: string;
  readonly billingPeriod: string;
  readonly url: string;
}

export function buildOfferSchema(offer: OfferInput) {
  return {
    "@type": "Offer",
    name: offer.name,
    url: offer.url,
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      billingDuration: offer.billingPeriod,
    },
    availability: "https://schema.org/InStock",
    seller: { "@id": `${SITE_URL}/#organization` },
  };
}

// ─── FAQPage Schema ───

interface FAQInput {
  readonly question: string;
  readonly answer: string;
}

export function buildFAQSchema(items: readonly FAQInput[]) {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ─── Homepage @graph Builder ───

export function buildHomepageSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebSiteSchema(),
      buildOrganizationSchema(),
      buildBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
      ]),
      buildWebPageSchema({
        name: "IPTV UK Subscription | #1 Premium IPTV Service in the UK",
        description:
          "Premium IPTV UK subscription with 30,000+ channels, 4K quality, and 99.9% uptime. Watch live UK sports, Sky Sports, Premier League, and more from £9.99/mo.",
        url: SITE_URL,
      }),
      buildServiceSchema(),
    ],
  };
}
