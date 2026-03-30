'use client'

import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export default function FinalCTA() {
  useScrollReveal()

  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: '#E8392A' }}
      aria-labelledby="final-cta-heading"
    >
      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.06, background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")' }}
        aria-hidden="true"
      />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display text-white/[0.04] uppercase select-none whitespace-nowrap"
          style={{ fontSize: 'clamp(6rem, 20vw, 18rem)', lineHeight: 1 }}
        >
          WATCH NOW
        </span>
      </div>

      <div className="container relative z-10 text-center">

        <h2
          id="final-cta-heading"
          data-reveal=""
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', lineHeight: 1, marginBottom: '1.5rem' }}
        >
          Ready to Watch?
        </h2>

        <p
          data-reveal=""
          data-reveal-delay="100"
          className="font-sans text-white/80 text-lg sm:text-xl max-w-xl mx-auto mb-10"
        >
          35,000+ live channels. 4K quality. Cancel any time.
          Your first month from £9.99.
        </p>

        <div
          data-reveal=""
          data-reveal-delay="200"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/plans/"
            className="inline-flex items-center justify-center font-display uppercase tracking-widest text-[#E8392A] bg-white px-10 py-4 transition-all duration-200 hover:bg-[#F5F5F5] hover:shadow-xl"
            style={{ borderRadius: '2px', fontSize: '1.1rem' }}
          >
            Get Started — From £9.99
          </Link>

          <a
            href="https://wa.me/447451296412?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-display uppercase tracking-widest text-white border-2 border-white/60 px-10 py-4 transition-all duration-200 hover:border-white hover:bg-white/10"
            style={{ borderRadius: '2px', fontSize: '1.1rem' }}
          >
            Free 24-Hour Trial
          </a>
        </div>

        <p
          data-reveal=""
          data-reveal-delay="300"
          className="font-ui text-[13px] text-white/60 mt-8 uppercase tracking-widest"
        >
          No contracts · 7-day money-back guarantee · Setup in 5 minutes
        </p>

      </div>
    </section>
  )
}
