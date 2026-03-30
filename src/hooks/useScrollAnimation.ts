import { type RefObject, useEffect, useState } from 'react'

interface Options {
  /** Fraction of the element that must be visible to trigger (default 0.12) */
  threshold?: number
  /** Root margin — negative value triggers before the element reaches the edge (default "-60px 0px") */
  rootMargin?: string
  /** Fire only once (default true) */
  once?: boolean
}

/**
 * Returns true once the referenced element enters the viewport.
 * Automatically disconnects the IntersectionObserver on unmount.
 *
 * Usage:
 *   const ref = useRef<HTMLElement>(null)
 *   const triggered = useScrollAnimation(ref)
 *   useEffect(() => { if (!triggered) return; animate(...) }, [triggered])
 */
export function useScrollAnimation(
  ref: RefObject<Element | null>,
  options: Options = {},
): boolean {
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      threshold  = 0.12,
      rootMargin = '-60px 0px',
      once       = true,
    } = options

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setTriggered(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // ref is stable; options treated as mount-time constants

  return triggered
}
