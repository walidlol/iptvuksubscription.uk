# CLAUDE.md — iptvuksubscription.uk
> Read this file completely before touching any code.
> April 2026 — Liquid Glass design, fresh build.

---

## PROJECT IDENTITY

**Site:** iptvuksubscription.uk
**Business:** Premium IPTV subscription service targeting the UK market
**Goal:** Rank #1 on Google UK for EMD keywords. Deliver a liquid glass, fast, professional experience.
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lenis
**Deployment:** GitHub → Vercel auto-deploy (NEVER Vercel CLI)
**OS:** Windows — PowerShell syntax only
**Design:** Liquid Glass — frosted translucent surfaces, neutral tones, Apple-tier polish. NOT Netflix. NOT generic dark streaming.

---

## TARGET KEYWORDS (EMD)

| Keyword | Volume | Priority |
|---|---|---|
| iptv uk subscription | 12,000–22,000 | Primary |
| iptv uk | 40,000–60,000 | Primary |
| iptv subscription uk | 18,000–30,000 | Primary |

---

## DESIGN SYSTEM — LIQUID GLASS

### Aesthetic
Apple Liquid Glass (iOS 26 style). Frosted translucent cards over cinematic backdrops. Clean, minimal, professional, FAST. No neon, no heavy gradients, no childish icons.

### Colours (Neutral + Glass)
```
--bg-deep:             #08090C
--bg-primary:          #0C0D12
--bg-surface:          #12141A
--bg-glass:            rgba(255,255,255,0.06)
--bg-glass-hover:      rgba(255,255,255,0.10)
--border-glass:        rgba(255,255,255,0.12)
--border-glass-strong: rgba(255,255,255,0.20)
--text-primary:        #F2F2F7
--text-secondary:      #B8B8C0
--text-muted:          #6E6E7A
--accent:              #FFFFFF
--glass-shadow:        0 8px 32px rgba(0,0,0,0.3)
--glass-blur:          blur(20px)
--glass-inner:         inset 0 1px 0 0 rgba(255,255,255,0.15)
```

### NO red as primary. Red only for:
- Live sports badges (small red dot + "LIVE")
- Error states
- Logo icon accent (subtle)

### Glass CSS Pattern
```css
.glass {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 0 rgba(255,255,255,0.15);
  border-radius: 16px;
}
```

### LiquidGlass Component
Wrapper with SVG distortion filter. Use on: Navbar, pricing cards, CTA buttons, login form, feature cards. Use SPARINGLY — not on every element.

### Typography
- Headings: Bebas Neue — uppercase, letter-spacing 0.04em
- Body/UI: Inter — weight 400/500/600
- Hero H1: clamp(42px, 8vw, 80px)
- Section H2: clamp(28px, 5vw, 48px)
- Body: 15px, line-height 1.6

### Icons
- lucide-react ONLY — Monitor, Laptop, Smartphone, Tv, Wifi, Shield, Zap, Globe, etc.
- NO childish/cartoon icons ever

### Animations (Framer Motion)
- Page load: staggered fade-up (0.1s intervals)
- Scroll: whileInView fade-up on sections
- Cards: hover scale 1.03 + translateY(-4px) + glass brighten
- Buttons: hover scale 1.02 + glow increase
- Hero H1: NO delay — LCP element
- Respect prefers-reduced-motion

### Cursor
- Default system cursor — no custom cursor (performance)

---

## CONTENT — THREE EQUAL PILLARS

### 1. LIVE SPORTS (HIGH PRIORITY)
- Premier League fixtures via football-data.org
- Match cards: team crests, scores, kickoff times, "LIVE" red dot
- Channel list: Sky Sports, TNT Sports, BT Sport, BBC Sport
- Env: `FOOTBALL_DATA_API_KEY`

### 2. UK & WORLD NEWS
- Trending headlines via NewsAPI
- Cards: thumbnail, headline, source, time
- Channels: BBC News, Sky News, ITV News, CNN, Al Jazeera
- Env: `NEWS_API_KEY`

### 3. MOVIES & TV
- TMDB trending posters/backdrops
- Rows: Movies, UK Drama, Kids, International
- Env: `TMDB_API_KEY`, `TMDB_READ_ACCESS_TOKEN`

---

## NAVBAR — ALWAYS GLASS

Not transparent-then-blur. Glass from the start. Always visible over hero.
```
Position: fixed top
Background: rgba(12,13,18,0.7) + backdrop-filter blur(20px)
Border-bottom: 1px solid rgba(255,255,255,0.08)
Logo left · nav links center (Inter 14px 500) · glass CTA right
Mobile: hamburger → slide-in glass drawer
Links: Home, Plans, Channels*, Setup*, FAQ, Blog (* gated)
```

---

## LOGIN PAGE — VIDEO BACKGROUND

- Full-screen looping video (compressed WebM, max 1.5MB)
- Source: user's MP4 at `C:\Users\hp\Desktop\top-movies-and-tv-shows-2026-oscars.mp4`
- Compress: `ffmpeg -i input.mp4 -vcodec libvpx-vp9 -b:v 500k -vf "scale=1280:-1" -an -t 15 -r 24 public/login-bg.webm`
- Fallback: copy MP4 directly, lazy-load with preload="none"
- Dark overlay rgba(0,0,0,0.6) over video
- Centered LiquidGlass card: logo, tagline, phone input, OTP input, glass submit button
- Video: autoplay, muted, loop, playsInline

---

## DEVICE SECTION

"Watch on Any Device, Anywhere" heading.
4 glass cards with lucide-react icons:
- Smart TV (Tv icon): Samsung, LG, Sony, Android TV
- Computer (Monitor icon): Windows, macOS, Chrome
- Mobile & Tablet (Smartphone icon): iOS, Android, Fire Tablet
- Streaming Devices (Wifi icon): Firestick, Roku, Apple TV, MAG Box, Chromecast

---

## HOMEPAGE SECTIONS (exact order)

1. **HERO** — TMDB backdrop, gradient, H1, glass CTAs, trust line
2. **STATS BAR** — 30,000+ Channels · 100,000+ Subs · 99.9% Uptime · 4K
3. **LIVE SPORTS** — Premier League fixtures, glass match cards
4. **CONTENT ROWS** — 4 TMDB rows: Movies, UK Drama, Kids, International
5. **UK NEWS** — NewsAPI cards, thumbnail + headline
6. **PRICING** — 3 glass cards: £9.99/mo · £59/yr · £129.99/yr family
7. **DEVICES** — 4 glass device cards with lucide icons
8. **FAQ** — 6 questions, glass accordion, FAQPage schema
9. **FINAL CTA** — glass button, "Start Watching Today"
10. **FOOTER** — 4-column, glass top border

---

## GATED PAGES (WhatsApp Auth)

1. User clicks gated link → `/login`
2. Video bg + glass form: phone input → OTP
3. MVP: code shown on screen, user sends to WhatsApp to verify
4. JWT cookie (7 days, httpOnly, secure)
5. middleware.ts checks on: /channels, /setup-guide, /plans/advanced

---

## PAYMENTS

Primary: WhatsApp glass CTA → wa.me pre-filled message
Secondary: NOWPayments crypto (BTC/USDT/ETH) in glass modal
Env: `NOWPAYMENTS_API_KEY`

---

## ENVIRONMENT VARIABLES (.env.local)

```
TMDB_API_KEY=
TMDB_READ_ACCESS_TOKEN=
FOOTBALL_DATA_API_KEY=
NEWS_API_KEY=
NOWPAYMENTS_API_KEY=
AUTH_SECRET=
NEXT_PUBLIC_WHATSAPP_NUMBER=447451296412
NEXT_PUBLIC_SITE_URL=https://iptvuksubscription.uk
```

Generate AUTH_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

---

## SEO — TOP 200 FACTORS

### Domain: EMD exact match, keyword first, .uk TLD
### Page-Level: keyword in title (front-loaded), H1, meta desc, first 100 words. Content: homepage 2500+, FAQ 2500+, blog 1500+, pricing 600-800 MAX. LSI: "live TV", "UK channels", "Sky Sports", "Premier League", "streaming". Images: descriptive alt, WebP/AVIF, explicit dimensions. CWV: LCP <2.5s, CLS <0.1, INP <200ms.
### Site-Level: contact page, SSL, breadcrumbs, sitemap, mobile-first, legal pages
### Schema: WebSite, Organization, BreadcrumbList (all pages). Service, AggregateRating (home). Offer (pricing). FAQPage (faq). Article (blog). HowTo (setup).
### Internal links: keyword-rich anchors, never "click here"

---

## FILE STRUCTURE

```
src/
├── app/
│   ├── layout.tsx · page.tsx
│   ├── pricing/ · faq/ · blog/ · blog/[slug]/ · contact/
│   ├── login/                  ← video bg + glass form
│   ├── channels/               ← GATED
│   ├── setup-guide/            ← GATED
│   ├── plans/advanced/         ← GATED
│   ├── privacy-policy/ · terms/ · refund-policy/
│   └── api/auth/ · api/payment/
├── components/
│   ├── layout/ (Navbar, Footer, MobileMenu)
│   ├── home/ (Hero, ContentRow, LiveSports, NewsSection, PricingCards, DeviceSection, FAQSection, StatsBar)
│   ├── ui/ (LiquidGlass, GlassButton, GlassCard, WhatsAppButton, PosterCard, Skeleton)
│   ├── auth/ (LoginForm)
│   └── SmoothScroll.tsx
├── lib/ (tmdb.ts, football.ts, news.ts, wa.ts, auth.ts, schema.ts)
├── middleware.ts
└── styles/globals.css
```

---

## SKILLS

| Skill | When |
|---|---|
| frontend-patterns | Components |
| seo, seo-audit, seo-schema, seo-content, seo-technical, seo-sitemap | SEO work |

### MCP: context7 (docs), superpowers (planning), playwright (screenshots), github (push)
### Tool Usage: On-Demand Only. No Auto-Push. No Auto-Screenshot.

---

## DO NOT

- Use red as primary accent — white/glass only
- Use childish icons — lucide-react only
- Use custom cursor
- Make navbar transparent at top — always glass
- Use anime.js — Framer Motion only
- Use `<img>` (except NewsAPI)
- Delay hero H1 — LCP element
- Keyword stuff
- Commit .env.local
- Use Vercel CLI
- Stack same-bg sections adjacent
- Exceed 800 words on pricing page

---

## LEARNED — CODE
(Claude adds each session)

## LEARNED — SEO
(Claude adds each session)

## LEARNED — DESIGN
(Claude adds each session)

## LEARNED — AVOID
(Claude adds each session)