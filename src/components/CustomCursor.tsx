'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Custom circular cursor — 32px brand-red border, transparent fill.
 * Scales to 64px + red 20% fill on interactive elements.
 * Disabled on touch devices and prefers-reduced-motion.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const reduced   = useReducedMotion()

  useEffect(() => {
    // Disable on touch / hover:none devices
    if (reduced) return
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    cursor.style.opacity = '1'

    let cx = -100
    let cy = -100
    let tx = -100
    let ty = -100
    let rafId = 0

    function onMove(e: MouseEvent) {
      tx = e.clientX
      ty = e.clientY
    }

    function onEnterInteractive() {
      if (!cursor) return
      cursor.style.width            = '64px'
      cursor.style.height           = '64px'
      cursor.style.background       = 'rgba(232,57,42,0.2)'
      cursor.style.borderColor      = '#E8392A'
      cursor.style.transform        = 'translate(-50%,-50%)'
      cursor.style.mixBlendMode     = 'normal'
    }

    function onLeaveInteractive() {
      if (!cursor) return
      cursor.style.width        = '32px'
      cursor.style.height       = '32px'
      cursor.style.background   = 'transparent'
      cursor.style.transform    = 'translate(-50%,-50%)'
    }

    function loop() {
      if (!cursor) return
      // Lerp for lag effect
      cx += (tx - cx) * 0.12
      cy += (ty - cy) * 0.12
      cursor.style.left = `${cx}px`
      cursor.style.top  = `${cy}px`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })

    // Attach to all interactive elements
    function attachListeners() {
      document.querySelectorAll('a, button, [role="button"], input, label').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    }
    attachListeners()

    // Re-attach on DOM changes (for dynamically added elements)
    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
      document.querySelectorAll('a, button, [role="button"], input, label').forEach(el => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [reduced])

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position:         'fixed',
        top:              0,
        left:             0,
        width:            '32px',
        height:           '32px',
        borderRadius:     '50%',
        border:           '1.5px solid #E8392A',
        background:       'transparent',
        transform:        'translate(-50%, -50%)',
        pointerEvents:    'none',
        zIndex:           99999,
        opacity:          0,
        transition:       'width 180ms ease, height 180ms ease, background 180ms ease, border-color 180ms ease',
        mixBlendMode:     'difference',
      }}
    />
  )
}
