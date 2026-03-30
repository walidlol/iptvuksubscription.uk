'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import { buttonPress } from '@/lib/animations'

/* ============================================================
   Types
   ============================================================ */

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'destructive'
type ButtonSize    = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  /** Full-width block button */
  block?: boolean
  /** Icon to render before the label */
  leftIcon?: React.ReactNode
  /** Icon to render after the label */
  rightIcon?: React.ReactNode
}

/* ============================================================
   Styles
   ============================================================ */

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[#E5181E] text-[#F0F2F7]',
    'hover:bg-[#FF2D34]',
    'hover:shadow-[0_0_40px_rgba(229,24,30,0.4),0_4px_20px_rgba(229,24,30,0.3)]',
    'active:bg-[#B81217]',
    'border border-transparent',
  ].join(' '),

  ghost: [
    'bg-transparent text-[#F0F2F7]',
    'hover:bg-white/10',
    'border border-transparent',
  ].join(' '),

  outline: [
    'bg-transparent text-[#F0F2F7]',
    'border border-white/20',
    'hover:border-white/40 hover:bg-white/5',
  ].join(' '),

  destructive: [
    'bg-transparent text-[#EF4444]',
    'border border-[#EF4444]/40',
    'hover:bg-[#EF4444]/10 hover:border-[#EF4444]/70',
  ].join(' '),
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-14 px-8 text-base gap-2.5',
}

/* ============================================================
   Component
   ============================================================ */

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant  = 'primary',
    size     = 'md',
    loading  = false,
    block    = false,
    leftIcon,
    rightIcon,
    disabled,
    children,
    className = '',
    ...rest
  },
  ref,
) {
  const isDisabled = disabled || loading

  const base = [
    // Layout
    'relative inline-flex items-center justify-center',
    // Typography
    'font-ui font-semibold tracking-wide',
    // Shape
    'rounded-lg',
    // Interaction
    'cursor-pointer select-none',
    // Transition
    'transition-colors duration-200',
    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5181E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090D]',
    // Disabled
    isDisabled ? 'opacity-50 pointer-events-none' : '',
    // Block
    block ? 'w-full' : '',
    // Size
    sizeStyles[size],
    // Variant
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <motion.button
      ref={ref}
      className={base}
      disabled={isDisabled}
      aria-busy={loading}
      {...buttonPress}
      {...rest}
    >
      {loading ? (
        <>
          <LoadingDots />
          <span className="sr-only">Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button

/* ============================================================
   LoadingDots — inline loading indicator inside Button
   ============================================================ */

function LoadingDots() {
  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  )
}
