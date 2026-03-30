'use client'

import { useRef, useState, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const STATS = [
  { target: 35000, suffix: '+',  label: 'Live Channels',   prefix: '' },
  { target: 100,   suffix: 'K+', label: 'Subscribers',     prefix: '' },
  { target: 99.9,  suffix: '%',  label: 'Uptime',          prefix: '' },
  { target: 80,    suffix: '+',  label: 'Countries',       prefix: '' },
] as const

function useCountUp(target: number, duration = 1800, triggered = false) {
  const [count, setCount] = useState(0)
  const rafRef            = useRef<number>(0)

  useEffect(() => {
    if (!triggered) return
    const startTime = performance.now()
    const isFloat   = !Number.isInteger(target)

    function tick(now: number) {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      setCount(isFloat ? Math.round(eased * target * 10) / 10 : Math.floor(eased * target))
      if (progress < 1) { rafRef.current = requestAnimationFrame(tick) }
      else              { setCount(target) }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [triggered, target, duration])

  return count
}

function StatItem({
  target, suffix, label, prefix, triggered, index,
}: {
  target: number; suffix: string; label: string; prefix: string
  triggered: boolean; index: number
}) {
  const count = useCountUp(target, 1800 + index * 200, triggered)
  const display = target === 99.9
    ? count.toFixed(1)
    : count >= 1000
      ? count.toLocaleString('en-GB')
      : String(count)

  return (
    <div
      data-reveal=""
      data-reveal-delay={String(index * 100)}
      className="flex flex-col items-center text-center px-8 py-10 relative"
    >
      {/* Vertical red divider on left — hidden for first item */}
      {index > 0 && (
        <span
          className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-[#E8392A]/40"
          aria-hidden="true"
        />
      )}

      {/* Number — Bebas Neue 72px brand-red */}
      <div
        className="font-display text-[#E8392A] leading-none mb-2"
        style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)' }}
        aria-live="polite"
      >
        {prefix}{display}{suffix}
      </div>

      {/* Label */}
      <div className="font-ui text-[13px] text-[#9CA3AF] uppercase tracking-[0.12em]">
        {label}
      </div>

      {/* Red underline */}
      <span className="stat-underline mt-3 mx-auto" aria-hidden="true" />
    </div>
  )
}

export default function StatCounterBar() {
  const sectionRef = useRef<HTMLElement>(null)
  const [fired, setFired] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFired(true); observer.disconnect() } },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-[#111111] py-16"
      aria-label="Service statistics"
    >
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ target, suffix, label, prefix }, i) => (
            <StatItem
              key={label}
              target={target}
              suffix={suffix}
              label={label}
              prefix={prefix}
              triggered={fired}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
