import type { ReactNode } from 'react'

/* ============================================================
   Types
   ============================================================ */

type BadgeVariant = 'red' | 'popular' | 'new' | 'hot' | 'sale' | 'success' | 'info' | 'muted'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  icon?: ReactNode
  className?: string
}

/* ============================================================
   Styles
   ============================================================ */

const variantStyles: Record<BadgeVariant, string> = {
  red:     'bg-[rgba(229,24,30,0.15)] text-[#FF2D34] border border-[rgba(229,24,30,0.3)]',
  popular: 'bg-[#E5181E] text-[#F0F2F7] border border-transparent',
  new:     'bg-[rgba(232,57,42,0.12)] text-[#FF4433] border border-[rgba(232,57,42,0.3)]',
  hot:     'bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border border-[rgba(245,158,11,0.3)]',
  sale:    'bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border border-[rgba(59,130,246,0.3)]',
  success: 'bg-[rgba(232,57,42,0.12)] text-[#FF4433] border border-[rgba(232,57,42,0.3)]',
  info:    'bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border border-[rgba(59,130,246,0.3)]',
  muted:   'bg-white/5 text-[#6B7280] border border-white/10',
}

/* ============================================================
   Component — Server Component (no client directive needed)
   ============================================================ */

export default function Badge({
  variant  = 'red',
  children,
  icon,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1',
        'px-2.5 py-1',
        'rounded-full',
        'font-ui text-xs font-semibold tracking-widest uppercase',
        variantStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && <span aria-hidden="true" className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
