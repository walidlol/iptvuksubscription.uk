'use client'

import { useState, useEffect } from 'react'

/**
 * Returns true if the user has requested reduced motion via their OS or browser.
 * Subscribes to live changes (e.g. user toggles the setting mid-session).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
