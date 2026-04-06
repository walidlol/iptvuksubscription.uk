import Image from "next/image";
import { getHeroBackdrop } from "@/lib/tmdb";
import HeroClient from "./HeroClient";
import CinematicShapes from "@/components/ui/CinematicShapes";

export default async function Hero() {
  const heroItem = await getHeroBackdrop();
  const hasBackdrop = Boolean(heroItem?.backdropUrl);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-cinematic">
      {/* ── Backdrop image (TMDB) ── */}
      {hasBackdrop && heroItem?.backdropUrl ? (
        <Image
          src={heroItem.backdropUrl}
          alt="Featured content backdrop"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
      ) : null}

      {/* ── Cinematic shapes — subtle when backdrop is present ── */}
      <CinematicShapes subtle={hasBackdrop} />

      {/* ── Gradient overlays — bottom + left fade ── */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-hero-gradient-left" />

      {/* ── Vignette darkens top edge when no backdrop ── */}
      {!hasBackdrop && (
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black/30" />
      )}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-32 w-full">
        <div className="max-w-2xl">
          {/* H1 — LCP element, NO animation delay, server-rendered */}
          <h1 className="font-heading text-hero-h1 uppercase text-text-primary leading-none">
            The UK&apos;s #1 IPTV Subscription
          </h1>

          {/* Animated subtitle, CTAs, trust badges */}
          <HeroClient />
        </div>
      </div>

      {/* ── Bottom edge fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
