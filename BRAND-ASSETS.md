# IPTV UK Subscription — Brand Assets

> Single source of truth for all brand assets. Update this file whenever assets change.

---

## Identity

| Property | Value |
|---|---|
| Brand name | IPTV UK Subscription |
| Domain | iptvuksubscription.uk |
| Tagline | The UK's #1 IPTV Subscription |
| Legal entity | IPTV UK Subscription |

---

## Contact

| Channel | Value |
|---|---|
| WhatsApp (business) | +212 762 151 824 |
| WhatsApp (wa.me) | `https://wa.me/212762151824` |
| Email | support@iptvuksubscription.uk |
| Env var | `NEXT_PUBLIC_WHATSAPP_NUMBER=212762151824` |

> **Note:** Auth accepts UK phone numbers only (+44). The business WhatsApp is Moroccan (+212).

---

## Logo Files

| File | Usage | Format |
|---|---|---|
| `public/logo.svg` | Full horizontal logo (icon + wordmark + tagline) | SVG vector |
| `public/logo-icon.svg` | Icon mark only — favicons, navbar, social avatar | SVG vector |
| `public/icon.png` | Legacy PNG icon (navbar, fallback) | PNG raster |

### Logo SVG — Design Specs
- **Icon mark:** Dark circle (#0C0D12) with glass border (rgba(255,255,255,0.14)) + 3-arc broadcast signal (white, decreasing opacity) + red dot base (#E8392A)
- **Wordmark:** "IPTV" in #F2F2F7 + "UK" in rgba(242,242,247,0.55) — Bebas Neue 30px, letter-spacing 3px
- **Tagline:** "SUBSCRIPTION" — Inter 8px, rgba(184,184,192,0.60), letter-spacing 3.5px
- **Red accent dot:** divider between "IPTV" and "UK" at rgba(232,57,42,0.70)

### Navbar Usage
```tsx
<Image src="/icon.png" height={36} width={36} alt="IPTV UK Subscription" priority />
// or use logo-icon.svg for vector quality:
<img src="/logo-icon.svg" height={36} width={36} alt="IPTV UK Subscription" />
```

---

## Colour Palette

### Core
| Token | Hex / RGBA | Usage |
|---|---|---|
| `--bg-deep` | `#08090C` | deepest backgrounds |
| `--bg-primary` | `#0C0D12` | main page background |
| `--bg-surface` | `#12141A` | card surfaces, section alternates |
| `--text-primary` | `#F2F2F7` | headings, primary UI |
| `--text-secondary` | `#B8B8C0` | body text, descriptions |
| `--text-muted` | `#6E6E7A` | labels, timestamps, placeholders |

### Glass System
| Token | Value | Usage |
|---|---|---|
| `--bg-glass` | `rgba(255,255,255,0.06)` | glass card background |
| `--bg-glass-hover` | `rgba(255,255,255,0.10)` | glass card hover state |
| `--border-glass` | `rgba(255,255,255,0.12)` | glass card border |
| `--border-glass-strong` | `rgba(255,255,255,0.20)` | emphasised borders |
| `--glass-shadow` | `0 8px 32px rgba(0,0,0,0.3)` | card drop shadow |
| `--glass-blur` | `blur(20px)` | backdrop-filter |
| `--glass-inner` | `inset 0 1px 0 0 rgba(255,255,255,0.15)` | top-edge sheen |

### Accent (use sparingly)
| Token | Hex | Usage |
|---|---|---|
| `--brand-red` | `#E8392A` | LIVE badges, logo dot, error states ONLY |
| `--brand-red-hover` | `#FF4436` | hover on red elements |

### Cinematic Gradient
| Token | Value |
|---|---|
| `--cinematic-dark` | `#040405` |
| `--cinematic-teal` | `#183949` |
| `bg-cinematic` | `linear-gradient(to top left, #183949 0%, #040405 65%)` |

> Red is NOT a primary accent. White + glass is the design language. Red = LIVE indicator / error only.

---

## Typography

| Role | Font | Weight | Size | Letter-spacing |
|---|---|---|---|---|
| H1 Hero | Bebas Neue | 400 | clamp(42px, 8vw, 80px) | 0.04em |
| H2 Section | Bebas Neue | 400 | clamp(28px, 5vw, 48px) | 0.04em |
| H3 Card | Bebas Neue | 400 | 20–24px | 0.04em |
| Body | Inter | 400 | 15–16px | normal |
| UI labels | Inter | 500 | 12–14px | normal |
| Buttons | Inter | 600 | 14–15px | normal |

- All Bebas Neue text → `uppercase` always
- Google Fonts: `Bebas+Neue:wght@400` + `Inter:wght@400;500;600`

---

## Glass CSS Pattern

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

Defined in `src/app/globals.css` as `.glass` utility class.

---

## Icons

- Library: `lucide-react` exclusively
- No custom icons, no emoji icons, no cartoon icons
- Common: `Monitor`, `Laptop`, `Smartphone`, `Tv`, `Wifi`, `Shield`, `Zap`, `Globe`, `MessageCircle`, `Bitcoin`

---

## Pricing

| Plan | Price | Devices | VOD |
|---|---|---|---|
| Monthly | £9.99/mo | 1 | No |
| Annual | £59/yr (£4.92/mo) | 2 | 100,000+ |
| Family | £129.99/yr (£10.83/mo) | 4 | 100,000+ |

---

## Service Numbers

| Stat | Value |
|---|---|
| Live channels | 30,000+ |
| VODs (movies, TV, sports events) | 100,000+ |
| Uptime | 99.9% |
| Max quality | 4K |
| Free trial | Yes — no card needed |
| Crypto | BTC · USDT · ETH (NOWPayments) |

---

## OG Image

- Auto-generated via Next.js ImageResponse
- Route: `/opengraph-image` → `src/app/opengraph-image.tsx`
- Dimensions: 1200 × 630
- Design: dark cinematic background + glass card + brand name + stats badge

---

## Environment Variables

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=212762151824
NEXT_PUBLIC_SITE_URL=https://iptvuksubscription.uk
TMDB_API_KEY=
TMDB_READ_ACCESS_TOKEN=
FOOTBALL_DATA_API_KEY=
NEWS_API_KEY=
NOWPAYMENTS_API_KEY=
AUTH_SECRET=
```

---

## File Structure — Brand Files

```
public/
├── logo.svg          ← Full horizontal logo (SVG)
├── logo-icon.svg     ← Icon mark only (SVG)
├── icon.png          ← PNG icon (navbar, legacy)
├── favicon.ico       ← Browser tab icon
└── llms.txt          ← AI crawler brand description
src/
├── app/opengraph-image.tsx   ← Auto OG image (1200×630)
├── lib/schema.ts             ← Organization + brand schema
└── lib/wa.ts                 ← WhatsApp link builder
```
