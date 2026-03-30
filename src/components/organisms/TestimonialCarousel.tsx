'use client'

import { Star } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const TESTIMONIALS = [
  {
    name:   'James H.',
    city:   'London',
    rating: 5,
    body:   "Switched from Sky Sports last year and genuinely haven't looked back. Picture quality is stunning — watching the Premier League in 4K on my Samsung TV is unreal. Setup took about 10 minutes. Best decision I've made.",
    plan:   'Premium Annual',
    col:    0,
  },
  {
    name:   'Sarah T.',
    city:   'Manchester',
    rating: 5,
    body:   "Got the Family Plan for Christmas and the whole household uses it. Kids on tablets, husband on the TV, me on my phone — all at the same time without any buffering. Incredible value.",
    plan:   'Family Plan',
    col:    1,
  },
  {
    name:   'Mohammed A.',
    city:   'Birmingham',
    rating: 5,
    body:   "Every single channel works perfectly. The WhatsApp support responded within 5 minutes when I needed help with my Firestick setup. Best IPTV service I've used — and I've tried four others.",
    plan:   'Standard',
    col:    2,
  },
  {
    name:   'Callum R.',
    city:   'Glasgow',
    rating: 5,
    body:   "Tried two other IPTV services before this one. Neither came close — constant buffering during live sport. This one has been rock solid for 8 months. Never missed a Celtic match.",
    plan:   'Premium Annual',
    col:    0,
  },
  {
    name:   'Priya M.',
    city:   'Leeds',
    rating: 5,
    body:   "The catch-up TV feature is a game changer. I work shifts so I miss a lot of live TV — being able to go back 7 days on BBC and ITV is perfect.",
    plan:   'Premium Annual',
    col:    1,
  },
  {
    name:   'Daniel F.',
    city:   'Bristol',
    rating: 5,
    body:   "Started with the free trial on a Saturday, watching F1 qualifying and Premier League. Bought the annual plan before the trial even ended. Best £79.99 I've spent this year.",
    plan:   'Premium Annual',
    col:    2,
  },
] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-[#E8392A] fill-[#E8392A]' : 'text-[#374151]'}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function TestimonialCard({
  t,
  delay,
}: {
  t: (typeof TESTIMONIALS)[number]
  delay: number
}) {
  return (
    <article
      data-reveal=""
      data-reveal-delay={String(delay)}
      aria-label={`Review from ${t.name} in ${t.city}`}
      className="relative bg-[#111111] border border-white/[0.08] rounded-xl p-6 flex flex-col gap-4 hover:border-[rgba(232,57,42,0.3)] hover:shadow-[0_0_30px_rgba(232,57,42,0.12)] transition-all duration-300 mb-5"
    >
      {/* Large red quote mark */}
      <span
        className="absolute -top-5 left-4 text-[#E8392A] pointer-events-none select-none"
        style={{ fontFamily: 'Bebas Neue, serif', fontSize: '80px', lineHeight: 1, opacity: 0.55 }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <StarRating rating={t.rating} />

      <blockquote className="font-sans text-[#9CA3AF] text-sm leading-relaxed flex-1 pt-1">
        {t.body}
      </blockquote>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
        <div>
          <p className="font-ui text-sm font-semibold text-[#F5F5F5]">{t.name}</p>
          <p className="font-ui text-xs text-[#9CA3AF]">{t.city}</p>
        </div>
        <span
          className="font-ui text-[10px] text-[#9CA3AF] border border-white/10 rounded px-2 py-0.5"
        >
          {t.plan}
        </span>
      </div>
    </article>
  )
}

export default function TestimonialCarousel() {
  useScrollReveal()

  /* Split into 3 columns for masonry layout */
  const col0 = TESTIMONIALS.filter(t => t.col === 0)
  const col1 = TESTIMONIALS.filter(t => t.col === 1)
  const col2 = TESTIMONIALS.filter(t => t.col === 2)

  return (
    <section className="py-20 bg-[#0A0A0A] overflow-hidden" aria-labelledby="reviews-heading">
      <div className="container">

        {/* Header */}
        <div data-reveal="" className="mb-12">
          <h2
            id="reviews-heading"
            className="font-display text-display text-[#F5F5F5] uppercase"
          >
            What UK <span style={{ color: '#E8392A' }}>Subscribers</span> Say
          </h2>
          <p data-reveal="" data-reveal-delay="100" className="font-sans text-[#9CA3AF] mt-3">
            Rated 4.9 / 5 by over 2,400 UK customers
          </p>
        </div>

        {/* 3-column masonry grid — stacks to 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {/* Column 0 */}
          <div>
            {col0.map((t, i) => (
              <TestimonialCard key={`${t.name}-${t.city}`} t={t} delay={i * 120} />
            ))}
          </div>

          {/* Column 1 — offset down on desktop */}
          <div className="md:pt-10">
            {col1.map((t, i) => (
              <TestimonialCard key={`${t.name}-${t.city}`} t={t} delay={80 + i * 120} />
            ))}
          </div>

          {/* Column 2 — offset down further */}
          <div className="md:pt-20">
            {col2.map((t, i) => (
              <TestimonialCard key={`${t.name}-${t.city}`} t={t} delay={160 + i * 120} />
            ))}
          </div>
        </div>

        {/* View all link */}
        <div data-reveal="" className="text-center mt-10">
          <a
            href="/reviews/"
            className="font-ui text-sm text-[#9CA3AF] hover:text-[#E8392A] transition-colors underline underline-offset-2"
          >
            Read all 2,400+ reviews →
          </a>
        </div>

      </div>
    </section>
  )
}
