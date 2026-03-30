'use client'

import { ArrowRight } from 'lucide-react'

/* WhatsApp SVG logo inline — official brand asset */
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '447451296412'

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}

/* Pre-built message presets */
export const WA_MESSAGES = {
  freeTrial:    "Hi! I'd like a free 24-hour trial please",
  support:      "Hi! I need help with my IPTV subscription",
  reseller:     "Hi! I'm interested in the reseller program",
  standard:     "Hi! I'd like to purchase the Standard plan (1 month - £9.99)",
  annual:       "Hi! I'd like to purchase the Annual plan (£59/year)",
  family:       "Hi! I'd like to purchase the Family plan (£129.99/year)",
  lifetime:     "Hi! I'm interested in the Lifetime Premium plan",
  general:      "Hi! I'd like to know more about IPTV UK subscription",
} as const

export type WAMessage = keyof typeof WA_MESSAGES

interface WhatsAppButtonProps {
  message: string
  children: React.ReactNode
  className?: string
  variant?: 'primary' | 'whatsapp' | 'outline'
  showIcon?: boolean
  showArrow?: boolean
}

export default function WhatsAppButton({
  message,
  children,
  className = '',
  variant = 'whatsapp',
  showIcon = true,
  showArrow = false,
}: WhatsAppButtonProps) {
  const href = waLink(message)

  const base = 'inline-flex items-center justify-center gap-2 font-ui font-semibold transition-all duration-200 cursor-pointer'

  const styles: Record<string, string> = {
    primary:   'bg-[#E8392A] text-[#F5F5F5] hover:bg-[#B52B1F] hover:shadow-[0_0_40px_rgba(232,57,42,0.5)]',
    whatsapp:  'bg-[#25D366] text-white hover:bg-[#1da851]',
    outline:   'border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/8',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles[variant]} ${className}`}
    >
      {showIcon && <WhatsAppIcon size={15} />}
      {children}
      {showArrow && <ArrowRight size={14} />}
    </a>
  )
}
