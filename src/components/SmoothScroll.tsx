'use client'

import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollReveal } from '@/hooks/useScrollReveal'

/**
 * Wraps the app in Lenis smooth scroll.
 * Also runs the global useScrollReveal observer so [data-reveal] elements
 * animate on every page without needing per-component hook calls.
 * Disabled automatically when prefers-reduced-motion: reduce.
 */
export default function SmoothScroll() {
  const reduced = useReducedMotion()

  // Global scroll reveal — covers all [data-reveal] elements site-wide
  useScrollReveal()

  useEffect(() => {
    if (reduced) return

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null
    let rafId = 0

    ;(async () => {
      const { default: Lenis } = await import('lenis')

      lenis = new Lenis({
        duration:  1.2,
        easing:    (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })

      function raf(time: number) {
        lenis!.raf(time)
        rafId = requestAnimationFrame(raf)
      }
      rafId = requestAnimationFrame(raf)
    })()

    return () => {
      cancelAnimationFrame(rafId)
      lenis?.destroy()
    }
  }, [reduced])

  return null
}
