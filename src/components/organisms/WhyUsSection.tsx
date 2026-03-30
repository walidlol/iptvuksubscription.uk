'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
// anime.js loaded dynamically inside useEffect (Step 7 perf)
import {
  Tv2, Zap, Smartphone, HeadphonesIcon, Shield, CalendarDays,
  type LucideIcon,
} from 'lucide-react'
import { cardHover } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/* ============================================================
   Features data
   ============================================================ */

interface Feature {
  icon:       LucideIcon
  title:      string
  body:       string
  highlight?: boolean
}

const FEATURES: Feature[] = [
  {
    icon:      Tv2,
    title:     '35,000+ Live Channels',
    body:      'Access BBC One, ITV, Channel 4, Sky Sports, BT Sport, TNT Sports and thousands more UK and international channels — all in one subscription.',
    highlight: true,
  },
  {
    icon:  Zap,
    title: '4K Ultra HD Quality',
    body:  'Premium Annual and Family plans stream in stunning 4K resolution with Dolby Audio where available. Full HD on Standard. Zero compromise on picture quality.',
  },
  {
    icon:  Smartphone,
    title: 'Works on Every Device',
    body:  'Firestick, Android TV, Samsung Smart TV, LG Smart TV, iPhone, iPad, Android phones, MAG boxes, and any IPTV player app. One subscription, all screens.',
  },
  {
    icon:  HeadphonesIcon,
    title: '24/7 UK Support via WhatsApp',
    body:  'Real human support via WhatsApp — not a bot. Average response time under 15 minutes during UK hours. Setup help, credential delivery, troubleshooting.',
  },
  {
    icon:  Shield,
    title: '99.9% Uptime Guarantee',
    body:  'Our geographically distributed server infrastructure ensures maximum reliability even during peak events like Premier League finals and major boxing nights.',
  },
  {
    icon:  CalendarDays,
    title: 'EPG Guide + Catch-Up TV',
    body:  "Electronic Programme Guide shows what's on now and next. Catch-up lets you watch missed UK shows up to 7 days after broadcast. Available on Premium & Family plans.",
  },
]

/* ============================================================
   Component
   ============================================================ */

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef    = useRef<HTMLUListElement>(null)

  const reduced  = useReducedMotion()
  const triggered = useScrollAnimation(sectionRef, { threshold: 0.08 })

  /* Heading: slide in from left */
  useEffect(() => {
    const el = headingRef.current
    if (!el) return

    if (reduced) {
      el.style.opacity   = '1'
      el.style.transform = 'none'
      return
    }
    if (!triggered) return

    ;(async () => {
      const { animate } = await import('animejs')
      animate(el, { opacity: [0, 1], translateX: [-52, 0], duration: 750, ease: 'outExpo' })
    })()
  }, [triggered, reduced])

  /* Cards: stagger up from bottom */
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    if (reduced) {
      Array.from(grid.children).forEach(el => {
        ;(el as HTMLElement).style.opacity   = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    if (!triggered) return

    const cards = Array.from(grid.children) as HTMLElement[]
    ;(async () => {
      const { animate } = await import('animejs')
      animate(cards, { opacity: [0, 1], translateY: [50, 0], duration: 700, delay: (_, i) => 120 + i * 80, ease: 'outExpo' })
    })()
  }, [triggered, reduced])

  return (
    <section ref={sectionRef} className="section" aria-labelledby="why-us-heading">
      <div className="container">

        {/* Section header — anime-slide-left initial state */}
        <div ref={headingRef} className="anime-slide-left text-center mb-16">
          <h2
            id="why-us-heading"
            className="font-display text-display text-[#F5F5F5] uppercase mb-4"
          >
            Why Choose <span className="gradient-text-red">IPTV UK</span>?
          </h2>
          <p className="font-sans text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            Everything a UK household needs from a single, affordable subscription.
            No satellite dish. No long contracts. No hidden fees.
          </p>
        </div>

        {/* Feature grid — items use anime-hidden initial state */}
        <ul
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {FEATURES.map(({ icon: FeatureIcon, title, body, highlight }) => (
            <motion.li
              key={title}
              {...cardHover}
              className={[
                'anime-hidden',
                'glass glass-hover',
                'p-6 flex flex-col gap-4 cursor-default',
                highlight
                  ? 'border-[rgba(229,24,30,0.3)] bg-[rgba(229,24,30,0.04)]'
                  : '',
              ].join(' ')}
            >
              {/* Icon */}
              <span
                className={[
                  'inline-flex items-center justify-center',
                  'w-11 h-11 rounded-xl shrink-0',
                  highlight
                    ? 'bg-[#E8392A] shadow-[0_0_20px_rgba(229,24,30,0.35)]'
                    : 'bg-white/5',
                ].join(' ')}
                aria-hidden="true"
              >
                <FeatureIcon
                  size={22}
                  strokeWidth={1.75}
                  color={highlight ? '#F5F5F5' : '#E8392A'}
                />
              </span>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <h3 className="font-ui font-semibold text-[#F5F5F5] text-base leading-snug">
                  {title}
                </h3>
                <p className="font-sans text-[#9CA3AF] text-sm leading-relaxed">
                  {body}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Bottom CTA nudge */}
        <p className="text-center mt-12 font-sans text-[#9CA3AF] text-sm">
          Still not sure?{' '}
          <a
            href="/free-trial/"
            className="text-[#E8392A] underline underline-offset-2 hover:text-[#FF4433] transition-colors"
          >
            Try it free for 24 hours
          </a>{' '}
          — no card required.
        </p>

      </div>
    </section>
  )
}
