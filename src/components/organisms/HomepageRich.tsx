'use client'

import { useRef, useEffect } from 'react'
import {
  Shield, Zap, Globe, Monitor, MessageCircle, Star,
  Check, ArrowRight,
} from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ──────────────────────────────────────────────
   WHY 100,000 UK SUBSCRIBERS CHOSE US
────────────────────────────────────────────── */
const WHY_FEATURES = [
  {
    icon: Shield,
    title: 'Anti-Freeze Technology',
    desc: 'Zero buffering guaranteed by our triple-redundancy server network — even during peak hours.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    desc: 'From payment to watching in under 5 minutes. We guide you through every step on WhatsApp.',
  },
  {
    icon: Globe,
    title: '200+ Countries',
    desc: 'International channels in every language — Arabic, Turkish, Polish, Hindi, and dozens more — alongside all UK favourites.',
  },
  {
    icon: Monitor,
    title: 'All Your Devices',
    desc: 'Smart TV, Firestick, phone, tablet, PC, Mac — one subscription covers everything you own.',
  },
  {
    icon: MessageCircle,
    title: '24/7 WhatsApp Support',
    desc: 'Real humans, average response time under 5 minutes. We solve issues on the spot.',
  },
  {
    icon: Star,
    title: '4.9/5 Customer Rating',
    desc: 'Rated Excellent by thousands of verified UK subscribers. The highest-rated IPTV UK service in 2026.',
  },
]

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const reduced    = useReducedMotion()
  const triggered  = useScrollAnimation(sectionRef, { threshold: 0.08 })

  useEffect(() => {
    if (!triggered) return
    const grid = gridRef.current
    if (!grid) return
    if (reduced) {
      Array.from(grid.children).forEach(el => {
        ;(el as HTMLElement).style.opacity   = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    ;(async () => {
      const { animate } = await import('animejs')
      animate(Array.from(grid.children) as HTMLElement[], {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 600,
        delay: (_: unknown, i: number) => i * 90,
        ease: 'outExpo',
      })
    })()
  }, [triggered, reduced])

  return (
    <section
      ref={sectionRef}
      className="section bg-[#0A0A0A]"
      aria-labelledby="why-choose-heading"
    >
      <div className="container">
        <div data-reveal className="text-center mb-16">
          <p className="eyebrow mb-3">Trusted by 100,000+ UK subscribers</p>
          <h2
            id="why-choose-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}
          >
            WHY 100,000 UK SUBSCRIBERS{' '}
            <span style={{ color: '#E8392A' }}>CHOSE US</span>
          </h2>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{ opacity: 0 }}
              className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-6
                         transition-all duration-300 hover:-translate-y-2
                         hover:border-[#E8392A]/50 hover:shadow-[0_20px_60px_rgba(232,57,42,0.15)]"
            >
              <div className="w-12 h-12 rounded-lg bg-[#E8392A]/10 flex items-center justify-center mb-4">
                <Icon size={24} color="#E8392A" aria-hidden="true" />
              </div>
              <h3 className="font-display text-[#F5F5F5] text-xl uppercase tracking-wide mb-2">
                {title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   HOW IT WORKS — 3 steps
────────────────────────────────────────────── */
const HOW_STEPS = [
  {
    num: '01',
    title: 'Choose Your Plan',
    desc: 'Pick Standard (£9.99/mo), Annual Premium (£59/yr), or Family (£129.99/yr). All plans include every channel.',
  },
  {
    num: '02',
    title: 'Pay Securely',
    desc: 'Pay via WhatsApp, PayPal, bank transfer, or cryptocurrency. No personal details stored. Takes 2 minutes.',
  },
  {
    num: '03',
    title: 'Start Watching',
    desc: 'Receive your credentials via WhatsApp within 15 minutes. Follow our setup guide and start watching immediately.',
  },
]

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef   = useRef<HTMLDivElement>(null)
  const reduced    = useReducedMotion()
  const triggered  = useScrollAnimation(sectionRef, { threshold: 0.1 })

  useEffect(() => {
    if (!triggered) return
    const container = stepsRef.current
    if (!container) return
    if (reduced) {
      Array.from(container.children).forEach(el => {
        ;(el as HTMLElement).style.opacity   = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    ;(async () => {
      const { animate } = await import('animejs')
      animate(Array.from(container.children) as HTMLElement[], {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 650,
        delay: (_: unknown, i: number) => i * 150,
        ease: 'outExpo',
      })
    })()
  }, [triggered, reduced])

  return (
    <section
      ref={sectionRef}
      className="section bg-[#111111]"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container">
        <div data-reveal className="text-center mb-16">
          <p className="eyebrow mb-3">Simple process</p>
          <h2
            id="how-it-works-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}
          >
            HOW IT <span style={{ color: '#E8392A' }}>WORKS</span>
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative"
        >
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-[#E8392A]/20"
            aria-hidden="true"
          />

          {HOW_STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{ opacity: 0 }}
              className="text-center relative"
            >
              <div
                className="font-display text-[#E8392A] mb-4"
                style={{ fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.num}
              </div>
              <h3 className="font-display text-[#F5F5F5] text-2xl uppercase tracking-wide mb-3">
                {step.title}
              </h3>
              <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
              {i < HOW_STEPS.length - 1 && (
                <div className="flex justify-center mt-6 md:hidden" aria-hidden="true">
                  <ArrowRight size={20} color="#E8392A" style={{ transform: 'rotate(90deg)' }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA under steps */}
        <div data-reveal className="text-center mt-14">
          <WhatsAppButton
            message="Hi! I'd like to get started with an IPTV UK subscription"
            variant="primary"
            className="px-10 py-4 font-display text-xl uppercase tracking-widest"
          >
            Get Started Now
          </WhatsAppButton>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   WHAT'S INCLUDED IN EVERY PLAN
────────────────────────────────────────────── */
const INCLUDED = [
  '35,000+ Live Channels',
  '100,000+ Movies & Shows',
  'HD & 4K Streaming Quality',
  'EPG TV Guide Included',
  'Anti-Freeze Technology',
  'All Devices Supported',
  '24/7 WhatsApp Support',
  'Cancel or Renew Anytime',
]

export function WhatsIncluded() {
  return (
    <section className="section bg-[#0A0A0A]" aria-labelledby="included-heading">
      <div className="container">
        <div data-reveal className="text-center mb-14">
          <p className="eyebrow mb-3">Every plan</p>
          <h2
            id="included-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1 }}
          >
            WHAT&apos;S INCLUDED IN{' '}
            <span style={{ color: '#E8392A' }}>EVERY PLAN</span>
          </h2>
        </div>

        <div
          data-reveal
          className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {INCLUDED.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 bg-[#111111] border border-[#1A1A1A]
                         rounded-xl px-5 py-4 hover:border-[#E8392A]/40 transition-colors"
            >
              <Check size={18} color="#E8392A" aria-hidden="true" />
              <span className="text-[#D1D5DB] font-ui text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   RESELLER CALLOUT BANNER
────────────────────────────────────────────── */
export function ResellerBanner() {
  return (
    <section
      className="py-16 px-6 bg-[#111111]"
      aria-labelledby="reseller-heading"
    >
      <div
        data-reveal
        className="max-w-4xl mx-auto rounded-2xl border border-[#E8392A]/30
                   bg-[rgba(232,57,42,0.07)] p-10 text-center"
      >
        <p className="eyebrow mb-3">Business opportunity</p>
        <h2
          id="reseller-heading"
          className="font-display uppercase text-[#F5F5F5] mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', lineHeight: 1 }}
        >
          START YOUR OWN{' '}
          <span style={{ color: '#E8392A' }}>IPTV BUSINESS</span>
        </h2>
        <p className="text-[#9CA3AF] max-w-xl mx-auto mb-8 text-sm leading-relaxed">
          Join our reseller programme and build a recurring income stream. Full technical support provided.
        </p>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-8 text-left">
          {[
            'Wholesale panel with 1,000+ credits',
            'Your own branded service',
            'Full reseller dashboard & analytics',
            'Dedicated WhatsApp support line',
          ].map(point => (
            <li key={point} className="flex items-start gap-2 text-[#D1D5DB] text-sm">
              <Check size={16} color="#E8392A" className="mt-0.5 shrink-0" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>

        <WhatsAppButton
          message="Hi! I'm interested in the IPTV reseller programme. Can you tell me more?"
          variant="primary"
          className="px-8 py-3 font-display text-lg uppercase tracking-wider"
        >
          Enquire About Reseller
        </WhatsAppButton>
      </div>
    </section>
  )
}
