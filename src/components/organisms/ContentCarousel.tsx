'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* Types and default data come from a shared lib file (no 'use client') */
import { DEFAULT_ROWS, type ContentCard, type ContentRow } from '@/lib/carouselData'
export type { ContentCard, ContentRow }

/* ============================================================
   NetflixCard — Apple TV 3D tilt, TMDB real poster
   ============================================================ */

function NetflixCard({ card, reduced }: { card: ContentCard; reduced: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx   = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2)
    const dy   = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2)
    el.style.transform  = `scale(1.15) rotateY(${dx * 15}deg) rotateX(${-dy * 15}deg)`
    el.style.boxShadow  = `0 0 0 2px #E8392A, 0 0 40px rgba(232,57,42,0.4)`
    el.style.zIndex     = '10'
  }

  function onMouseLeave() {
    const el = cardRef.current
    if (!el) return
    el.style.transform = ''
    el.style.boxShadow = ''
    el.style.zIndex    = ''
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="flex-none cursor-pointer"
      style={{
        width:          '200px',
        height:         '300px',
        borderRadius:   '8px',
        overflow:       'hidden',
        transition:     reduced ? 'none' : 'transform 200ms ease, box-shadow 200ms ease',
        transformStyle: 'preserve-3d',
        position:       'relative',
        border:         '1px solid rgba(255,255,255,0.08)',
        background:     '#111111',
      }}
    >
      {/* TMDB real poster OR CSS gradient fallback */}
      {card.posterUrl && (
        <Image
          src={card.posterUrl}
          alt={card.label}
          fill
          className="object-cover"
          sizes="200px"
          loading="lazy"
        />
      )}

      {/* Gradient overlay (darkens bottom + shows brand colour when no real image) */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${card.gradient}`}
        style={{ opacity: card.posterUrl ? 0.35 : 0.85 }}
      />

      {/* Label */}
      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <p className="font-ui text-[13px] text-white font-medium leading-tight">{card.label}</p>
      </div>
    </div>
  )
}

/* ============================================================
   NetflixRow — horizontal scroll with fade edges + arrows
   ============================================================ */

function NetflixRow({ row, reduced }: { row: ContentRow; reduced: boolean }) {
  const trackRef         = useRef<HTMLDivElement>(null)
  const [showL, setShowL] = useState(false)
  const [showR, setShowR] = useState(true)
  const [hovered, setHovered] = useState(false)

  function slide(dir: 'left' | 'right') {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -660 : 660, behavior: 'smooth' })
  }

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    setShowL(el.scrollLeft > 0)
    setShowR(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Row heading */}
      <h3 className="font-display text-3xl sm:text-4xl text-[#F5F5F5] uppercase mb-4 px-4 container mx-auto flex items-center gap-3">
        <span aria-hidden="true">{row.emoji}</span>
        <span>{row.title}</span>
        <span className="text-[#E8392A]">—</span>
      </h3>

      {/* Left fade + arrow */}
      <div
        className={`absolute left-0 top-8 bottom-0 w-20 z-10 flex items-center justify-start pl-2 transition-opacity duration-200 ${hovered && showL ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(to right, #0A0A0A 0%, transparent 100%)' }}
      >
        <button
          onClick={() => slide('left')}
          aria-label={`Scroll ${row.title} left`}
          className="w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-[#F5F5F5] hover:border-[#E8392A] transition-colors cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto pb-2 items-start"
        style={{
          scrollbarWidth:  'none',
          msOverflowStyle: 'none',
          paddingLeft:     'max(1rem, calc((100vw - 1280px) / 2))',
          paddingRight:    'max(1rem, calc((100vw - 1280px) / 2))',
        }}
      >
        {row.cards.map(card => (
          <NetflixCard key={card.id} card={card} reduced={reduced} />
        ))}
      </div>

      {/* Right fade + arrow */}
      <div
        className={`absolute right-0 top-8 bottom-0 w-20 z-10 flex items-center justify-end pr-2 transition-opacity duration-200 ${hovered && showR ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(to left, #0A0A0A 0%, transparent 100%)' }}
      >
        <button
          onClick={() => slide('right')}
          aria-label={`Scroll ${row.title} right`}
          className="w-10 h-10 rounded-full bg-black/80 border border-white/10 flex items-center justify-center text-[#F5F5F5] hover:border-[#E8392A] transition-colors cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

/* ============================================================
   ContentCarousel — accepts optional TMDB-enriched rows
   ============================================================ */

interface ContentCarouselProps {
  rows?: ContentRow[]
}

export default function ContentCarousel({ rows = DEFAULT_ROWS }: ContentCarouselProps) {
  useScrollReveal()
  const reduced = useReducedMotion()

  return (
    <section className="py-20 bg-[#0A0A0A] overflow-hidden" aria-labelledby="content-heading">
      <div className="container mb-10">
        <h2
          id="content-heading"
          data-reveal=""
          className="font-display text-display text-[#F5F5F5] uppercase mb-3"
        >
          What You&apos;ll <span style={{ color: '#E8392A' }}>Watch</span>
        </h2>
        <p data-reveal="" data-reveal-delay="100" className="font-sans text-[#9CA3AF] text-lg max-w-xl">
          Premier League to world cinema — all in one subscription.
        </p>
      </div>

      <div className="flex flex-col gap-14">
        {rows.map(row => (
          <NetflixRow key={row.id} row={row} reduced={reduced} />
        ))}
      </div>

      <div className="container mt-10 text-center">
        <a
          href="/channels/"
          className="font-ui text-sm text-[#9CA3AF] hover:text-[#E8392A] transition-colors underline underline-offset-2"
        >
          Browse all 35,000+ channels →
        </a>
      </div>
    </section>
  )
}
