# CLAUDE.md — iptvuksubscription.uk Master Brief v3
> Read this file completely at the start of every session before touching any code.
> Last updated: March 2026 — TMDB auto-images + Awwwards redesign.

---

## PROJECT IDENTITY

**Site:** iptvuksubscription.uk
**Business:** Premium IPTV subscription service targeting the UK market
**Goal:** Rank #1 on Google UK for three exact-match keywords while delivering an Awwwards-quality experience
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · anime.js · Lenis
**Deployment:** GitHub → Vercel dashboard (NEVER Vercel CLI)
**OS:** Windows — all terminal commands must use PowerShell syntax

---

## TARGET KEYWORDS

| Keyword | Monthly Volume | Priority |
|---|---|---|
| iptv uk subscription | 12,000–22,000 | Primary |
| iptv uk | 40,000–60,000 | Primary |
| iptv subscription uk | 18,000–30,000 | Primary |

The domain **iptvuksubscription.uk** is an Exact Match Domain (EMD). Every design and content decision must protect and leverage this advantage.

---

## SKILLS — USE THESE AUTOMATICALLY

| Skill | Location | When to use |
|---|---|---|
| ui-ux-pro-max | `skills/ui-ux-pro-max` | Before building ANY UI component |
| claude-seo | `skills/seo` | Schema, metadata, structured data, sitemaps |
| seo-audit | `skills/seo-audit` | Before and after building any page |
| content-creator | `skills/content-creator` | Writing any page content |
| copywriting | `skills/copywriting` | CTAs, headlines, conversion copy |

---

## IMAGES — AUTOMATIC RULES (never wait for manual uploads)

This is a mandatory rule. Every time any section needs images, pull them automatically using the sources below. Never use placeholder divs, never use broken img tags, never ask the user to provide images manually.

### TMDB API (primary source — movie and TV posters)
- API Key: stored in `.env.local` as `TMDB_API_KEY`
- Read Access Token: stored in `.env.local` as `TMDB_READ_ACCESS_TOKEN`
- Base poster URL: `https://image.tmdb.org/t/p/w500{poster_path}`
- Base backdrop URL: `https://image.tmdb.org/t/p/original{backdrop_path}`
- next.config.ts must include: `{ protocol: 'https', hostname: 'image.tmdb.org' }`

**TMDB endpoints to use per section:**

| Section | TMDB Endpoint | Notes |
|---|---|---|
| Homepage hero floating cards | `/trending/all/week` | Use backdrop images |
| Movies row | `/movie/popular` | Portrait posters w500 |
| UK Drama row | `/tv/popular` | Portrait posters w500 |
| International row | `/trending/all/day` | Mix of movies + TV |
| Sports row | `/search/movie?query=sport` | Sports movie posters |
| Channels page rows | `/trending/all/week` | Category filtered |
| Blog post thumbnails | `/movie/now_playing` | Landscape backdrops |

**TMDB fetch pattern (always use this in src/lib/tmdb.ts):**
```ts
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'

export async function getTrending() {
  const res = await fetch(`${BASE_URL}/trending/all/week`, {
    headers: { Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}` },
    next: { revalidate: 3600 }
  })
  return res.json()
}
```

Always fetch server-side in Next.js Server Components using `async/await`.
Always add `next: { revalidate: 3600 }` to cache for 1 hour.
Always use Next.js `<Image>` component — never raw `<img>`.
Portrait posters: `width={200} height={300}`.
Landscape backdrops: `width={1280} height={720}`.

### Unsplash (secondary source — lifestyle, devices, hero backgrounds)
No API key needed for basic usage.

| Section | Unsplash URL |
|---|---|
| Hero background | `https://source.unsplash.com/1920x1080/?cinema,dark,streaming` |
| Device section | `https://source.unsplash.com/800x600/?smart-tv,streaming` |
| About/trust section | `https://source.unsplash.com/800x600/?uk,television` |

Add `source.unsplash.com` to next.config.ts remotePatterns.
Use `priority` prop on hero images.

### Fallback — when TMDB and Unsplash both fail
Use a CSS gradient placeholder that matches brand colours:
```tsx
<div style={{ background: 'linear-gradient(135deg, #1A1A1A 0%, #2A1A1A 100%)', width: 200, height: 300 }} />
```
Never use a broken image or empty space.

### next.config.ts remotePatterns (keep these always)
```ts
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'image.tmdb.org' },
    { protocol: 'https', hostname: 'source.unsplash.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
  ]
}
```

---

## DESIGN SYSTEM

### Aesthetic
Apple TV+ meets Netflix meets Awwwards. Cinematic, premium, dark-first.
Reference: Awwwards SOTD winners, Netflix homepage, Apple TV app icons.

### Brand Colours (extracted from logo)
```
--brand-red:        #E8392A   ← primary accent, logo red
--brand-red-dark:   #B52B1F   ← hover states, depth
--brand-red-glow:   rgba(232,57,42,0.4)
--brand-black:      #0A0A0A   ← main background
--brand-surface:    #111111   ← card/section surfaces
--brand-surface-2:  #1A1A1A   ← elevated surfaces
--brand-text:       #F5F5F5   ← primary text
--brand-muted:      #616469   ← secondary text
```
Never use blue as accent. Never use pure #000 or #FFF.
Red used surgically — CTAs, borders, active states. Not everywhere.

### Typography
- Display/Headings: Bebas Neue — all h1, h2. Letter-spacing: 0.02em
- Body/UI: Inter — body text, labels, buttons, nav links
- h1: clamp(48px, 10vw, 120px)
- h2: clamp(36px, 6vw, 72px)
- Body: 16–18px, line-height 1.7

### Logo & Favicon
- File: public/icon.png (red circle icon)
- Navbar: <Image src="/icon.png" height={40} alt="IPTV UK Subscription" priority />
- layout.tsx icons: { icon: '/icon.png', shortcut: '/favicon.ico', apple: '/icon.png' }

### Global Visual Treatments
- Noise texture: body::before CSS, SVG noise 3% opacity, position fixed, pointer-events none, z-index 9999
- Section rhythm: alternate #0A0A0A and #111111 — never two same-colour sections adjacent
- Red dividers: 2px horizontal brand-red lines between major sections
- Glow: --red-glow: 0 0 40px rgba(232,57,42,0.4) on featured cards and CTA buttons

---

## INSTALLED PACKAGES

- animejs (dynamic import only)
- lenis (dynamic import only)
- @types/animejs

All anime.js must be: const anime = (await import('animejs')).default
Never import anime.js at the top of a file — always dynamic inside useEffect.

---

## ENVIRONMENT VARIABLES

Stored in `.env.local` (never commit this file — it is in .gitignore).
For Vercel production: add these same variables in the Vercel dashboard → Settings → Environment Variables.

| Variable | Purpose |
|---|---|
| TMDB_API_KEY | TMDB v3 API key for movie/TV data |
| TMDB_READ_ACCESS_TOKEN | TMDB Bearer token for all API calls |

Access in code: `process.env.TMDB_READ_ACCESS_TOKEN`
Only accessible server-side (no NEXT_PUBLIC_ prefix) — keep them secret.

---

## CORE COMPONENTS (already built — edit only, do not recreate)

| Component | Path | Purpose |
|---|---|---|
| SmoothScroll | src/components/SmoothScroll.tsx | Lenis wrapper, imported in layout.tsx |
| CustomCursor | src/components/CustomCursor.tsx | Red ring cursor, disabled on touch |
| useScrollReveal | src/hooks/useScrollReveal.ts | IntersectionObserver for data-reveal elements |

### useScrollReveal usage
```tsx
<div data-reveal data-reveal-delay="200">content</div>
```
Default: opacity 0 + translateY 40px → opacity 1 + translateY 0, 600ms ease.

### CustomCursor
- Default: 32px circle, brand-red border, transparent fill
- Hover buttons/links: 64px, brand-red 20% opacity fill
- cursor-none on html tag
- Disabled on touch: @media (hover: none) { cursor: auto }

---

## SITE STRUCTURE

```
/                           ← Homepage
/pricing/                   ← Plans & Pricing
/iptv-uk-channels/          ← Channels (Netflix row layout)
/iptv-subscription-uk/      ← Features & value prop
/setup-guide/               ← Device setup guides
/blog/                      ← Blog index
/blog/[slug]/               ← Individual posts
/faq/                       ← FAQ accordion
/contact/                   ← Contact
/privacy-policy/
/terms/
/refund-policy/
```

No page more than 3 clicks from homepage. Flat architecture mandatory.

---

## HOMEPAGE SECTIONS (order matters)

1. HERO — 100vh, floating TMDB backdrop cards with mouse parallax, word-by-word H1 reveal, magnetic CTA buttons, trust badges, red divider bottom
2. STATS BAR — #111111 bg, 4 stats with count-up, Bebas Neue 72px red numbers
3. WHAT YOU'LL WATCH — 4 Netflix rows with real TMDB posters, Apple TV 3D card tilt
4. WORKS ON EVERY DEVICE — 5 device icons, TV screen mockup with red glow
5. PRICING — 3 cards, popular card elevated + red glow, Apple TV tilt, WhatsApp CTA
6. TESTIMONIALS — 3-column masonry, red quote marks, star ratings
7. FAQ PREVIEW — 5 questions, accordion, red left border active
8. FINAL CTA — full-width brand-red section, white Bebas Neue 80px heading
9. MEGA FOOTER — #0A0A0A, 4 columns, red top border, logo top-left

---

## NAVBAR (all pages)

- Logo: public/icon.png, 40px
- Transparent on load → rgba(10,10,10,0.95) + backdrop-filter blur(20px) after 50px scroll
- Links: Inter 14px uppercase letter-spaced, active = brand-red underline
- Mobile: hamburger → full-screen overlay, Bebas Neue 56px links, stagger animate from bottom

---

## CHANNELS PAGE

- Hero: 30,000+ IPTV UK CHANNELS, Bebas Neue 80px, count-up
- Search bar: dark input, red focus border, live JS filter
- 6 Netflix rows with TMDB posters: UK Sports · UK Drama · UK & Int'l News · Movies · Kids · International
- Channel cards: 160×80px, #1A1A1A, red left border, hover = red all around + scale 1.05

---

## PLANS PAGE

- Hero: IPTV UK PLANS & PRICING, Bebas Neue 80px, red gradient underline
- Pricing cards with Apple TV tilt
- Comparison table: alternating row backgrounds, red checkmarks
- Long-form content: accordion components only — no walls of plain text

---

## ON-PAGE SEO

### Homepage meta
- Title: IPTV UK Subscription — 30,000+ Channels | #1 UK IPTV Provider 2026
- Description: Premium IPTV subscription UK with 30,000+ live channels, 4K quality & anti-freeze technology. Trusted by 100,000+ UK subscribers. Setup in under 5 minutes. 7-day money-back guarantee.
- H1: THE UK'S BEST IPTV SUBSCRIPTION
- First 100 words must contain "IPTV UK subscription" naturally

### Content minimums
| Page | Words |
|---|---|
| Homepage | 2,500 |
| Pricing | 600–800 MAX |
| Channels | 2,000 |
| Setup Guide | 3,000 |
| FAQ | 2,500 |

### Every page checklist
- [ ] Canonical tag
- [ ] OG tags (title, description, image)
- [ ] Twitter Card tags
- [ ] JSON-LD structured data
- [ ] Images: WebP, descriptive filename, keyword alt text, explicit width/height
- [ ] Links to homepage with keyword anchor text
- [ ] Breadcrumb navigation
- [ ] No broken links

---

## SCHEMA MARKUP

- All pages: WebSite, Organization, BreadcrumbList
- Homepage: WebPage, AggregateRating
- Pricing: Offer + PriceSpecification per plan
- FAQ: FAQPage on every Q&A pair
- Blog: Article, Person, BlogPosting
- Setup Guide: HowTo with HowToStep
- Reviews: Review, AggregateRating

---

## GEO (AI SEARCH)

- llms.txt at project root
- FAQ written as direct Q&A (AI cites verbatim)
- E-E-A-T: author bios, detailed About page, trust signals above fold
- Clear factual statements: exact channel counts, uptime %, pricing

---

## CORE WEB VITALS

- LCP < 2.5s: H1 is LCP element, no animation delay on it, priority on hero image
- CLS < 0.1: explicit width/height on ALL images and embeds
- INP < 200ms: dynamic import anime.js and Lenis, defer non-critical JS
- All animations: check !window.matchMedia('(prefers-reduced-motion: reduce)').matches

---

## ANIMATION REFERENCE

| Animation | Trigger | Notes |
|---|---|---|
| Hero word reveal | On load | 80ms stagger per word |
| Stats count-up | IntersectionObserver | Start from 0 |
| Section reveals | data-reveal attribute | 600ms ease |
| Card 3D tilt | mousemove on card | Max 15deg rotate X/Y |
| Hero parallax cards | mousemove on window | Different speeds per card |
| Smooth scroll | Global | Lenis wraps entire app |
| Custom cursor | mousemove | Disabled on touch |
| Navbar blur | scroll > 50px | CSS transition |
| Mobile menu | click | Stagger links from bottom |
| CTA magnetic | mousemove near button | Moves toward cursor |
| FAQ accordion | click | Smooth height transition |

---

## INTERNAL LINKING SILO

```
HOMEPAGE (hub)
├── /pricing/ → anchor: "iptv subscription uk"
├── /iptv-uk-channels/ → anchor: "iptv uk"
├── /setup-guide/ → anchor: "iptv uk subscription"
├── /faq/ → anchor: "best iptv uk"
└── /blog/[posts] → each links to 2+ money pages
```

Never use "click here". Always keyword-rich anchors.

---

## IMAGE FOLDERS (for any manually provided assets)

```
public/
  icon.png              ← logo + favicon
  favicon.ico
  images/
    hero/               ← hero backgrounds (fallback if TMDB unavailable)
    channels/           ← channel posters (fallback)
    devices/            ← device photos
    content/            ← category artwork (fallback)
    og-image.png        ← 1200×630 OG image
```

Always use Next.js <Image> component. Never raw <img> tags.
Hero: priority prop. Everything else: loading="lazy".

---

## WHAT NOT TO DO

- Never use placeholder divs when images are needed — use TMDB or Unsplash automatically
- Never ask the user to provide images manually
- Never keyword stuff
- Never use --no-verify on git commits
- Never modify eslint/tailwind config — fix the code
- Never create a nested folder with same name as parent
- Never use Vercel CLI
- Never hardcode #000000 or #FFFFFF
- Never import anime.js at file top — dynamic only
- Never use blue as accent
- Never make pricing page over 800 words
- Never put two same-background sections adjacent
- Never delay hero H1 — it is the LCP element
- Never use raw <img> tags — always Next.js <Image>
- Never commit .env.local to git

---

## SESSION STARTUP CHECKLIST

1. Read this entire file
2. git status — understand current state
3. npm run dev — confirm no build errors
4. Check which page was last worked on
5. Ask what to build today before starting
6. Query skills/ui-ux-pro-max before any UI component
7. Run seo-audit after completing any page

---

## DEPLOYMENT

- git push origin main → auto-deploys via Vercel + GitHub connection
- Never use vercel CLI
- Env vars in production: Vercel dashboard → Settings → Environment Variables
  - TMDB_API_KEY
  - TMDB_READ_ACCESS_TOKEN
  - FOOTBALL_DATA_API_KEY
  - NEWS_API_KEY
  - NOWPAYMENTS_API_KEY
  - NEXT_PUBLIC_SITE_URL=https://iptvuksubscription.uk
  - NEXT_PUBLIC_WHATSAPP_NUMBER=447451296412
- Every branch push = preview deployment URL


---

## SELF-LEARNING RULES — CLAUDE MUST FOLLOW THESE ALWAYS

At the end of every session, before closing, Claude must update this CLAUDE.md file
with anything new learned during that session. This keeps the brief alive and growing.

### What to add under "LEARNED — CODE":
- Any bug that was fixed and how it was fixed
- Any package version conflict discovered and resolved
- Any Next.js / Tailwind / anime.js / Lenis pattern that worked well
- Any pattern that caused errors and must be avoided
- Any performance trick that improved build or runtime speed

### What to add under "LEARNED — SEO":
- Any metadata pattern that was improved
- Any Schema markup fix or addition
- Any internal linking improvement made
- Any content change that improved keyword density naturally
- Any technical SEO issue found and fixed (canonical, OG, sitemap, etc)

### What to add under "LEARNED — DESIGN & BRAND":
- Any animation that looked great and should be reused
- Any colour usage that worked well or looked off
- Any component pattern that matched the Awwwards standard
- Any spacing, typography or layout decision that improved quality
- Any hover effect or interaction that felt premium

### What to add under "LEARNED — AVOID":
- Any approach that broke the build
- Any pattern that caused scroll lock, hydration errors, or TypeScript errors
- Any animation that hurt LCP or CLS scores
- Any design decision that looked generic or off-brand
- Any SEO mistake made (duplicate tags, missing canonical, etc)

---

## LEARNED — CODE
- WhatsAppButton component at src/components/WhatsAppButton.tsx — use this everywhere instead of inline wa.me links; reads NEXT_PUBLIC_WHATSAPP_NUMBER env var
- useScrollAnimation takes only 1-2 args (ref + options) — never pass a third `reduced` argument
- NOWPayments integration: lib at src/lib/nowpayments.ts, API routes at /api/payment/create and /api/payment/webhook
- football-data.org team crests domain: add `{ protocol: 'https', hostname: 'crests.football-data.org' }` to next.config.ts remotePatterns
- all async server components (LiveSports, TrendingVOD, News) must be wrapped in <Suspense fallback={<SectionSkeleton/>}> in page.tsx
- CryptoPayModal is a 'use client' modal triggered by a button; keeps payment logic entirely client-side with fetch to /api/payment/create
- Skeleton components in src/components/ui/Skeleton.tsx — use MatchCardSkeleton, PosterCardSkeleton, NewsCardSkeleton per section type
- nested folder bug: never run create-next-app with same name as parent folder
- anime.js must always be dynamically imported inside useEffect, never at file top
- Lenis must be destroyed on unmount: return () => { lenis.destroy() }
- overflow:hidden on page wrappers causes scroll lock — only use on deliberate scroll containers
- all Next.js Image remotePatterns must be added to next.config.ts or images return null
- local flag/country images (german.jpg, turkish.jpg etc) should use CSS gradient + emoji instead
- .env.local must be in .gitignore before first commit — check every session
- TMDB fetch must use next: { revalidate: 3600 } to avoid rate limiting on every request
- blog [slug] page: use `const { slug } = await params` — params is now a Promise in Next.js 16
- shared types used by both server and client components must live in a neutral file with no 'use client'
- fallback image src with ?? path causes broken img if TMDB fails — use conditional rendering instead: {posterUrl && <Image src={posterUrl} />}
- ScarcityBanner must be 'use client' and set state in useEffect (not useState initialiser) to avoid hydration mismatch
- scroll progress bar: set width via direct DOM style in scroll event listener, not React state — prevents re-render on every scroll tick
- images.formats: ['image/avif', 'image/webp'] in next.config.ts enables automatic AVIF serving with WebP fallback
- Blog posts use static data in [slug]/page.tsx via blogPosts.ts — no CMS needed. Never make blog data async.
- Pricing cards must be hardcoded — never async. All plan data lives in the pricing page itself as a const array.
- WhatsAppButton, ScarcityBanner, ChannelSearch all use `export default` — always import as default, never named import
- ClickToLoadVideo component at src/components/ClickToLoadVideo.tsx — lazy-loads YouTube iframe on click to protect LCP
- SectionSkeleton at src/components/ui/SectionSkeleton.tsx — use for any async section fallback
- PricingCardsSkeleton at src/components/ui/PricingCardsSkeleton.tsx — use as Suspense fallback on pricing sections
- img.youtube.com must be in next.config.ts remotePatterns for YouTube thumbnail Images
- /pricing/ page exists at src/app/pricing/page.tsx — hardcoded cards, comparison table, payment FAQ, pricing FAQ
- /iptv-uk-channels/ page exists at src/app/iptv-uk-channels/page.tsx — TMDB poster rows + static channel pills
- /contact/ page exists at src/app/contact/page.tsx — WhatsApp card + email card + topic shortcuts
- PricingTable (homepage) was invisible because useScrollAnimation return value was discarded — always use `const triggered = useScrollAnimation(ref)` and wire it to a useEffect that animates anime-hidden elements
- useScrollReveal() now runs globally from SmoothScroll.tsx — no need to call it in individual components for data-reveal elements
- HomepageRich.tsx contains WhyChooseUs, HowItWorks, WhatsIncluded, ResellerBanner — 4 new homepage sections
- anime.js delay callback type must be `(_: unknown, i: number)` not `(_: HTMLElement, i: number)` — Target is not HTMLElement
- Every async Suspense fallback must have min-h-[200px] or use a skeleton — never null/empty fallback
- SmoothScroll.tsx is the global entry point for scroll reveal — it calls useScrollReveal() which covers all [data-reveal] elements

## LEARNED — SEO
- pricing page must never exceed 800 words — conversion beats content length here
- first 100 words of homepage must contain "IPTV UK subscription" naturally
- FAQPage Schema on every FAQ item = featured snippet eligibility
- every blog post needs Article + Person Schema and links to 2+ money pages
- llms.txt at project root helps AI search engines (ChatGPT, Perplexity) cite the site
- internal anchor text must always be keyword-rich — never "click here"
- canonical tag must be present on every page including blog posts
- blog post slug pages use buildPageMetadata with type:'article' for correct OG type
- sitemap.ts: import getAllSlugs() from blogPosts and spread blog URLs into the sitemap array
- homepageFAQs expanded to 20 questions — more questions = more featured snippet coverage
- blog post sidebar links back to / (IPTV UK subscription), /plans/ (IPTV subscription UK), /channels/ (IPTV UK) — covers all 3 primary keywords in anchor text

## LEARNED — DESIGN & BRAND
- brand red is #E8392A — never use #CC0000 or #FF0000 as substitutes
- background alternates between #0A0A0A and #111111 — never two same sections adjacent
- Bebas Neue for all display headings, Inter for all body text — never mix in other fonts
- logo is icon only in navbar and footer — never show text beside it (/icon.png, width/height 40)
- red is used surgically — CTAs, active states, borders — not as a fill colour everywhere
- animated background shapes must be opacity 0.04–0.08 max — subtle, not distracting
- scarcity banner random number must be between 3 and 13 — regenerates on every page load
- card hover: translateY(-8px) + red glow shadow feels premium, use this pattern everywhere
- scroll progress bar: 2px red line at top of viewport — implemented as #scroll-progress div, width set via JS
- AnimatedBackground component: absolute-positioned orbs with float-slow keyframe at 12–22s — very subtle, enhances depth without distraction
- data-reveal variants in globals.css: fade-up (default), fade-left, fade-right, scale — use data-reveal="fade-left" on section headings, data-reveal="scale" on cards

## LEARNED — AVOID
- never use #22C55E green as a UI colour — only #25D366 (WhatsApp official) on WhatsApp buttons/links
- never use green for check marks or success indicators — use brand-red #E8392A
- never hardcode wa.me/447700000000 — always use waLink() from WhatsAppButton.tsx or NEXT_PUBLIC_WHATSAPP_NUMBER
- never use blue as an accent colour anywhere on this site
- never use position:fixed on animated elements without testing mobile first
- never delay hero H1 with animation — it is the LCP element and must paint immediately
- never import animejs at the top of a file — hydration errors on SSR
- never use raw <img> tags — always Next.js <Image> component
- never commit .env.local — TMDB keys are in there
- never use Vercel CLI — always GitHub push to trigger Vercel deploy
- never create a folder with same name as the parent project folder
- never stack two sections with same background colour adjacent
- never make pricing page a wall of text — use accordions for long content
- never use --no-verify on git commits
- never modify eslint or tailwind config to suppress warnings — fix the actual code

---

## MCP SERVERS INSTALLED

| Server | Scope | Purpose |
|---|---|---|
| context7 | user | Live Next.js, Tailwind, anime.js, Lenis docs — add "use context7" to any library prompt |
| playwright | local | Browse localhost:3000, take screenshots, test interactions |
| github | user | Push commits, open PRs, manage repo |
| superpowers | user | Brainstorming, planning, TDD, systematic debugging |

### When to use each:
- Building any component → "use context7" for correct current API
- After any build → "Use Playwright to screenshot localhost:3000 and report issues"
- After completing a feature → "Use GitHub to push and create a PR"
- Before starting a new page → "Use superpowers brainstorming skill to plan the approach"

### Tool Usage Protocol:
- On-Demand Only: Do NOT use these tools unless I explicitly ask or if the task absolutely requires live data (e.g., debugging a broken UI).

- No Auto-Push: Never use the github MCP to commit or push unless I give a specific "Proceed to push" command.

- No Auto-Screenshot: Only use playwright if I ask for a visual check or if we are troubleshooting a rendering issue.