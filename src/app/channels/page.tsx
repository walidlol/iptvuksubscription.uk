import type { Metadata } from "next";
import { Suspense } from "react";
import { Tv } from "lucide-react";
import ChannelsContent from "./ChannelsContent";
import ContentRowServer from "@/components/home/ContentRowServer";
import CinematicShapes from "@/components/ui/CinematicShapes";
import {
  getPopularMovies,
  getUKDrama,
  getKidsContent,
  getInternationalContent,
} from "@/lib/tmdb";

export const metadata: Metadata = {
  title: "IPTV UK Channel List",
  description:
    "Browse our complete IPTV UK channel list. 30,000+ live channels including Sky Sports, Premier League, BBC, ITV, movies, kids, news and international channels.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://iptvuksubscription.uk/channels" },
};

const CONTENT_ROWS = [
  {
    title: "Trending Movies",
    fetchFn: getPopularMovies,
    size: "poster" as const,
  },
  {
    title: "UK Drama",
    fetchFn: getUKDrama,
    size: "poster" as const,
  },
  {
    title: "Kids & Family",
    fetchFn: getKidsContent,
    size: "poster" as const,
  },
  {
    title: "International TV",
    fetchFn: getInternationalContent,
    size: "backdrop" as const,
  },
] as const;

function RowSkeleton() {
  return (
    <div className="py-6">
      <div className="h-9 w-44 bg-white/[0.04] rounded-lg animate-pulse mx-4 sm:mx-6 lg:mx-8 mb-4" />
      <div className="flex gap-3 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[150px] min-w-[150px] aspect-[2/3] bg-white/[0.03] rounded-xl animate-pulse shrink-0"
          />
        ))}
      </div>
    </div>
  );
}

export default function ChannelsPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* ── Hero ── */}
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.12)]">
              <Tv size={20} className="text-text-secondary" />
            </div>
            <span className="text-sm text-text-muted uppercase tracking-widest font-medium">
              Premium Content
            </span>
          </div>

          <h1 className="font-heading text-section-h2 uppercase text-text-primary">
            IPTV UK Channel List
          </h1>
          <p className="mt-3 text-text-secondary max-w-2xl">
            Access over 30,000 live TV channels from the UK and around the
            world, plus 100,000+ on-demand VODs. Search and browse by category
            below.
          </p>
        </div>
      </section>

      {/* ── Channel browser (search + pills) ── */}
      <section className="bg-bg-primary">
        <ChannelsContent />
      </section>

      {/* ── TMDB content rows ── */}
      <section className="bg-bg-surface py-10 space-y-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-2">
          <h2 className="font-heading text-xl tracking-widest text-text-primary uppercase">
            What&apos;s Streaming Now
          </h2>
        </div>
        {CONTENT_ROWS.map((row) => (
          <Suspense key={row.title} fallback={<RowSkeleton />}>
            <ContentRowServer
              title={row.title}
              fetchFn={row.fetchFn}
              size={row.size}
            />
          </Suspense>
        ))}
      </section>
    </main>
  );
}
