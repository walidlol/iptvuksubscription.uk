'use client'

import { useRef, useEffect, useState } from 'react'
import {
  Check, Tv, Smartphone, Monitor, Tablet,
  Users, Zap, Shield, Clock,
} from 'lucide-react'
import WhatsAppButton, { WA_MESSAGES } from '@/components/WhatsAppButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/* ── Network badge pills ── */
const NETWORKS = ['BBC', 'ITV', 'SKY', 'BT Sport', 'Premier League', 'ESPN', 'Netflix', 'Disney+']

/* ── Device icons ── */
const DEVICES = [
  { icon: Tv,         label: 'Smart TV'   },
  { icon: Monitor,    label: 'PC / Mac'   },
  { icon: Smartphone, label: 'Mobile'     },
  { icon: Tablet,     label: 'Tablet'     },
  { icon: Tv,         label: 'Firestick'  },
]

/* ── Plan definitions ── */
interface Plan {
  id:           string
  name:         string
  duration:     string
  headline:     string
  price:        string
  perMonth:     string
  saving?:      string
  badge:        string
  badgeStyle:   string        // Tailwind bg+text classes for the banner
  borderStyle:  string
  scale:        string
  angle:        string
  features:     string[]
  ctaMessage:   string
  highlighted:  boolean
}

const PLANS: Plan[] = [
  {
    id:          'standard',
    name:        'STANDARD',
    duration:    '1 Month',
    headline:    'Try Risk-Free',
    price:       '£9.99',
    perMonth:    '£9.99/mo — no commitment',
    badge:       'MOST FLEXIBLE',
    badgeStyle:  'bg-[#1A1A1A] text-[#9CA3AF]',
    borderStyle: 'border-white/10',
    scale:       'scale-100',
    angle:       '"Perfect for testing. Cancel the moment you\'re not satisfied. Full access from minute one."',
    features: [
      'Instant activation on signup',
      'Cancel anytime, no questions asked',
      'Full 35,000+ channel access',
      '100,000+ VODs included',
      'HD & 4K streaming quality',
      'Zero buffering with anti-freeze tech',
      'EPG TV Guide included',
      '24/7 WhatsApp support',
      'Works on all devices',
      'Free Premium Media Player',
      'Content request feature',
    ],
    ctaMessage:  WA_MESSAGES.standard,
    highlighted: false,
  },
  {
    id:          'annual',
    name:        'ANNUAL',
    duration:    '12 Months',
    headline:    'Best Value',
    price:       '£59',
    perMonth:    '£4.92/month — billed annually',
    saving:      'Save 51% vs monthly',
    badge:       'MOST POPULAR ⭐',
    badgeStyle:  'bg-[#E8392A] text-white',
    borderStyle: 'border-[rgba(232,57,42,0.6)]',
    scale:       'md:scale-[1.04]',
    angle:       '"The choice of serious streamers. Priority support, dedicated server allocation, and over half the price of monthly billing."',
    features: [
      'Everything in Standard, PLUS:',
      'Priority WhatsApp support (faster responses)',
      'Dedicated server allocation (less congestion)',
      'Save £60.88 vs paying monthly',
      'Auto-renewal reminder 7 days before expiry',
      '4K Ultra HD on all supported channels',
      '2 simultaneous connections',
      'Full 35,000+ channel access',
      '100,000+ VODs included',
      'EPG TV Guide included',
      'Free Premium Media Player',
    ],
    ctaMessage:  WA_MESSAGES.annual,
    highlighted: true,
  },
  {
    id:          'family',
    name:        'FAMILY',
    duration:    '12 Months',
    headline:    'Watch Together',
    price:       '£129.99',
    perMonth:    '£10.83/month — billed annually',
    badge:       'BEST FOR FAMILIES',
    badgeStyle:  'bg-[#1A1A1A] text-[#F5A623]',
    borderStyle: 'border-[rgba(232,57,42,0.35)]',
    scale:       'scale-100',
    angle:       '"Three screens, one account. Everyone watches what they want, when they want, on any device."',
    features: [
      'Everything in Annual, PLUS:',
      '3 simultaneous connections',
      '3 separate device logins',
      'Parental controls available',
      'Kids channels unlocked',
      'Perfect for households with multiple viewers',
      'Full 35,000+ channel access',
      '100,000+ VODs included',
      '4K Ultra HD on all supported channels',
      'EPG TV Guide included',
      'Priority WhatsApp support',
    ],
    ctaMessage:  WA_MESSAGES.family,
    highlighted: false,
  },
]

/* ── Lifetime spots scarcity (random 12–27 on mount) ── */
function useLifetimeSpots() {
  const [spots, setSpots] = useState<number | null>(null)
  useEffect(() => {
    setSpots(Math.floor(Math.random() * 16) + 12)
  }, [])
  return spots
}

/* ── PlanCard ── */
function PlanCard({ plan, reduced }: { plan: Plan; reduced: boolean }) {
  const cardRef = useRef<HTMLElement>(null)

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduced) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)
    const dy = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)
    ;(async () => {
      const { animate } = await import('animejs')
      animate(el, { rotateY: dx * 4, rotateX: -dy * 4, duration: 200, ease: 'outQuad' })
    })()
  }

  function onMouseLeave() {
    if (reduced) return
    const el = cardRef.current
    if (!el) return
    ;(async () => {
      const { animate } = await import('animejs')
      animate(el, { rotateY: 0, rotateX: 0, duration: 400, ease: 'outElastic(1,0.6)' })
    })()
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={`${plan.name} plan — ${plan.price}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
      className={[
        'anime-hidden flex flex-col rounded-xl overflow-hidden border transition-shadow duration-300',
        plan.highlighted ? 'shadow-[0_0_60px_rgba(232,57,42,0.35)]' : '',
        plan.borderStyle,
        plan.scale,
        'bg-[#111111]',
      ].join(' ')}
    >
      {/* Coloured banner */}
      <div className={`${plan.badgeStyle} px-5 py-3 flex items-center justify-between`}>
        <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase">{plan.badge}</span>
        {plan.highlighted && (
          <span className="font-ui text-xs font-semibold opacity-80">Most chosen plan</span>
        )}
      </div>

      <div className="flex flex-col gap-5 p-6 flex-1">
        {/* Name + duration */}
        <div>
          <h3 className="font-display text-3xl text-[#F5F5F5] uppercase tracking-wide leading-none">
            {plan.name}
          </h3>
          <p className="font-ui text-xs text-[#9CA3AF] mt-1 uppercase tracking-widest">
            {plan.headline} · {plan.duration}
          </p>
        </div>

        {/* Price */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[4rem] leading-none text-[#E8392A]">{plan.price}</span>
            <span className="font-ui text-sm text-[#9CA3AF]">{plan.duration === '1 Month' ? '/mo' : '/yr'}</span>
          </div>
          <p className="font-ui text-xs text-[#9CA3AF] mt-1">{plan.perMonth}</p>
          {plan.saving && (
            <p className="font-ui text-xs font-semibold text-[#E8392A] mt-1">{plan.saving}</p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07]" />

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1" role="list">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 font-ui text-sm">
              <Check size={14} className="text-[#E8392A] shrink-0 mt-0.5" aria-hidden="true" />
              <span className={f.startsWith('Everything') ? 'text-[#E8392A] font-semibold' : 'text-[#F5F5F5]'}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* INCLUDING networks */}
        <div>
          <p className="font-ui text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-2">Including</p>
          <div className="flex flex-wrap gap-1.5">
            {NETWORKS.map(n => (
              <span
                key={n}
                className="font-ui text-[10px] font-semibold px-2 py-0.5 rounded border border-[rgba(232,57,42,0.3)] bg-[rgba(232,57,42,0.06)] text-[#F5F5F5]"
              >
                {n}
              </span>
            ))}
          </div>
        </div>

        {/* Supported devices */}
        <div>
          <p className="font-ui text-[10px] uppercase tracking-widest text-[#9CA3AF] mb-2">Supported Devices</p>
          <div className="flex items-center gap-3 flex-wrap">
            {DEVICES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1 text-[#9CA3AF]">
                <Icon size={13} aria-hidden="true" />
                <span className="font-ui text-[10px]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <WhatsAppButton
          message={plan.ctaMessage}
          variant={plan.highlighted ? 'primary' : 'outline'}
          showIcon
          className={`w-full h-12 rounded text-sm ${plan.highlighted ? '' : 'border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/8'}`}
        >
          {plan.highlighted ? '🔥 Get This Plan' : `Get ${plan.name} Plan`}
        </WhatsAppButton>
      </div>
    </article>
  )
}

/* ── Lifetime card ── */
function LifetimeCard() {
  const spots = useLifetimeSpots()

  return (
    <article
      aria-label="Lifetime Premium plan"
      className="anime-hidden col-span-full rounded-xl overflow-hidden border border-[rgba(245,166,35,0.4)] bg-[#111111]"
    >
      {/* Gold banner */}
      <div className="bg-gradient-to-r from-[#2A2000] to-[#1A1500] px-5 py-3 flex items-center justify-between flex-wrap gap-2 border-b border-[rgba(245,166,35,0.2)]">
        <div className="flex items-center gap-3">
          <span className="font-ui text-xs font-bold tracking-[0.15em] uppercase text-[#F5A623]">
            ⚡ LIMITED — {spots !== null ? `${spots} spots remaining` : '…'}
          </span>
        </div>
        <span className="font-ui text-xs text-[#9CA3AF]">After 3 years it pays for itself</span>
      </div>

      <div className="p-6 grid md:grid-cols-[1fr_auto] gap-6 items-center">
        <div className="flex flex-col gap-3">
          <div>
            <h3 className="font-display text-4xl text-[#F5A623] uppercase tracking-wide leading-none">
              LIFETIME PREMIUM
            </h3>
            <p className="font-ui text-sm text-[#9CA3AF] mt-1">
              One payment. Forever access. No renewals ever.
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-5xl text-[#F5A623] leading-none">£299</span>
            <span className="font-ui text-sm text-[#9CA3AF]">one-time</span>
          </div>
          <p className="font-ui text-sm text-[#9CA3AF]">
            Save £2,000+ vs annual payments over 5 years. Includes 4 connections, 4K, priority support, and every future upgrade.
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            {['4 Connections', '4K Ultra HD', 'Priority Support', 'All Future Upgrades', 'No Renewals'].map(f => (
              <span key={f} className="flex items-center gap-1.5 font-ui text-xs text-[#F5F5F5]">
                <Check size={12} className="text-[#F5A623]" aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[200px]">
          <WhatsAppButton
            message={WA_MESSAGES.lifetime}
            variant="outline"
            showIcon
            className="h-12 rounded text-sm border border-[#F5A623]/40 text-[#F5A623] hover:bg-[#F5A623]/8 w-full"
          >
            Enquire About Lifetime
          </WhatsAppButton>
          <p className="font-ui text-[10px] text-[#9CA3AF] text-center">
            Limited to 100 accounts total
          </p>
        </div>
      </div>
    </article>
  )
}

/* ── Main export ── */
export default function PricingTable() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)
  const reduced    = useReducedMotion()
  const triggered  = useScrollAnimation(sectionRef)

  // Animate cards in when section enters viewport
  useEffect(() => {
    if (!triggered) return
    const grid = cardsRef.current
    if (!grid) return
    if (reduced) {
      Array.from(grid.children).forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    ;(async () => {
      const { animate } = await import('animejs')
      animate(Array.from(grid.children) as HTMLElement[], {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 700,
        delay: (_: unknown, i: number) => i * 120,
        ease: 'outExpo',
      })
    })()
  }, [triggered, reduced])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      aria-labelledby="pricing-heading"
      className="section bg-[#111111] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(232,57,42,0.06)] blur-[100px]" />
      </div>

      <div className="container relative">
        {/* Heading */}
        <div className="text-center mb-14 anime-hidden" data-reveal>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#E8392A] mb-3">Pricing Plans</p>
          <h2
            id="pricing-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            IPTV UK Subscription Plans<br />
            <span style={{ color: '#E8392A' }}>&amp; Pricing</span>
          </h2>
          <p className="font-ui text-[#9CA3AF] mt-4 max-w-xl mx-auto">
            No hidden fees. No contracts. Cancel anytime. All plans include every UK and international channel.
          </p>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 items-start mb-8">
          {PLANS.map(plan => (
            <PlanCard key={plan.id} plan={plan} reduced={reduced} />
          ))}
        </div>

        {/* Lifetime card — full width */}
        <LifetimeCard />

        {/* Trust row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 anime-hidden" data-reveal>
          {[
            { icon: Shield,  text: '7-day money-back guarantee' },
            { icon: Zap,     text: 'Instant activation' },
            { icon: Clock,   text: 'Credentials in 15 minutes' },
            { icon: Users,   text: '48,000+ happy customers' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 font-ui text-sm text-[#9CA3AF]">
              <Icon size={14} className="text-[#E8392A]" aria-hidden="true" />
              {text}
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-10 pt-10 border-t border-white/[0.06] anime-hidden" data-reveal>
          <p className="font-ui text-xs uppercase tracking-widest text-[#9CA3AF] text-center mb-4">
            Payment methods accepted
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {['PayPal', 'Visa', 'Mastercard', 'Bitcoin', 'Ethereum', 'USDT'].map(method => (
              <span key={method} className="font-mono text-sm text-[#9CA3AF] border border-white/10 rounded px-3 py-1.5">
                {method}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 justify-center font-ui text-sm text-[#9CA3AF]">
            <span className="text-[#25D366]">●</span>
            Credentials sent via WhatsApp within 15 minutes of payment
          </div>
        </div>
      </div>
    </section>
  )
}
