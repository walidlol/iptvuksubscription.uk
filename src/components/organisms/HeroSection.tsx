'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Zap, Clock, Star } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ============================================================
   Floating poster card data — background gradient placeholder
   Place real images at public/images/content/<id>.jpg
   ============================================================ */

const POSTER_CARD_META = [
  { id: 'premier-league', label: 'Premier League',  color: 'from-blue-900 to-blue-950',       top: '15%', left: '4%',  width: 200, rotate: -12, speed: 0.04 },
  { id: 'bbc-drama',      label: 'BBC Drama',        color: 'from-red-900 to-red-950',         top: '45%', left: '2%',  width: 160, rotate: -6,  speed: 0.07 },
  { id: 'movies',         label: 'Movies',           color: 'from-purple-900 to-purple-950',   top: '65%', left: '8%',  width: 180, rotate: -14, speed: 0.05 },
  { id: 'sky-sports',     label: 'Sky Sports',       color: 'from-sky-900 to-sky-950',         top: '10%', right: '4%', width: 220, rotate: 10,  speed: 0.06 },
  { id: 'tv-shows',       label: 'TV Shows',         color: 'from-emerald-900 to-emerald-950', top: '50%', right: '2%', width: 170, rotate: 7,   speed: 0.04 },
  { id: 'international',  label: 'International',    color: 'from-orange-900 to-orange-950',   top: '72%', right: '7%', width: 190, rotate: 14,  speed: 0.08 },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'No Contract'     },
  { icon: Zap,    label: 'Setup in 5 min'  },
  { icon: Clock,  label: '7-day guarantee' },
  { icon: Star,   label: '4K Quality'      },
]

/* ============================================================
   Component
   ============================================================ */

interface HeroSectionProps {
  /** TMDB poster URLs for the 6 floating cards (index-matched to POSTER_CARD_META) */
  posterImageUrls?: (string | null)[]
}

export default function HeroSection({ posterImageUrls = [] }: HeroSectionProps) {
  const containerRef  = useRef<HTMLDivElement>(null)
  const h1Ref         = useRef<HTMLHeadingElement>(null)
  const ctaRef        = useRef<HTMLAnchorElement>(null)
  const posterRefs    = useRef<(HTMLDivElement | null)[]>([])
  const reduced       = useReducedMotion()

  /* Build card list with TMDB overrides merged in */
  const POSTER_CARDS = POSTER_CARD_META.map((meta, i) => ({
    ...meta,
    posterUrl: posterImageUrls[i] ?? null,
  }))

  /* ── Word-by-word H1 reveal ── */
  useEffect(() => {
    const el = h1Ref.current
    if (!el) return
    const words = Array.from(el.querySelectorAll<HTMLElement>('[data-hw]'))
    if (!words.length) return

    if (reduced) {
      words.forEach(w => { w.style.opacity = '1'; w.style.transform = 'none' })
      return
    }
    ;(async () => {
      const { animate } = await import('animejs')
      animate(words, {
        opacity:    [0, 1],
        translateY: [60, 0],
        duration:   700,
        delay:      (_, i) => 80 + i * 80,
        ease:       'outExpo',
      })
    })()
  }, [reduced])

  /* ── CTA magnetic pulse ── */
  useEffect(() => {
    const el = ctaRef.current
    if (!el || reduced) return
    ;(async () => {
      const { animate } = await import('animejs')
      animate(el, {
        scale: [1, 1.04, 1],
        duration: 2200,
        ease: 'inOutSine',
        loop: true,
        delay: 2000,
      })
    })()
  }, [reduced])

  /* ── Poster cards parallax on mouse move ── */
  useEffect(() => {
    if (reduced) return
    const cards = posterRefs.current.filter(Boolean) as HTMLDivElement[]

    function onMouseMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window
      const mx = (e.clientX / innerWidth  - 0.5) * 2   // -1 to 1
      const my = (e.clientY / innerHeight - 0.5) * 2   // -1 to 1

      cards.forEach((card, i) => {
        const speed = POSTER_CARDS[i]?.speed ?? 0.05
        const dx    = mx * -50 * speed
        const dy    = my * -30 * speed
        card.style.transform = `translate(${dx}px, ${dy}px) rotate(${POSTER_CARDS[i]?.rotate ?? 0}deg)`
      })
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [reduced])

  /* ── Eyebrow + subline fade in ── */
  useEffect(() => {
    if (reduced) return
    ;(async () => {
      const { animate } = await import('animejs')
      animate('[data-hero-fade]', {
        opacity:    [0, 1],
        translateY: [20, 0],
        duration:   600,
        delay:      (_, i) => 900 + i * 150,
        ease:       'outExpo',
      })
    })()
  }, [reduced])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0A0A0A] pt-16"
      aria-label="Hero — IPTV UK Subscription"
    >
      {/* ── Background image (optional — shows gradient if missing) ── */}
      <div className="absolute inset-0 z-[5]" aria-hidden="true">
        <Image
          src="/images/hero/hero-bg.jpg"
          alt="Premium IPTV UK — 35,000+ live channels in 4K"
          fill
          priority
          quality={85}
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* ── Red radial glow behind headline ── */}
      <div
        className="absolute z-[8] pointer-events-none"
        style={{
          top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '600px',
          background: 'radial-gradient(ellipse at center, rgba(232,57,42,0.18) 0%, rgba(232,57,42,0.06) 40%, transparent 70%)',
          filter: 'blur(30px)',
        }}
        aria-hidden="true"
      />

      {/* ── Floating poster cards ── */}
      <div className="absolute inset-0 z-[9] pointer-events-none overflow-hidden" aria-hidden="true">
        {POSTER_CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={el => { posterRefs.current[i] = el }}
            style={{
              position:   'absolute',
              top:        card.top,
              left:       'left' in card ? card.left : undefined,
              right:      'right' in card ? card.right as string : undefined,
              width:      `${card.width}px`,
              transform:  `rotate(${card.rotate}deg)`,
              transition: reduced ? 'none' : 'transform 80ms linear',
            }}
          >
            <div
              style={{
                width:        `${card.width}px`,
                height:       `${Math.round(card.width * 1.5)}px`,
                borderRadius: '8px',
                border:       '1px solid rgba(232,57,42,0.35)',
                boxShadow:    '0 0 20px rgba(232,57,42,0.15)',
                overflow:     'hidden',
                position:     'relative',
              }}
            >
              {card.posterUrl && (
                <Image
                  src={card.posterUrl}
                  alt={card.label}
                  fill
                  className="object-cover"
                  sizes={`${card.width}px`}
                />
              )}
              {/* Gradient overlay — lighter when real image loaded */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${card.color}`}
                style={{ opacity: card.posterUrl ? 0.35 : 0.8 }}
              />
              <div className="absolute bottom-0 inset-x-0 p-2">
                <p className="font-ui text-[11px] text-white/80 truncate">{card.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Hero content ── */}
      <div className="relative z-[20] text-center px-4 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p
          data-hero-fade=""
          className="font-ui text-[11px] tracking-[0.25em] uppercase text-[#E8392A] mb-6 opacity-0"
        >
          UK&apos;s #1 IPTV Service
        </p>

        {/* H1 — word by word reveal */}
        <h1
          ref={h1Ref}
          className="font-display text-hero text-[#F5F5F5] uppercase leading-none mb-6 tracking-wide"
          aria-label="The UK's Best IPTV Subscription"
        >
          <span data-hw="" className="hw">The</span>{' '}
          <span data-hw="" className="hw">UK&apos;s</span>{' '}
          <span data-hw="" className="hw">Best</span>
          <br aria-hidden="true" />
          <span data-hw="" className="hw" style={{ color: '#E8392A' }}>IPTV</span>{' '}
          <span data-hw="" className="hw">Subscription</span>
        </h1>

        {/* Subheadline */}
        <p
          data-hero-fade=""
          className="font-sans text-[#9CA3AF] text-lg sm:text-xl mb-10 max-w-xl mx-auto opacity-0"
        >
          35,000+ channels. Never miss a moment.
        </p>

        {/* CTAs */}
        <div
          data-hero-fade=""
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 opacity-0"
        >
          <Link
            ref={ctaRef}
            href="/plans/"
            className="btn-magnetic btn-red font-display text-lg tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2"
            style={{ borderRadius: '2px' }}
          >
            Get Started — £9.99/mo
          </Link>
          <a
            href="https://wa.me/447451296412?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial."
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-lg tracking-widest uppercase px-10 py-4 inline-flex items-center gap-2 text-[#F5F5F5] border border-white/30 hover:border-[#E8392A] transition-colors duration-200"
            style={{ borderRadius: '2px' }}
          >
            Free Trial on WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div
          data-hero-fade=""
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 opacity-0"
        >
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 font-ui text-[13px] text-[#9CA3AF]">
              <Icon size={13} className="text-[#E8392A]" aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── Red separator line ── */}
      <span className="red-separator absolute bottom-0 left-0 right-0 z-[20]" aria-hidden="true" />
    </section>
  )
}
