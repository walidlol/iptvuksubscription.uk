"use client";

import { motion } from "framer-motion";
import { Tv2, Clock, Film, LayoutGrid, Zap, Smartphone } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "0px 0px -80px 0px" },
    transition: { duration: 0.5, delay, ease: EASE },
  } as const;
}

const FEATURES = [
  {
    Icon: Tv2,
    title: "30,000+ Live Channels",
    description:
      "Every major UK channel plus international sport, news, kids, and entertainment. Sky Sports, TNT Sports, BBC, ITV, Channel 4 — all in one place.",
  },
  {
    Icon: Clock,
    title: "7-Day Catch-Up TV",
    description:
      "Missed EastEnders or Match of the Day? Watch any show from the past seven days on demand — no extra charge, no extra app.",
  },
  {
    Icon: Film,
    title: "100,000+ VOD Library",
    description:
      "An ever-growing on-demand library of movies and full TV series updated daily. New cinema releases, classic UK drama, international content, and kids' titles.",
  },
  {
    Icon: LayoutGrid,
    title: "Full EPG Programme Guide",
    description:
      "A complete Electronic Programme Guide across all channels — browse what's on now and coming up next, just like Freeview or Sky.",
  },
  {
    Icon: Zap,
    title: "4K & Full HD Streaming",
    description:
      "Crystal-clear picture on any screen. Our high-speed servers deliver buffer-free 4K and Full HD even on standard UK broadband speeds.",
  },
  {
    Icon: Smartphone,
    title: "All Devices Supported",
    description:
      "One subscription covers Smart TV, Firestick, iPhone, Android, MAG Box, PC, and more. Watch at home or on the go with no extra cost.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div {...fadeUp()} className="text-center mb-14">
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Everything You Need for Perfect Entertainment
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto text-base leading-relaxed">
            From Premier League live streams to 100,000+ on-demand titles —
            your UK IPTV subscription includes it all, starting from just{" "}
            <strong className="text-text-primary">£9.99 per month</strong>.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              {...fadeUp(i * 0.08)}
              whileHover={{ y: -4 }}
              className="p-6 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all duration-300"
            >
              <div className="mb-4 w-11 h-11 flex items-center justify-center rounded-lg bg-[rgba(24,57,73,0.25)] border border-[rgba(24,57,73,0.35)]">
                <Icon className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-lg tracking-wider uppercase text-text-primary mb-2">
                {title}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
