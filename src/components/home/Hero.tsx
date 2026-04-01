import Image from "next/image";
import { getHeroBackdrop } from "@/lib/tmdb";
import HeroClient from "./HeroClient";

export default async function Hero() {
  const heroItem = await getHeroBackdrop();

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-bg-hero">
      {/* Backdrop Image */}
      {heroItem?.backdropUrl ? (
        <Image
          src={heroItem.backdropUrl}
          alt="Featured content backdrop"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      ) : (
        /* CSS gradient fallback when TMDB is unavailable */
        <div className="absolute inset-0 bg-gradient-to-br from-bg-hero via-bg-primary to-bg-surface" />
      )}

      {/* Gradient overlays — bottom fade + left fade (Disney+ style) */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-gradient-left" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-hero/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          {/* H1 — LCP element, NO animation delay, rendered server-side */}
          <h1 className="font-heading text-hero-h1 uppercase text-text-primary leading-none">
            The UK&apos;s #1 IPTV Subscription
          </h1>

          {/* Client-side animated elements */}
          <HeroClient />
        </div>
      </div>

      {/* Bottom edge gradient for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
