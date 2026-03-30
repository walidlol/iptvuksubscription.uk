import { Suspense } from 'react'
import { buildHomepageMetadata } from '@/lib/seo'
import {
  buildFAQSchema,
  buildAllPricingSchemas,
  buildBreadcrumbSchema,
  homepageFAQs,
} from '@/lib/schema'
import {
  StatCounterBar,
  WhyUsSection,
  DeviceEcosystem,
  PricingTable,
  TestimonialCarousel,
  FAQSection,
  FinalCTA,
} from '@/components/organisms'
import HomepageContent        from '@/components/organisms/HomepageContent'
import HeroSectionServer      from '@/components/organisms/HeroSectionServer'
import ContentCarouselServer  from '@/components/organisms/ContentCarouselServer'
import LiveSportsSection      from '@/components/LiveSportsSection'
import TrendingVODSection     from '@/components/TrendingVODSection'
import NewsSection            from '@/components/NewsSection'
import { MatchCardSkeleton, PosterCardSkeleton, NewsCardSkeleton } from '@/components/ui/Skeleton'
import { WhyChooseUs, HowItWorks, WhatsIncluded, ResellerBanner } from '@/components/organisms/HomepageRich'

export const metadata = buildHomepageMetadata()
export const revalidate = 3600

/* ── Skeleton fallbacks for Suspense ── */
function SportsSkeleton() {
  return (
    <section className="bg-[#111111] py-16 min-h-[200px]">
      <div className="container">
        <div className="h-8 w-48 bg-[#1A1A1A] animate-pulse rounded mb-6" />
        <div className="flex gap-4 overflow-x-hidden">
          {Array.from({ length: 5 }).map((_, i) => <MatchCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}

function VODSkeleton() {
  return (
    <section className="section bg-[#0A0A0A] min-h-[300px]">
      <div className="container">
        <div className="h-8 w-40 bg-[#1A1A1A] animate-pulse rounded mb-8" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }).map((_, i) => <PosterCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}

function NewsSkeleton() {
  return (
    <section className="section bg-[#111111] min-h-[200px]">
      <div className="container">
        <div className="h-8 w-56 bg-[#1A1A1A] animate-pulse rounded mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <NewsCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const faqSchema      = buildFAQSchema(homepageFAQs)
  const pricingSchemas = buildAllPricingSchemas()
  const breadcrumb     = buildBreadcrumbSchema([{ name: 'Home', path: '/' }])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {pricingSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main id="main-content" className="relative z-[20] flex flex-col flex-1">
        {/* 1. Hero — TMDB floating poster cards */}
        <HeroSectionServer />

        {/* 2. Stats bar */}
        <StatCounterBar />
        <div className="divider" />

        {/* 3. Live Sports — Premier League fixtures */}
        <Suspense fallback={<SportsSkeleton />}>
          <LiveSportsSection />
        </Suspense>
        <div className="divider" />

        {/* 4. Why Us */}
        <WhyUsSection />
        <div className="divider" />

        {/* 5. Netflix rows — TMDB posters */}
        <ContentCarouselServer />
        <div className="divider" />

        {/* 6. Trending VOD — TMDB trending grid */}
        <Suspense fallback={<VODSkeleton />}>
          <TrendingVODSection />
        </Suspense>
        <div className="divider" />

        {/* 7. Device ecosystem */}
        <DeviceEcosystem />
        <div className="divider" />

        {/* 8. Pricing */}
        <PricingTable />
        <div className="divider" />

        {/* 9. Testimonials */}
        <TestimonialCarousel />
        <div className="divider" />

        {/* 10. Why 100k subscribers chose us */}
        <WhyChooseUs />
        <div className="divider" />

        {/* 11. How it works */}
        <HowItWorks />
        <div className="divider" />

        {/* 12. What's included in every plan */}
        <WhatsIncluded />
        <div className="divider" />

        {/* 13. Homepage long-form SEO content */}
        <HomepageContent />
        <div className="divider" />

        {/* 14. FAQ */}
        <FAQSection />

        {/* 15. News */}
        <Suspense fallback={<NewsSkeleton />}>
          <NewsSection />
        </Suspense>
        <div className="divider" />

        {/* 16. Reseller callout */}
        <ResellerBanner />
        <div className="divider" />

        {/* 17. Final CTA */}
        <FinalCTA />
      </main>
    </>
  )
}
