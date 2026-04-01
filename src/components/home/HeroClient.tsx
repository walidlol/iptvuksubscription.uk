"use client";

import { motion, type Easing } from "framer-motion";
import Link from "next/link";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447451296412";

const TRUST_BADGES = [
  { label: "30,000+ Channels", icon: "📡" },
  { label: "4K Quality", icon: "✨" },
  { label: "99.9% Uptime", icon: "⚡" },
  { label: "24/7 Support", icon: "🛡️" },
] as const;

const EASE: Easing = [0.25, 0.1, 0.25, 1];

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: EASE },
    },
  } as const;
}

export default function HeroClient() {
  const subtitle = fadeUp(0.2);
  const buttons = fadeUp(0.4);
  const badges = fadeUp(0.6);

  return (
    <>
      {/* Subtitle */}
      <motion.p
        initial={subtitle.initial}
        animate={subtitle.animate}
        className="mt-4 text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
      >
        Your premium IPTV UK subscription for live sports, Sky Sports,
        Premier League, movies, and 30,000+ channels in stunning 4K quality.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={buttons.initial}
        animate={buttons.animate}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to get started with the IPTV UK subscription at £9.99/mo.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-brand-red hover:bg-brand-red-hover text-text-primary font-semibold rounded-lg transition-colors text-center shadow-brand-glow hover:shadow-lg"
        >
          Get Started &mdash; &pound;9.99/mo
        </Link>
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'd like to try a free trial of your IPTV UK service.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 border border-border text-text-primary font-medium rounded-lg hover:bg-bg-elevated/50 transition-colors text-center backdrop-blur-sm"
        >
          Free Trial via WhatsApp
        </Link>
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        initial={badges.initial}
        animate={badges.animate}
        className="mt-10 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3"
      >
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 text-sm text-text-muted"
          >
            <span className="text-base" aria-hidden="true">
              {badge.icon}
            </span>
            <span>{badge.label}</span>
          </div>
        ))}
      </motion.div>
    </>
  );
}
