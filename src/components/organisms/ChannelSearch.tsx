'use client'

import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

import Image from 'next/image'

interface ChannelCategory {
  id:           string
  heading:      string
  description:  string
  badge:        string | null
  channels:     readonly string[]
  color:        string
  backdropUrl?: string | null   // TMDB backdrop image for category header
}

export default function ChannelSearch({ categories }: { categories: ChannelCategory[] }) {
  useScrollReveal()
  const reduced = useReducedMotion()

  const [query, setQuery]         = useState('')
  const [count, setCount]         = useState(0)
  const countRef                  = useRef<HTMLSpanElement>(null)
  const inputRef                  = useRef<HTMLInputElement>(null)

  /* Count-up 0 → 35000 on mount */
  useEffect(() => {
    if (reduced) { setCount(35000); return }
    const start = performance.now()
    const duration = 2000
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * 35000))
      if (progress < 1) requestAnimationFrame(tick)
      else setCount(35000)
    }
    requestAnimationFrame(tick)
  }, [reduced])

  const q = query.trim().toLowerCase()

  /* Filter channels across all categories */
  const filtered = q
    ? categories.map(cat => ({
        ...cat,
        channels: cat.channels.filter(ch => ch.toLowerCase().includes(q)),
      })).filter(cat => cat.channels.length > 0)
    : categories

  return (
    <>
      {/* Animated count-up hero number */}
      <div data-reveal="" className="text-center mb-12 pt-8">
        <div
          className="font-display text-[#E8392A] mb-2"
          style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', lineHeight: 1 }}
          aria-live="polite"
        >
          <span ref={countRef}>{count.toLocaleString('en-GB')}</span>+
        </div>
        <p className="font-display text-[#F5F5F5] uppercase tracking-widest" style={{ fontSize: 'clamp(1rem, 3vw, 1.75rem)' }}>
          IPTV UK Channels
        </p>
      </div>

      {/* Search bar */}
      <div data-reveal="" data-reveal-delay="150" className="max-w-xl mx-auto mb-14">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none"
            aria-hidden="true"
          />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search channels — Sky Sports, BBC, TNT..."
            aria-label="Search UK IPTV channels"
            className={[
              'w-full h-12 pl-11 pr-4 rounded',
              'bg-[#111111] border border-white/[0.08]',
              'font-ui text-sm text-[#F5F5F5] placeholder:text-[#4B5563]',
              'outline-none focus:border-[#E8392A] focus:shadow-[0_0_0_3px_rgba(232,57,42,0.15)]',
              'transition-all duration-200',
            ].join(' ')}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors cursor-pointer"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        {query && (
          <p className="font-ui text-xs text-[#9CA3AF] mt-2 text-center">
            {filtered.reduce((s, c) => s + c.channels.length, 0)} channels matching &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      {/* Channel categories */}
      <div className="flex flex-col gap-16">
        {filtered.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            aria-labelledby={`${cat.id}-heading`}
            data-reveal=""
            data-reveal-delay={String(ci * 60)}
          >
            {/* Category heading — with optional TMDB backdrop */}
            <div className="relative overflow-hidden rounded-xl mb-5 mx-4 container mx-auto" style={{ minHeight: '80px' }}>
              {cat.backdropUrl && (
                <>
                  <Image
                    src={cat.backdropUrl}
                    alt={`${cat.heading} backdrop`}
                    fill
                    className="object-cover object-center"
                    sizes="1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/60" />
                </>
              )}
              <div className={`relative flex items-center gap-3 ${cat.backdropUrl ? 'p-5' : 'py-2'}`}>
                <h2
                  id={`${cat.id}-heading`}
                  className="font-display text-[#F5F5F5] uppercase"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
                >
                  {cat.heading}
                </h2>
                {cat.badge && (
                  <span className="font-ui text-[11px] text-[#E8392A] border border-[#E8392A]/40 rounded px-2 py-0.5 uppercase tracking-wider">
                    {cat.badge}
                  </span>
                )}
                <span className="text-[#E8392A]">—</span>
              </div>
              {cat.backdropUrl && (
                <p className="relative font-ui text-sm text-[#9CA3AF] px-5 pb-4">{cat.description}</p>
              )}
            </div>
            {!cat.backdropUrl && (
              <p className="font-ui text-sm text-[#9CA3AF] mb-5 container mx-auto px-4">{cat.description}</p>
            )}

            {/* Channel cards — horizontal scroll */}
            <div
              className="flex gap-3 overflow-x-auto pb-2"
              style={{
                scrollbarWidth:  'none',
                msOverflowStyle: 'none',
                paddingLeft:     'max(1rem, calc((100vw - 1280px) / 2))',
                paddingRight:    'max(1rem, calc((100vw - 1280px) / 2))',
              }}
              role="list"
              aria-label={`${cat.heading} channel list`}
            >
              {cat.channels.map(ch => (
                <div
                  key={ch}
                  role="listitem"
                  className={[
                    'flex-none flex items-center',
                    'bg-[#111111] border-l-[3px] border-[#E8392A]/60 border-y border-r border-white/[0.06]',
                    'rounded-r px-4 py-3',
                    'hover:border-l-[#E8392A] hover:bg-[#1A1A1A] hover:scale-[1.03]',
                    'transition-all duration-200 cursor-default',
                  ].join(' ')}
                  style={{ width: '160px', height: '72px' }}
                >
                  <span className="font-ui text-[12px] text-[#F5F5F5] leading-tight line-clamp-2">
                    {ch}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#9CA3AF] font-ui text-sm">
            No channels found for &ldquo;{query}&rdquo;
          </div>
        )}
      </div>
    </>
  )
}
