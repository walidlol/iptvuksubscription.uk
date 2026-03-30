'use client'

import { useState } from 'react'
import { X, ArrowRight, Loader2 } from 'lucide-react'

const CURRENCIES = [
  { id: 'btc',  label: 'BTC',  name: 'Bitcoin'  },
  { id: 'eth',  label: 'ETH',  name: 'Ethereum' },
  { id: 'usdt', label: 'USDT', name: 'Tether'   },
  { id: 'ltc',  label: 'LTC',  name: 'Litecoin' },
]

interface Props {
  planName:   string
  amount:     number
  onClose:    () => void
}

export default function CryptoPayModal({ planName, amount, onClose }: Props) {
  const [currency, setCurrency] = useState('btc')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  async function handlePay() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/payment/create', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ planName, amount, payCurrency: currency }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        return
      }
      if (data.payment_url) {
        window.open(data.payment_url, '_blank', 'noopener,noreferrer')
        onClose()
      } else {
        setError('Payment URL not received. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crypto-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <h2 id="crypto-modal-title" className="font-display text-2xl text-[#F5F5F5] uppercase tracking-wide mb-1">
          Pay with Crypto
        </h2>
        <p className="font-ui text-sm text-[#9CA3AF] mb-6">
          You&apos;re paying <strong className="text-[#F5F5F5]">£{amount}</strong> for{' '}
          <strong className="text-[#E8392A]">{planName}</strong>
        </p>

        {/* Currency selector */}
        <p className="font-ui text-xs uppercase tracking-widest text-[#9CA3AF] mb-3">Pay with</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {CURRENCIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCurrency(c.id)}
              className={[
                'flex flex-col items-center gap-1 py-3 px-2 rounded-xl border font-ui text-sm font-semibold transition-all cursor-pointer',
                currency === c.id
                  ? 'border-[#E8392A] bg-[rgba(232,57,42,0.08)] text-[#F5F5F5]'
                  : 'border-white/10 text-[#9CA3AF] hover:border-white/20 hover:text-[#F5F5F5]',
              ].join(' ')}
            >
              <span className="text-lg">₿</span>
              <span>{c.label}</span>
            </button>
          ))}
        </div>

        {/* Note */}
        <p className="font-ui text-xs text-[#9CA3AF] mb-6 leading-relaxed">
          Credentials delivered via WhatsApp or Email within 15 minutes of payment confirmation.
        </p>

        {error && (
          <p className="font-ui text-sm text-[#E8392A] mb-4 p-3 bg-[rgba(232,57,42,0.1)] rounded-lg">
            {error}
          </p>
        )}

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full h-12 btn-red rounded flex items-center justify-center gap-2 font-ui font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 size={15} className="animate-spin" /> Processing…</>
          ) : (
            <>Proceed to Payment <ArrowRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  )
}
