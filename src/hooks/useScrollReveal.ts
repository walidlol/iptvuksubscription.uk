'use client'

import { useEffect } from 'react'

/**
 * Adds `revealed` class to elements with [data-reveal] when they enter the viewport.
 *
 * Variants (via data-reveal="fade-up" | "fade-left" | "fade-right" | "scale" | "stagger"):
 *   - fade-up (default): opacity 0 + translateY 40px → visible
 *   - fade-left:         opacity 0 + translateX(-40px) → visible
 *   - fade-right:        opacity 0 + translateX(40px) → visible
 *   - scale:             opacity 0 + scale(0.9) → visible
 *
 * data-reveal-delay="200" applies a delay in ms before the animation starts.
 * Respects prefers-reduced-motion — if reduced, reveals immediately without animation.
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')

    if (prefersReduced) {
      elements.forEach(el => el.classList.add('revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const el    = entry.target as HTMLElement
          const delay = Number(el.dataset.revealDelay ?? 0)
          setTimeout(() => el.classList.add('revealed'), delay)
          observer.unobserve(el)
        })
      },
      { threshold: 0.10, rootMargin: '-30px 0px' },
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
