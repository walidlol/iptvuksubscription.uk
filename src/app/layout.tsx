import type { Metadata } from 'next'
import {
  Bebas_Neue,
  DM_Serif_Display,
  Inter,
  JetBrains_Mono,
  Geist,
} from 'next/font/google'
import './globals.css'
import { buildHomepageMetadata } from '@/lib/seo'
import { buildWebSiteSchema, buildServiceSchema } from '@/lib/schema'
import { Navbar, Footer } from '@/components/organisms'
import SmoothScroll from '@/components/SmoothScroll'
import CustomCursor from '@/components/CustomCursor'
import ScarcityBanner from '@/components/ScarcityBanner'
import ScrollProgressBar from '@/components/ScrollProgressBar'

/* ============================================================
   Fonts — all self-hosted via next/font (no Google requests)
   ============================================================ */

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
})

/* ============================================================
   Root Metadata — overridden per-page with generateMetadata()
   ============================================================ */

const baseMetadata = buildHomepageMetadata()

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon:     '/icon.png',
    shortcut: '/favicon.ico',
    apple:    '/icon.png',
  },
}

/* ============================================================
   Root Layout
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const websiteSchema = buildWebSiteSchema()
  const serviceSchema = buildServiceSchema()

  const fontClasses = [
    bebasNeue.variable,
    dmSerifDisplay.variable,
    inter.variable,
    jetbrainsMono.variable,
    geist.variable,
  ].join(' ')

  return (
    <html lang="en-GB" className={`${fontClasses} h-full antialiased`}>
      <head>
        {/* Performance: preconnect to image CDNs */}
        <link rel="preconnect" href="https://image.tmdb.org" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        {/* Noise texture — z-0 */}
        <div className="noise" aria-hidden="true" />

        {/* Skip to main content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-[#E5181E] focus:text-[#F0F2F7] focus:rounded-lg focus:font-ui focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <ScrollProgressBar />
        <SmoothScroll />
        <CustomCursor />
        <ScarcityBanner />
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  )
}
