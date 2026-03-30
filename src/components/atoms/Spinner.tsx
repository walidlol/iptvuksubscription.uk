'use client'

import { motion } from 'framer-motion'

/* ============================================================
   Types
   ============================================================ */

type SpinnerSize  = 'sm' | 'md' | 'lg'
type SpinnerColor = 'red' | 'white' | 'muted'

interface SpinnerProps {
  size?:  SpinnerSize
  color?: SpinnerColor
  /** Accessible label for screen readers */
  label?: string
  className?: string
}

/* ============================================================
   Size map
   ============================================================ */

const sizeMap: Record<SpinnerSize, { px: number; stroke: number }> = {
  sm: { px: 16, stroke: 2   },
  md: { px: 24, stroke: 2.5 },
  lg: { px: 40, stroke: 3   },
}

const colorMap: Record<SpinnerColor, { track: string; arc: string }> = {
  red:   { track: 'rgba(229,24,30,0.2)',  arc: '#E5181E' },
  white: { track: 'rgba(255,255,255,0.2)', arc: '#F0F2F7' },
  muted: { track: 'rgba(107,114,128,0.3)', arc: '#6B7280' },
}

/* ============================================================
   Component
   ============================================================ */

export default function Spinner({
  size      = 'md',
  color     = 'red',
  label     = 'Loading…',
  className = '',
}: SpinnerProps) {
  const { px, stroke } = sizeMap[size]
  const { track, arc } = colorMap[color]
  const r      = (px - stroke) / 2
  const circum = 2 * Math.PI * r

  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <motion.svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {/* Background track */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke={track}
          strokeWidth={stroke}
        />
        {/* Animated arc */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={r}
          stroke={arc}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circum}
          strokeDashoffset={circum * 0.72}
          transform={`rotate(-90 ${px / 2} ${px / 2})`}
        />
      </motion.svg>
      <span className="sr-only">{label}</span>
    </span>
  )
}
