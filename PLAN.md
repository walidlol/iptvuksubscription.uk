# PLAN.md — Homepage Architecture (Disney+ Inspired)

> Full architecture plan for iptvuksubscription.uk homepage.
> Read CLAUDE.md for design system, SEO rules, and project constraints.

---

## Overview

Disney+ inspired dark cinematic homepage for iptvuksubscription.uk. 9 sections rendered as a mix of Server Components (data fetching) and Client Components (interactivity). TMDB provides all imagery. Brand red (#E8392A) accent on deep navy-black (#0D0F18) with Bebas Neue headings and Inter body text.

---

## 1. File Structure (24 files)

### Modify (4)

```
tailwind.config.ts          ← brand colours, fonts, shadows, gradients
next.config.mjs             ← TMDB image domain allowlist
src/app/globals.css          ← CSS variables, scrollbar hiding
src/app/layout.tsx           ← Bebas Neue + Inter fonts, metadata, Navbar/Footer/SmoothScroll
```

### Rewrite (1)

```
src/app/page.tsx             ← homepage assembly, server-side TMDB fetches, JSON-LD schema
```

### Create (19)

```
src/lib/
├── tmdb.ts                  ← TMDB types, fetch helpers, normalizer, image URL builders
├── wa.ts                    ← WhatsApp link builder
└── schema.ts                ← JSON-LD schema builder functions

src/components/ui/
├── Button.tsx               ← primary/secondary/ghost variants, sm/md/lg sizes
├── WhatsAppButton.tsx       ← wraps Button, opens wa.me with pre-filled message
├── PosterCard.tsx           ← TMDB poster + hover scale via Framer Motion
└── Skeleton.tsx             ← animated pulse loading skeletons

src/components/layout/
├── Navbar.tsx               ← fixed, scroll-aware blur, logo, links, red CTA
├── MobileMenu.tsx           ← slide-in drawer, AnimatePresence, scroll lock
└── Footer.tsx               ← 4-column grid, logo, social links, copyright

src/components/
└── SmoothScroll.tsx         ← Lenis init/cleanup client wrapper

src/components/home/
├── Hero.tsx                 ← server: full-width backdrop, gradient, H1 (NO animation delay)
├── HeroClient.tsx           ← client: CTA buttons + trust badges with fade-in
├── StatsBar.tsx             ← client: 4 animated counters, whileInView
├── ContentRow.tsx           ← client: horizontal scroll row, staggered cards
├── ContentRowsSection.tsx   ← server: maps TMDB data to ContentRow components
├── PricingCards.tsx         ← client: 3 plan cards, hover lift, WhatsApp CTA
├── DeviceSection.tsx        ← server: 4 device categories grid
├── FAQSection.tsx           ← client: 6-item accordion, AnimatePresence
└── FinalCTA.tsx             ← server: full-width red CTA block
```

---

## 2. TypeScript Interfaces

### 2a. TMDB Types (`src/lib/tmdb.ts`)

```typescript
interface TMDBMovie {
  readonly id: number
  readonly title: string
  readonly overview: string
  readonly poster_path: string | null
  readonly backdrop_path: string | null
  readonly vote_average: number
  readonly release_date: string
  readonly genre_ids: readonly number[]
  readonly media_type?: 'movie'
}

interface TMDBTVShow {
  readonly id: number
  readonly name: string
  readonly overview: string
  readonly poster_path: string | null
  readonly backdrop_path: string | null
  readonly vote_average: number
  readonly first_air_date: string
  readonly genre_ids: readonly number[]
  readonly media_type?: 'tv'
}

type TMDBMediaItem = TMDBMovie | TMDBTVShow

interface TMDBPaginatedResponse<T> {
  readonly page: number
  readonly results: readonly T[]
  readonly total_pages: number
  readonly total_results: number
}

// Normalized app-level shape (used by all components)
interface MediaItem {
  readonly id: number
  readonly title: string           // movie.title or tv.name
  readonly posterUrl: string | null
  readonly backdropUrl: string | null
  readonly overview: string
  readonly rating: number
  readonly year: string
  readonly mediaType: 'movie' | 'tv'
}
```

### 2b. Content Row

```typescript
interface ContentRowProps {
  readonly title: string
  readonly items: readonly MediaItem[]
  readonly seeAllHref?: string
  readonly priority?: boolean      // first 2 rows load images eagerly
}
```

### 2c. Poster Card

```typescript
interface PosterCardProps {
  readonly item: MediaItem
  readonly priority?: boolean
  readonly index: number           // for stagger animation delay
}
```

### 2d. Hero

```typescript
interface HeroProps {
  readonly backdrop: MediaItem
}

interface HeroClientProps {
  readonly backdropUrl: string
  readonly title: string
}
```

### 2e. Stats Bar

```typescript
interface StatItem {
  readonly label: string
  readonly value: number
  readonly prefix?: string
  readonly suffix?: string
}

interface StatsBarProps {
  readonly stats: readonly StatItem[]
}
```

### 2f. Pricing

```typescript
type PlanInterval = 'monthly' | 'annual' | 'family'

interface PlanFeature {
  readonly text: string
  readonly included: boolean
}

interface Plan {
  readonly id: PlanInterval
  readonly name: string
  readonly price: number
  readonly currency: string
  readonly displayPrice: string
  readonly period: string
  readonly popular: boolean
  readonly features: readonly PlanFeature[]
  readonly whatsappMessage: string
}

interface PricingCardsProps {
  readonly plans: readonly Plan[]
}
```

### 2g. Device Section

```typescript
interface DeviceCategory {
  readonly icon: string
  readonly title: string
  readonly devices: readonly string[]
}

interface DeviceSectionProps {
  readonly categories: readonly DeviceCategory[]
}
```

### 2h. FAQ

```typescript
interface FAQItem {
  readonly question: string
  readonly answer: string
}

interface FAQSectionProps {
  readonly items: readonly FAQItem[]
}
```

### 2i. UI Components

```typescript
// Button
type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly href?: string
  readonly children: React.ReactNode
  readonly className?: string
  readonly onClick?: () => void
}

// WhatsAppButton
interface WhatsAppButtonProps {
  readonly message: string
  readonly children: React.ReactNode
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly className?: string
}

// Skeleton
interface SkeletonProps {
  readonly className?: string
}
```

### 2j. Footer

```typescript
interface FooterColumn {
  readonly title: string
  readonly links: readonly {
    readonly label: string
    readonly href: string
  }[]
}
```

---

## 3. TMDB API Data Fetching Strategy

### 3a. Base Configuration

```typescript
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p'

const fetchOptions: RequestInit = {
  headers: {
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
  },
  next: { revalidate: 3600 },
}
```

### 3b. Endpoints

| Row / Section | Endpoint | Query Params |
|---|---|---|
| **Hero backdrop** | `GET /trending/all/day` | `language=en-GB&page=1` |
| **UK Sports** | `GET /discover/tv` | `with_genres=10764&with_origin_country=GB&language=en-GB&sort_by=popularity.desc` |
| **UK Drama** | `GET /discover/tv` | `with_genres=18&with_origin_country=GB&language=en-GB&sort_by=popularity.desc` |
| **Movies** | `GET /trending/movie/week` | `language=en-GB&page=1` |
| **Kids** | `GET /discover/movie` | `with_genres=16&certification_country=GB&certification.lte=PG&language=en-GB&sort_by=popularity.desc` |
| **International** | `GET /trending/tv/week` | `language=en-GB&page=1` |
| **News** | `GET /discover/tv` | `with_genres=10763&language=en-GB&sort_by=popularity.desc` |

### 3c. Fetch Functions

```typescript
async function fetchTrending(): Promise<readonly MediaItem[]>
async function fetchHeroBackdrop(): Promise<MediaItem>
async function fetchByGenre(mediaType: 'movie' | 'tv', genreId: number, extraParams?: Record<string, string>): Promise<readonly MediaItem[]>
async function fetchContentRows(): Promise<readonly { title: string; items: readonly MediaItem[] }[]>
```

`fetchContentRows()` calls all 6 endpoints in parallel via `Promise.all`.

### 3d. Image URL Builders

```typescript
function posterUrl(path: string | null): string | null
  // → `${TMDB_IMAGE_BASE}/w500${path}` or null

function backdropUrl(path: string | null): string | null
  // → `${TMDB_IMAGE_BASE}/original${path}` or null
```

### 3e. Server vs Client Component Split

| Component | Type | Reason |
|---|---|---|
| `page.tsx` | **Server** | Fetches TMDB data, passes as props |
| `Hero.tsx` | **Server** | Renders backdrop `<Image>` with priority |
| `HeroClient.tsx` | **Client** | CTA animations only |
| `ContentRowsSection.tsx` | **Server** | Maps data to ContentRow |
| `ContentRow.tsx` | **Client** | Horizontal scroll, drag, stagger |
| `PosterCard.tsx` | **Client** | Hover scale animation |
| `StatsBar.tsx` | **Client** | Count-up on whileInView |
| `PricingCards.tsx` | **Client** | Hover effects |
| `DeviceSection.tsx` | **Server** | Static content |
| `FAQSection.tsx` | **Client** | Accordion state |
| `FinalCTA.tsx` | **Server** | Static content |
| `Navbar.tsx` | **Client** | Scroll listener, menu toggle |
| `MobileMenu.tsx` | **Client** | Slide animation |
| `Footer.tsx` | **Server** | Static links |
| `SmoothScroll.tsx` | **Client** | Lenis init/cleanup |

### 3f. Error / Fallback Strategy

1. Every fetch wrapped in try/catch, returns empty array on failure
2. Hero fallback: CSS gradient (`bg-hero` to `bg-primary`), no broken image
3. Poster fallback: CSS gradient card with title text centered
4. `page.tsx` wraps TMDB sections in `<Suspense>` with `<Skeleton>` fallbacks

---

## 4. Tailwind Config Colour System

### 4a. `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: 'var(--brand-red)',
          'red-hover': 'var(--brand-red-hover)',
        },
        bg: {
          primary: 'var(--bg-primary)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          hero: 'var(--bg-hero)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: 'var(--border)',
      },
      fontFamily: {
        heading: ['var(--font-bebas-neue)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'hero-h1': ['clamp(42px, 8vw, 80px)', { lineHeight: '1.05', letterSpacing: '0.04em' }],
        'section-h2': ['clamp(28px, 5vw, 48px)', { lineHeight: '1.1', letterSpacing: '0.04em' }],
      },
      boxShadow: {
        'brand-glow': '0 0 30px var(--brand-red-glow)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to top, var(--bg-primary) 0%, transparent 60%)',
        'hero-gradient-left': 'linear-gradient(to right, var(--bg-primary) 0%, transparent 40%)',
      },
    },
  },
  plugins: [],
}
export default config
```

### 4b. CSS Variables (`src/app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --brand-red:        #E8392A;
  --brand-red-hover:  #FF4436;
  --brand-red-glow:   rgba(232, 57, 42, 0.3);
  --bg-primary:       #0D0F18;
  --bg-surface:       #151929;
  --bg-elevated:      #1A1F33;
  --bg-hero:          #0A0C14;
  --text-primary:     #F9F9F9;
  --text-secondary:   #CACACA;
  --text-muted:       #7B7F8E;
  --border:           rgba(255, 255, 255, 0.08);
}

body {
  color: var(--text-primary);
  background: var(--bg-primary);
}

.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

### 4c. Font Setup (`src/app/layout.tsx`)

```typescript
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// <body className={`${bebasNeue.variable} ${inter.variable} font-body antialiased`}>
```

---

## 5. Animation Strategy (Framer Motion)

### 5a. Hero (LCP Protection)

```
H1 "THE UK'S #1 IPTV SUBSCRIPTION"
  → NO animation delay, NO opacity:0 initial state
  → Rendered server-side in Hero.tsx, visible on first paint
  → This IS the LCP element

Subtitle + trust badges (in HeroClient.tsx):
  → initial={{ opacity: 0, y: 20 }}
  → animate={{ opacity: 1, y: 0 }}
  → transition={{ delay: 0.3, duration: 0.6 }}

CTA Buttons (in HeroClient.tsx):
  → initial={{ opacity: 0, y: 20 }}
  → animate={{ opacity: 1, y: 0 }}
  → transition={{ delay: 0.5, duration: 0.5 }}
```

### 5b. Stats Bar (Count-up on Scroll)

```
Each counter:
  → whileInView trigger, viewport={{ once: true, amount: 0.5 }}
  → Custom useCountUp hook using requestAnimationFrame
  → Animates 0 → target over 2000ms
```

### 5c. Content Rows (Staggered Cards)

```
Row container:
  → whileInView="visible", viewport={{ once: true, amount: 0.2 }}
  → variants={{ visible: { transition: { staggerChildren: 0.05 } } }}

Each PosterCard:
  → variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
  → whileHover={{ scale: 1.05 }}
  → transition={{ type: 'spring', stiffness: 300, damping: 20 }}
```

### 5d. Pricing Cards

```
Each card:
  → whileHover={{ y: -8 }}
  → Popular card: initial scale 1.02, shadow-brand-glow
```

### 5e. FAQ Accordion

```
AnimatePresence mode="wait"
  → initial={{ height: 0, opacity: 0 }}
  → animate={{ height: 'auto', opacity: 1 }}
  → exit={{ height: 0, opacity: 0 }}
  → Chevron rotates 180deg on open
```

### 5f. Navbar (CSS, not Framer)

```
useState(scrolled) at Y > 50
  → bg-transparent → bg-bg-primary/80 backdrop-blur-lg
  → transition-all duration-300
```

### 5g. Lenis Smooth Scroll

```
"use client" wrapper in SmoothScroll.tsx
  → useEffect: init Lenis, raf loop, cleanup on unmount
  → Placed in layout.tsx wrapping {children}
```

---

## 6. SEO Schema Plan

### 6a. Schema Builder Functions (`src/lib/schema.ts`)

```typescript
function buildWebSiteSchema(): object        // @type: WebSite
function buildOrganizationSchema(): object    // @type: Organization
function buildBreadcrumbSchema(items): object // @type: BreadcrumbList
function buildWebPageSchema(page): object     // @type: WebPage
function buildServiceSchema(): object         // @type: Service
function buildAggregateRatingSchema(): object // @type: AggregateRating
function buildFAQPageSchema(items): object    // @type: FAQPage
function buildOfferSchema(plan): object       // @type: Offer + PriceSpecification
```

### 6b. Homepage Schema (`page.tsx`)

Single `<script type="application/ld+json">` with `@graph` array:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    "WebSiteSchema",
    "OrganizationSchema",
    "BreadcrumbSchema (Home)",
    "WebPageSchema",
    "ServiceSchema",
    "AggregateRatingSchema",
    "FAQPageSchema",
    "OfferSchema x3 (one per plan)"
  ]
}
```

### 6c. Root Metadata (`layout.tsx`)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://iptvuksubscription.uk'),
  title: {
    default: 'IPTV UK Subscription | #1 Premium IPTV Service in the UK',
    template: '%s | IPTV UK Subscription',
  },
  description: 'Premium IPTV UK subscription with 30,000+ channels, 4K quality...',
  keywords: ['iptv uk subscription', 'iptv uk', 'iptv subscription uk'],
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'IPTV UK Subscription' },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://iptvuksubscription.uk' },
  robots: { index: true, follow: true },
}
```

---

## 7. Section Background Alternation

Per CLAUDE.md rule: never stack two same-background sections adjacent.

| # | Section | Background |
|---|---|---|
| 1 | Hero | `bg-hero` (#0A0C14) |
| 2 | Stats Bar | `bg-surface` (#151929) |
| 3 | Content Rows | `bg-primary` (#0D0F18) |
| 4 | Pricing | `bg-surface` (#151929) |
| 5 | Devices | `bg-primary` (#0D0F18) |
| 6 | FAQ | `bg-surface` (#151929) |
| 7 | Final CTA | `brand-red` (#E8392A) |
| 8 | Footer | `bg-hero` (#0A0C14) |

---

## 8. Static Data Constants

### Plans

```typescript
const PLANS: readonly Plan[] = [
  { id: 'monthly', name: 'Monthly', price: 9.99, displayPrice: '£9.99', period: '/mo', popular: false, ... },
  { id: 'annual', name: 'Annual', price: 59, displayPrice: '£59', period: '/yr', popular: true, ... },
  { id: 'family', name: 'Family', price: 129.99, displayPrice: '£129.99', period: '/yr', popular: false, ... },
]
```

### Device Categories

```typescript
const DEVICE_CATEGORIES: readonly DeviceCategory[] = [
  { icon: 'tv', title: 'Smart TV', devices: ['Samsung', 'LG', 'Sony', 'Hisense', 'TCL', 'Philips'] },
  { icon: 'computer', title: 'Computer', devices: ['Windows', 'macOS', 'Chrome', 'Firefox', 'Edge'] },
  { icon: 'mobile', title: 'Mobile & Tablet', devices: ['iPhone', 'iPad', 'Android Phone', 'Android Tablet'] },
  { icon: 'streaming', title: 'Streaming Devices', devices: ['Amazon Firestick', 'Roku', 'Apple TV', 'Chromecast', 'MAG Box', 'Formuler'] },
]
```

### FAQ Items (6 questions)

```
1. What is IPTV UK Subscription?
2. How many channels do you offer?
3. What devices are compatible with your IPTV service?
4. Do you offer a free trial?
5. What internet speed do I need?
6. How do I subscribe to your IPTV UK service?
```

### Stats

```typescript
const STATS: readonly StatItem[] = [
  { label: 'Channels', value: 30000, suffix: '+' },
  { label: 'Subscribers', value: 100000, suffix: '+' },
  { label: 'Uptime', value: 99.9, suffix: '%' },
  { label: 'Quality', value: 4, suffix: 'K' },
]
```

---

## 9. Implementation Phases

### Phase 1: Foundation (4 files)

| File | Action |
|---|---|
| `tailwind.config.ts` | Brand colours, fonts, shadows, gradients |
| `src/app/globals.css` | CSS variables, scrollbar hiding |
| `next.config.mjs` | TMDB image domain allowlist |
| `src/app/layout.tsx` | Bebas Neue + Inter, metadata, SmoothScroll/Navbar/Footer |

### Phase 2: Library Layer (3 files)

| File | Action |
|---|---|
| `src/lib/tmdb.ts` | Types, fetch helpers, normalizer, URL builders |
| `src/lib/wa.ts` | WhatsApp link builder |
| `src/lib/schema.ts` | JSON-LD schema builders |

### Phase 3: UI Primitives (4 files)

| File | Action |
|---|---|
| `src/components/ui/Button.tsx` | primary/secondary/ghost, sm/md/lg |
| `src/components/ui/WhatsAppButton.tsx` | wa.me link wrapper |
| `src/components/ui/PosterCard.tsx` | Poster + hover scale + gradient fallback |
| `src/components/ui/Skeleton.tsx` | Animated pulse loading |

### Phase 4: Layout Components (3 files)

| File | Action |
|---|---|
| `src/components/layout/Navbar.tsx` | Fixed, blur, logo, links, CTA |
| `src/components/layout/MobileMenu.tsx` | Slide-in drawer |
| `src/components/layout/Footer.tsx` | 4-column grid |

### Phase 5: Homepage Sections (10 files)

| File | Action |
|---|---|
| `src/components/SmoothScroll.tsx` | Lenis wrapper |
| `src/components/home/Hero.tsx` | Server: backdrop, gradient, H1 |
| `src/components/home/HeroClient.tsx` | Client: CTA animations |
| `src/components/home/StatsBar.tsx` | Animated counters |
| `src/components/home/ContentRow.tsx` | Horizontal scroll row |
| `src/components/home/ContentRowsSection.tsx` | Server: data mapper |
| `src/components/home/PricingCards.tsx` | 3 plans, WhatsApp CTA |
| `src/components/home/DeviceSection.tsx` | Device grid |
| `src/components/home/FAQSection.tsx` | Accordion |
| `src/components/home/FinalCTA.tsx` | Red CTA block |

### Phase 6: Page Assembly (1 file)

| File | Action |
|---|---|
| `src/app/page.tsx` | Fetch TMDB, compose sections, inject schema |

---

## 10. `next.config.mjs` Changes

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/t/p/**',
      },
    ],
  },
}

export default nextConfig
```

---

## 11. Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| TMDB rate limiting (40 req/10s) | Medium | All fetches in parallel on ISR revalidation (1/hr). Well within limits. |
| No backdrop_path for hero | Low | Loop trending results for one with backdrop. Final fallback: CSS gradient. |
| Content row jank on mobile | Medium | CSS `overflow-x-auto` + `scroll-snap-type: x mandatory` + native touch scroll. |
| LCP degradation from hero image | High | `priority` on Image, `fetchPriority="high"`, preconnect to image.tmdb.org, no opacity:0 on H1. |
| Adjacent same-background sections | Low | Alternating bg pattern defined in Section 7 above. |
| next ^16.2.1 vs CLAUDE.md "Next.js 14" | Medium | App Router API is backward-compatible 14-16. All APIs used are stable. |

---

## 12. Homepage Assembly (`page.tsx`)

```
Server Component flow:

1. Promise.all([fetchHeroBackdrop(), fetchContentRows()])
2. Render in order:
   <Hero backdrop={heroItem} />
   <StatsBar stats={STATS} />
   <Suspense fallback={<ContentRowsSkeleton />}>
     <ContentRowsSection rows={contentRows} />
   </Suspense>
   <PricingCards plans={PLANS} />
   <DeviceSection categories={DEVICE_CATEGORIES} />
   <FAQSection items={FAQ_ITEMS} />
   <FinalCTA />
3. Inject JSON-LD <script> with @graph array
```

---

## 13. Success Criteria

- [ ] All 9 sections render in correct order
- [ ] TMDB images via `<Image>` with `priority` on hero, `revalidate: 3600`
- [ ] H1 visible on first paint (LCP < 2.5s)
- [ ] Content rows scroll horizontally on mobile and desktop
- [ ] FAQ accordion opens/closes with animation
- [ ] WhatsApp CTAs open correct wa.me links
- [ ] No adjacent sections share same background
- [ ] JSON-LD validates (WebSite, Organization, FAQPage, Service, Offer)
- [ ] Tailwind uses design system tokens exclusively (no hardcoded hex)
- [ ] Mobile responsive at 375px, 768px, 1024px, 1440px
- [ ] Lighthouse Performance 90+ desktop
- [ ] Zero TypeScript errors, zero ESLint errors
