"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const TESTIMONIALS = [
  {
    initials: "JW",
    name: "James Wilson",
    location: "London",
    rating: 5,
    quote:
      "The Premier League streams are flawless — every kick-off on time, full HD, zero buffering. Cancelled Sky Sports the same day I signed up. Best IPTV UK subscription I've tried by far.",
  },
  {
    initials: "ST",
    name: "Sarah Thompson",
    location: "Manchester",
    rating: 5,
    quote:
      "Set up in under 5 minutes on my Firestick. The 7-day catch-up feature alone is worth it. Crystal clear picture and not a single buffering issue in two months of daily use.",
  },
  {
    initials: "DC",
    name: "David Clark",
    location: "Birmingham",
    rating: 5,
    quote:
      "Brilliant value. The VOD library is massive — more films than Netflix and Amazon combined. Eight months as a subscriber and I've never had an outage during a live match.",
  },
  {
    initials: "ER",
    name: "Emma Roberts",
    location: "Glasgow",
    rating: 5,
    quote:
      "Kids' channels, news, sports — all on one subscription across every screen in the house. The WhatsApp support team responds in minutes. Couldn't be happier.",
  },
  {
    initials: "MK",
    name: "Michael Kavanagh",
    location: "Leeds",
    rating: 5,
    quote:
      "Switched from a different IPTV provider and the difference is night and day. No freezing on Champions League nights, proper EPG guide, and the annual price is unbeatable.",
  },
  {
    initials: "LH",
    name: "Lauren Hughes",
    location: "Bristol",
    rating: 5,
    quote:
      "I was sceptical at first but the free trial convinced me instantly. The picture quality on my LG OLED is stunning. Setup was straightforward and support walked me through every step.",
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
      ))}
    </div>
  );
}

const VISIBLE = 3; // cards visible at once on desktop
const AUTO_INTERVAL = 4500;

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = TESTIMONIALS.length;

  function advance(dir: 1 | -1) {
    setDirection(dir);
    setIndex((prev) => (prev + dir + total) % total);
  }

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetTimer(dir: 1 | -1) {
    if (timerRef.current) clearInterval(timerRef.current);
    advance(dir);
    timerRef.current = setInterval(() => advance(1), AUTO_INTERVAL);
  }

  // Which indices are visible
  const visibleIndices = Array.from({ length: VISIBLE }, (_, i) => (index + i) % total);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section id="reviews" className="bg-bg-surface py-16 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            What Our Subscribers Say
          </h2>
          <p className="mt-3 text-text-secondary max-w-xl mx-auto">
            Thousands of UK households trust us for their daily entertainment.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[220px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleIndices.map((tIdx) => {
                const t = TESTIMONIALS[tIdx];
                return (
                  <motion.div
                    key={`${tIdx}-${index}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex flex-col p-6 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]"
                  >
                    <Stars count={t.rating} />
                    <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-5">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-9 h-9 rounded-full bg-[rgba(24,57,73,0.4)] border border-[rgba(24,57,73,0.5)] flex items-center justify-center shrink-0">
                        <span className="text-xs font-semibold text-text-secondary tracking-wide">
                          {t.initials}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary leading-none mb-0.5">
                          {t.name}
                        </p>
                        <p className="text-xs text-text-muted">{t.location}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => resetTimer(-1)}
              aria-label="Previous review"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-text-muted" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-5 bg-text-secondary" : "w-1.5 bg-[rgba(255,255,255,0.2)]"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => resetTimer(1)}
              aria-label="Next review"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
