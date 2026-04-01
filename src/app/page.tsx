import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ContentRowServer from "@/components/home/ContentRowServer";
import PricingCards from "@/components/home/PricingCards";
import DeviceSection from "@/components/home/DeviceSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";
import { buildHomepageSchema } from "@/lib/schema";
import {
  getSportsContent,
  getUKDrama,
  getPopularMovies,
  getKidsContent,
  getInternationalContent,
  getNewsContent,
} from "@/lib/tmdb";

// ─── Skeletons ───

function HeroSkeleton() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-bg-hero via-bg-primary to-bg-surface" />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-gradient-left" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          <div className="h-16 sm:h-20 w-full max-w-lg bg-bg-elevated/50 rounded-lg animate-pulse" />
          <div className="mt-4 h-12 w-full max-w-md bg-bg-elevated/30 rounded-lg animate-pulse" />
          <div className="mt-8 flex gap-4">
            <div className="h-12 w-48 bg-bg-elevated/40 rounded-lg animate-pulse" />
            <div className="h-12 w-48 bg-bg-elevated/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RowSkeleton() {
  return (
    <div className="py-6">
      <div className="h-10 w-48 bg-bg-elevated/40 rounded-lg animate-pulse mx-4 sm:mx-6 lg:mx-8 mb-4" />
      <div className="flex gap-3 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[150px] min-w-[150px] aspect-[2/3] bg-bg-elevated/30 rounded-lg animate-pulse shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Row Definitions ───

const CONTENT_ROWS = [
  { title: "UK Sports & Reality", fetchFn: getSportsContent, size: "backdrop" as const, priority: true },
  { title: "UK Drama", fetchFn: getUKDrama, size: "poster" as const, priority: true },
  { title: "Trending Movies", fetchFn: getPopularMovies, size: "poster" as const, priority: false },
  { title: "Kids & Family", fetchFn: getKidsContent, size: "poster" as const, priority: false },
  { title: "International TV", fetchFn: getInternationalContent, size: "backdrop" as const, priority: false },
  { title: "News & Documentaries", fetchFn: getNewsContent, size: "poster" as const, priority: false },
] as const;

// ─── Page ───
// Section order per CLAUDE.md:
// 1. Hero  2. Stats Bar  3. Content Rows  4. Pricing
// 5. Devices  6. FAQ  7. Final CTA  8. Footer (in layout)

export default function Home() {
  return (
    <main>
      {/* JSON-LD Structured Data: WebSite + Organization + Service + Offers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHomepageSchema()),
        }}
      />

      {/* 1. HERO — full-width TMDB backdrop */}
      <Suspense fallback={<HeroSkeleton />}>
        <Hero />
      </Suspense>

      {/* 2. STATS BAR — will be added next session */}

      {/* 3. CONTENT ROWS — Disney+ horizontal scroll */}
      <section className="bg-bg-primary py-8 space-y-8">
        {CONTENT_ROWS.map((row) => (
          <Suspense key={row.title} fallback={<RowSkeleton />}>
            <ContentRowServer
              title={row.title}
              fetchFn={row.fetchFn}
              size={row.size}
              priority={row.priority}
            />
          </Suspense>
        ))}
      </section>

      {/* 4. PRICING — 3 plan cards, Disney+ style */}
      <PricingCards />

      {/* 5. DEVICES — 4 device categories */}
      <DeviceSection />

      {/* 6. FAQ — 6 questions, accordion + FAQPage schema */}
      <FAQSection />

      {/* 7. FINAL CTA — full-width brand-red */}
      <FinalCTA />

      {/* 8. FOOTER — rendered in layout.tsx */}
    </main>
  );
}
