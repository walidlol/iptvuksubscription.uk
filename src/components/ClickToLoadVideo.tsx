'use client'
import { useState } from 'react'
import Image from 'next/image'

interface Props {
  videoId: string
  title: string
}

export function ClickToLoadVideo({ videoId, title }: Props) {
  const [loaded, setLoaded] = useState(false)
  const thumb = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  if (loaded) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <div
      className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer group"
      onClick={() => setLoaded(true)}
      role="button"
      aria-label={`Play ${title}`}
    >
      <Image
        src={thumb}
        alt={title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 group-hover:bg-black/40 transition-colors">
        <div className="w-20 h-20 rounded-full bg-[#E8392A] flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_40px_rgba(232,57,42,0.5)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
        <p className="text-white text-sm font-medium font-inter">{title}</p>
      </div>
    </div>
  )
}
