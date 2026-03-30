/**
 * AnimatedBackground — CSS keyframe floating shapes behind page content.
 * Pass `variant` to switch between page-specific aesthetics.
 * All shapes use opacity 0.04–0.08 — subtle, not distracting.
 */

import { type CSSProperties } from 'react'

type Variant = 'hero' | 'pricing' | 'channels' | 'default'

interface Props {
  variant?: Variant
}

const sharedStyle: CSSProperties = {
  position: 'absolute',
  pointerEvents: 'none',
  borderRadius: '9999px',
  filter: 'blur(80px)',
}

export default function AnimatedBackground({ variant = 'default' }: Props) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Top-left red orb */}
        <div style={{ ...sharedStyle, width: 600, height: 600, top: -200, left: -200, background: 'rgba(232,57,42,0.12)', animation: 'float-slow 12s ease-in-out infinite' }} />
        {/* Top-right dark orb */}
        <div style={{ ...sharedStyle, width: 500, height: 500, top: -100, right: -150, background: 'rgba(26,26,46,0.6)', animation: 'float-slow 16s ease-in-out infinite reverse' }} />
        {/* Bottom-center glow */}
        <div style={{ ...sharedStyle, width: 800, height: 400, bottom: -200, left: '50%', transform: 'translateX(-50%)', background: 'rgba(232,57,42,0.06)', animation: 'float-slow 20s ease-in-out infinite' }} />
      </div>
    )
  }

  if (variant === 'pricing') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div style={{ ...sharedStyle, width: 500, height: 500, top: '10%', left: '-10%', background: 'rgba(232,57,42,0.08)', animation: 'float-slow 14s ease-in-out infinite' }} />
        <div style={{ ...sharedStyle, width: 400, height: 400, bottom: '5%', right: '-5%', background: 'rgba(232,57,42,0.06)', animation: 'float-slow 18s ease-in-out infinite reverse' }} />
      </div>
    )
  }

  if (variant === 'channels') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div style={{ ...sharedStyle, width: 700, height: 300, top: 0, left: '20%', background: 'rgba(232,57,42,0.07)', animation: 'float-slow 20s ease-in-out infinite' }} />
      </div>
    )
  }

  // default — generic page
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div style={{ ...sharedStyle, width: 400, height: 400, top: '20%', left: '-5%', background: 'rgba(232,57,42,0.07)', animation: 'float-slow 16s ease-in-out infinite' }} />
      <div style={{ ...sharedStyle, width: 300, height: 300, bottom: '10%', right: '-5%', background: 'rgba(232,57,42,0.05)', animation: 'float-slow 22s ease-in-out infinite reverse' }} />
    </div>
  )
}
