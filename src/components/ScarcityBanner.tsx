'use client'

import { useState, useEffect } from 'react'

export default function ScarcityBanner() {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    // Random between 3 and 13, regenerated on every page load
    setRemaining(Math.floor(Math.random() * 11) + 3)
  }, [])

  if (remaining === null) return null

  return (
    <div
      className="w-full text-center py-2 px-4"
      style={{ background: 'rgba(232,57,42,0.12)', borderBottom: '1px solid rgba(232,57,42,0.3)' }}
      role="status"
      aria-live="polite"
    >
      <p className="font-ui text-xs text-[#F5F5F5] tracking-wide">
        <span className="font-semibold text-[#E8392A]">Only {remaining} free trial spots</span>
        {' '}remaining today — claim yours before midnight
      </p>
    </div>
  )
}
