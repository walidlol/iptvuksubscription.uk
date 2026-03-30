'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/* ============================================================
   Device data
   ============================================================ */

const DEVICES = [
  {
    id:    'firestick',
    label: 'Fire Stick',
    note:  'IPTV Smarters · 5 min setup',
    icon:  '🔥',
  },
  {
    id:    'smart-tv',
    label: 'Smart TV',
    note:  'Samsung · LG · Sony',
    icon:  '📺',
  },
  {
    id:    'android',
    label: 'Android',
    note:  'Phone · Tablet · Box',
    icon:  '🤖',
  },
  {
    id:    'iphone',
    label: 'iPhone / iPad',
    note:  'iOS 14+ · Any app',
    icon:  '📱',
  },
  {
    id:    'pc',
    label: 'PC / Mac',
    note:  'Browser or VLC',
    icon:  '💻',
  },
] as const

/* ============================================================
   Component
   ============================================================ */

export default function DeviceEcosystem() {
  useScrollReveal()
  const reduced = useReducedMotion()

  return (
    <section className="py-20 bg-[#0A0A0A]" aria-labelledby="devices-heading">
      <div className="container">

        {/* Heading */}
        <div data-reveal="" className="text-center mb-14">
          <h2
            id="devices-heading"
            className="font-display text-[#F5F5F5] uppercase"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
          >
            Works On <span style={{ color: '#E8392A' }}>Every Device</span>
          </h2>
          <p data-reveal="" data-reveal-delay="100" className="font-sans text-[#9CA3AF] text-lg mt-3 max-w-lg mx-auto">
            One subscription — all your screens. Setup in under 5 minutes.
          </p>
        </div>

        {/* 5 device icons */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {DEVICES.map((device, i) => (
            <div
              key={device.id}
              data-reveal=""
              data-reveal-delay={String(i * 80)}
              className="flex flex-col items-center gap-3 cursor-default group"
            >
              {/* Icon circle */}
              <div
                className="relative flex items-center justify-center rounded-2xl border border-white/[0.08] transition-all duration-300 group-hover:border-[#E8392A]/50 group-hover:shadow-[0_0_30px_rgba(232,57,42,0.2)]"
                style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #111111 0%, #1A1A1A 50%, rgba(232,57,42,0.05) 100%)',
                }}
              >
                <Image
                  src={`/images/devices/${device.id}.png`}
                  alt={`${device.label} IPTV UK`}
                  width={64}
                  height={64}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={() => {}}
                />
                {/* Fallback emoji shown via CSS when image fails */}
                <span className="absolute inset-0 flex items-center justify-center text-4xl opacity-0 [img+&]:opacity-0 pointer-events-none select-none" aria-hidden="true">
                  {device.icon}
                </span>
              </div>

              {/* Label */}
              <div className="text-center">
                <p className="font-display text-[#F5F5F5] text-sm uppercase tracking-wider leading-tight">
                  {device.label}
                </p>
                <p className="font-ui text-[11px] text-[#9CA3AF] mt-0.5">{device.note}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TV screen mockup */}
        <div data-reveal="" data-reveal-delay="200" className="relative mx-auto" style={{ maxWidth: '900px' }}>
          {/* Red glow behind TV */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(232,57,42,0.25) 0%, rgba(232,57,42,0.08) 40%, transparent 70%)',
              filter: 'blur(40px)',
              transform: 'scale(1.1)',
            }}
            aria-hidden="true"
          />

          {/* TV bezel */}
          <div
            className="relative rounded-2xl overflow-hidden border border-white/10"
            style={{
              background: '#0D0D0D',
              boxShadow: '0 0 80px rgba(232,57,42,0.15), 0 40px 80px rgba(0,0,0,0.6)',
              padding: '8px',
            }}
          >
            {/* Screen */}
            <div
              className="relative w-full rounded-xl overflow-hidden"
              style={{ aspectRatio: '16/9' }}
            >
              <Image
                src="/images/devices/mockup-screen.jpg"
                alt="IPTV UK interface showing live channels and EPG guide on TV"
                fill
                className="object-cover"
                sizes="900px"
              />

              {/* Gradient overlay (also serves as fallback bg) */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, #0D0D1A 0%, #0A0A0A 30%, #1A0A0A 60%, #0D0A0D 100%)',
                  opacity: 0.85,
                }}
              />

              {/* Fake UI chrome — mockup content */}
              <div className="absolute inset-0 flex flex-col p-6">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#E8392A]" />
                    <span className="font-display text-[#F5F5F5] text-sm uppercase tracking-wider">LIVE</span>
                    <span className="font-ui text-[11px] text-[#9CA3AF]">Premier League · Sky Sports Main</span>
                  </div>
                  <div className="flex gap-2">
                    {['HD', '4K', 'EPG'].map(tag => (
                      <span key={tag} className="font-ui text-[10px] text-[#9CA3AF] border border-white/10 rounded px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Channel grid preview */}
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 flex-1">
                  {[
                    { label: 'BBC One', color: 'from-red-900/60' },
                    { label: 'Sky Sports', color: 'from-sky-900/60' },
                    { label: 'TNT Sports', color: 'from-indigo-900/60' },
                    { label: 'ITV', color: 'from-blue-900/60' },
                    { label: 'Channel 4', color: 'from-gray-800/60' },
                    { label: 'Sky One', color: 'from-slate-800/60' },
                    { label: 'BBC Two', color: 'from-red-800/60' },
                    { label: 'BT Sport', color: 'from-blue-800/60' },
                    { label: 'CNN', color: 'from-red-900/60' },
                    { label: 'Discovery', color: 'from-teal-900/60' },
                    { label: 'ESPN', color: 'from-orange-900/60' },
                    { label: '+30K more', color: 'from-[#E8392A]/20' },
                  ].map(({ label, color }) => (
                    <div
                      key={label}
                      className={`bg-gradient-to-b ${color} to-black/60 rounded border border-white/[0.06] flex items-end p-1.5`}
                    >
                      <span className="font-ui text-[9px] sm:text-[10px] text-white/70 truncate leading-tight">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="font-ui text-[11px] text-[#9CA3AF]">35,000+ channels · 100,000+ VOD</span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8392A] animate-pulse" />
                    <span className="font-ui text-[11px] text-[#E8392A]">99.9% uptime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TV stand */}
          <div className="flex justify-center mt-1">
            <div className="w-24 h-3 bg-[#111111] rounded-b-lg border border-white/[0.04]" />
          </div>
          <div className="flex justify-center">
            <div className="w-40 h-2 bg-[#0D0D0D] rounded-full border border-white/[0.04]" />
          </div>
        </div>

        {/* Setup guide link */}
        <p data-reveal="" data-reveal-delay="300" className="text-center mt-10 font-sans text-[#9CA3AF] text-sm">
          Need help?{' '}
          <a
            href="/setup-guide/"
            className="text-[#E8392A] underline underline-offset-2 hover:text-[#FF2D34] transition-colors"
          >
            Step-by-step device setup guides →
          </a>
        </p>

      </div>
    </section>
  )
}
