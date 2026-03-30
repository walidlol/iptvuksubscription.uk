import type { LucideIcon, LucideProps } from 'lucide-react'

/* ============================================================
   Types
   ============================================================ */

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface IconProps extends Omit<LucideProps, 'size'> {
  /** The Lucide icon component */
  icon: LucideIcon
  size?: IconSize
  /** Required when Icon is used without an adjacent text label */
  label?: string
  /** Force presentational — explicitly skips aria-label */
  decorative?: boolean
}

/* ============================================================
   Size map — pixel values
   ============================================================ */

const sizeMap: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,  // canonical UI size per CLAUDE.md
  lg: 24,
  xl: 32,
}

/* ============================================================
   Component — Server Component safe (no client hooks)
   ============================================================ */

export default function Icon({
  icon: LucideIconComponent,
  size        = 'md',
  label,
  decorative  = false,
  className   = '',
  strokeWidth = 1.75,
  ...rest
}: IconProps) {
  const px = sizeMap[size]

  const a11yProps = decorative || !label
    ? { 'aria-hidden': true as const }
    : { 'aria-label': label, role: 'img' as const }

  return (
    <LucideIconComponent
      width={px}
      height={px}
      strokeWidth={strokeWidth}
      className={`shrink-0 ${className}`}
      {...a11yProps}
      {...rest}
    />
  )
}
