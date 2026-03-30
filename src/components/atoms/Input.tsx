'use client'

import { forwardRef, useId, useState } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

/* ============================================================
   Types
   ============================================================ */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  /** Icon rendered inside the left edge */
  leftIcon?: ReactNode
  /** Icon rendered inside the right edge */
  rightIcon?: ReactNode
}

/* ============================================================
   Component
   ============================================================ */

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    id: idProp,
    className = '',
    onFocus,
    onBlur,
    value,
    defaultValue,
    ...rest
  },
  ref,
) {
  const autoId    = useId()
  const inputId   = idProp ?? autoId
  const errorId   = `${inputId}-error`
  const hintId    = `${inputId}-hint`

  const [focused,    setFocused]    = useState(false)
  const [hasValue,   setHasValue]   = useState(
    Boolean(value ?? defaultValue ?? rest.placeholder),
  )

  const isFloating = focused || hasValue || Boolean(rest.placeholder)
  const hasError   = Boolean(error)

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(true)
    onFocus?.(e)
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setFocused(false)
    setHasValue(Boolean(e.target.value))
    onBlur?.(e)
  }

  const wrapperBorder = hasError
    ? 'border-[#EF4444]'
    : focused
      ? 'border-[#E5181E] shadow-[0_0_0_3px_rgba(229,24,30,0.15)]'
      : 'border-white/10 hover:border-white/20'

  const describedBy = [
    hasError ? errorId : null,
    hint ? hintId : null,
  ]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={`relative w-full ${className}`}>

      {/* Field wrapper */}
      <div
        className={[
          'relative flex items-center',
          'bg-white/5 backdrop-blur-sm',
          'border rounded-lg',
          'transition-all duration-200',
          wrapperBorder,
        ].join(' ')}
      >
        {/* Left icon */}
        {leftIcon && (
          <span
            aria-hidden="true"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] shrink-0"
          >
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={hasError}
          aria-describedby={describedBy}
          className={[
            'peer w-full bg-transparent text-[#F0F2F7]',
            'font-sans text-sm',
            // Vertical padding — room for floating label
            'pt-6 pb-2',
            // Horizontal padding accounts for icons
            leftIcon  ? 'pl-10' : 'pl-4',
            rightIcon ? 'pr-10' : 'pr-4',
            'outline-none',
            'placeholder-transparent',
            // Autofill — force dark background
            '[&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_#0F1117_inset]',
            '[&:-webkit-autofill]:[color:#F0F2F7]',
          ].join(' ')}
          {...rest}
        />

        {/* Floating label */}
        <label
          htmlFor={inputId}
          className={[
            'absolute left-0 top-0',
            leftIcon ? 'ml-10' : 'ml-4',
            'font-ui text-[#6B7280]',
            'pointer-events-none select-none',
            'origin-top-left transition-all duration-200',
            isFloating
              ? 'translate-y-2 scale-75 text-xs'
              : 'translate-y-4 scale-100 text-sm',
            focused && !hasError ? 'text-[#E5181E]' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          {label}
        </label>

        {/* Right icon */}
        {rightIcon && (
          <span
            aria-hidden="true"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] shrink-0"
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={errorId} role="alert" className="mt-1.5 font-ui text-xs text-[#EF4444]">
          {error}
        </p>
      )}

      {/* Hint */}
      {hint && !hasError && (
        <p id={hintId} className="mt-1.5 font-ui text-xs text-[#6B7280]">
          {hint}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
