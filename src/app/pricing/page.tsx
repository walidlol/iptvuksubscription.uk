import { Metadata } from 'next'
import ScarcityBanner from '@/components/ScarcityBanner'
import WhatsAppButton from '@/components/WhatsAppButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'IPTV UK Plans & Pricing — From £4.92/month | iptvuksubscription.uk',
  description:
    'Choose your IPTV UK subscription plan. Monthly from £9.99 or annual from £59/year (£4.92/month). 35,000+ channels, no contracts, instant setup.',
  alternates: { canonical: 'https://iptvuksubscription.uk/pricing/' },
  openGraph: {
    title: 'IPTV UK Plans & Pricing — From £4.92/month',
    description:
      'Choose your IPTV UK subscription plan. Monthly from £9.99 or annual from £59/year (£4.92/month). 35,000+ channels, no contracts, instant setup.',
    url: 'https://iptvuksubscription.uk/pricing/',
  },
}

// Hardcoded plan data — NO async, NO fetching
const plans = [
  {
    id: 'standard',
    badge: 'MOST FLEXIBLE',
    badgeColor: 'bg-[#333333]',
    name: 'STANDARD',
    duration: '1 Month',
    price: '£9.99',
    perMonth: '£9.99/mo — no commitment',
    saving: null as string | null,
    popular: false,
    angle: "Perfect for testing. Cancel the moment you're not satisfied.",
    features: [
      '35,000+ Live Channels',
      '100,000+ Movies & Shows on Demand',
      'HD & 4K Streaming Quality',
      'Instant Activation on Signup',
      'Zero Buffering — Anti-Freeze Technology',
      'EPG TV Guide Included',
      '24/7 WhatsApp Support',
      'Works on All Devices',
      'Free Premium Media Player',
      'Content Request Feature',
      'Cancel Anytime — No Questions',
    ],
    whatsappMsg: "Hi! I'd like to purchase the Standard plan (1 month - £9.99)",
    cta: 'GET STANDARD',
  },
  {
    id: 'annual',
    badge: 'MOST POPULAR ⭐',
    badgeColor: 'bg-[#E8392A]',
    name: 'ANNUAL PREMIUM',
    duration: '12 Months',
    price: '£59',
    perMonth: '£4.92/month — billed annually',
    saving: 'Save 51% vs monthly',
    popular: true,
    angle: 'The choice of serious streamers. Priority support and dedicated server.',
    features: [
      'Everything in Standard, PLUS:',
      '35,000+ Live Channels',
      '100,000+ Movies & Shows on Demand',
      'HD & 4K Streaming Quality',
      'Priority WhatsApp Support (Faster)',
      'Dedicated Server Allocation',
      'Zero Buffering — Anti-Freeze Technology',
      'EPG TV Guide Included',
      'Works on All Devices',
      'Save £60.88 vs Monthly Payments',
      'Auto-Renewal Reminder 7 Days Before',
    ],
    whatsappMsg: "Hi! I'd like to purchase the Annual Premium plan (£59/year)",
    cta: 'GET ANNUAL',
  },
  {
    id: 'family',
    badge: 'BEST FOR FAMILIES',
    badgeColor: 'bg-[#1A1A2E]',
    name: 'FAMILY PLAN',
    duration: '12 Months',
    price: '£129.99',
    perMonth: '£10.83/month — billed annually',
    saving: '3 simultaneous streams',
    popular: false,
    angle: 'Three screens, one account. Everyone watches what they want.',
    features: [
      'Everything in Annual, PLUS:',
      '3 Simultaneous Connections',
      '3 Separate Device Logins',
      '35,000+ Live Channels',
      '100,000+ Movies & Shows on Demand',
      'Parental Controls Available',
      'Kids Channels Unlocked',
      'HD & 4K on All 3 Screens',
      'Priority WhatsApp Support',
      'Dedicated Server Allocation',
      'Perfect for Households',
    ],
    whatsappMsg: "Hi! I'd like to purchase the Family plan (£129.99/year)",
    cta: 'GET FAMILY',
  },
]

const comparisonRows = [
  { label: 'Live Channels',         standard: '35,000+',  annual: '35,000+',   family: '35,000+' },
  { label: 'Movies & Shows VOD',    standard: '100,000+', annual: '100,000+',  family: '100,000+' },
  { label: 'Stream Quality',        standard: 'HD & 4K',  annual: 'HD & 4K',   family: 'HD & 4K' },
  { label: 'Simultaneous Screens',  standard: '1',        annual: '1',         family: '3' },
  { label: 'EPG TV Guide',          standard: '✓',        annual: '✓',         family: '✓' },
  { label: 'WhatsApp Support',      standard: '24/7',     annual: 'Priority',  family: 'Priority' },
  { label: 'Dedicated Server',      standard: '—',        annual: '✓',         family: '✓' },
  { label: 'Parental Controls',     standard: '—',        annual: '—',         family: '✓' },
  { label: 'Uptime Guarantee',      standard: '99.9%',    annual: '99.9%',     family: '99.9%' },
  { label: 'Price',                 standard: '£9.99/mo', annual: '£4.92/mo',  family: '£10.83/mo' },
]

const paymentFAQ = [
  {
    q: 'How do I pay?',
    a: "We accept PayPal, bank transfer, and cryptocurrency (Bitcoin, Ethereum, USDT). Simply message us on WhatsApp with your chosen plan and we'll send you payment instructions.",
  },
  {
    q: 'What about crypto payments?',
    a: 'We accept BTC, ETH, USDT, and LTC. After messaging us on WhatsApp, we send you a payment address. Credentials are activated within 15 minutes of payment confirmation.',
  },
  {
    q: 'When do I receive my credentials?',
    a: 'Within 15 minutes of confirmed payment. We send your username, password, and setup instructions directly via WhatsApp.',
  },
  {
    q: 'What happens when my subscription ends?',
    a: "You will receive a reminder 7 days before expiry (Annual and Family plans). There are no auto-renewals — you decide when and whether to renew. Monthly subscribers can simply message us to continue.",
  },
]

const pricingFAQs = [
  {
    q: 'Is there a free trial?',
    a: 'Yes — message us on WhatsApp to request a free 24-hour trial with full access to all channels. No credit card required.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Yes. Message our WhatsApp support at any time to upgrade. We will credit the remaining days of your current plan toward the new one.',
  },
  {
    q: 'Do you offer a refund?',
    a: 'We offer a 7-day money-back guarantee. If you experience persistent issues that our support team cannot resolve within 48 hours, we will issue a full refund.',
  },
  {
    q: 'How many devices can I use?',
    a: 'Standard and Annual plans support 1 simultaneous stream on any device. The Family plan supports 3 simultaneous streams on 3 separate devices.',
  },
  {
    q: 'Is there a long-term discount?',
    a: 'The Annual Premium plan at £59/year works out to £4.92/month — saving you 51% versus monthly billing. The Family plan adds 3-screen support for just £129.99/year.',
  },
]

export default function PricingPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center bg-[#0A0A0A]">
        <p className="text-[#E8392A] text-xs uppercase tracking-widest mb-4 font-medium">
          NO CONTRACTS · CANCEL ANYTIME
        </p>
        <h1
          className="font-bebas text-white mb-6"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1 }}
        >
          IPTV UK PLANS <span style={{ color: '#E8392A' }}>&amp;</span> PRICING
        </h1>
        <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto mb-8">
          Three plans. No hidden fees. Credentials delivered via WhatsApp within 15 minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#9CA3AF]">
          {['99.9% Uptime', 'Credentials in 15 min', 'WhatsApp Support', 'No auto-renewals'].map(t => (
            <span key={t} className="flex items-center gap-2">
              <span style={{ color: '#E8392A' }}>✓</span> {t}
            </span>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Scarcity banner */}
      <section className="py-6 px-6 bg-[#111111] flex justify-center">
        <ScarcityBanner />
      </section>

      {/* Pricing cards — hardcoded, NO async */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.id}
                data-reveal="stagger"
                className={[
                  'rounded-2xl overflow-hidden transition-all duration-300',
                  plan.popular
                    ? 'md:scale-105 shadow-[0_0_60px_rgba(232,57,42,0.3)] border-2 border-[#E8392A]'
                    : 'border border-[#1A1A1A] hover:border-[#E8392A]/50',
                ].join(' ')}
              >
                {/* Badge */}
                <div className={`${plan.badgeColor} py-3 px-6 text-center`}>
                  <span className="text-white text-xs font-bold tracking-widest uppercase">
                    {plan.badge}
                  </span>
                </div>

                {/* Card body */}
                <div className="bg-[#111111] p-8">
                  <h3 className="font-bebas text-white text-4xl mb-1">{plan.name}</h3>
                  <p className="text-[#6B7280] text-sm mb-6">{plan.duration}</p>

                  <div className="mb-2">
                    <span
                      className="font-bebas text-[#E8392A]"
                      style={{ fontSize: '72px', lineHeight: 1 }}
                    >
                      {plan.price}
                    </span>
                  </div>
                  <p className="text-[#9CA3AF] text-sm mb-2">{plan.perMonth}</p>
                  {plan.saving && (
                    <p className="text-[#E8392A] text-sm font-semibold mb-6">{plan.saving}</p>
                  )}

                  <p className="text-[#6B7280] text-sm italic mb-8 border-l-2 border-[#E8392A] pl-3">
                    {plan.angle}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#D1D5DB]">
                        <span style={{ color: '#E8392A', flexShrink: 0 }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Network badges */}
                  <div className="mb-6">
                    <p className="text-[#6B7280] text-xs uppercase tracking-widest mb-3">Including</p>
                    <div className="flex flex-wrap gap-2">
                      {['BBC', 'ITV', 'SKY Sports', 'BT Sport', 'ESPN'].map(n => (
                        <span
                          key={n}
                          className="px-3 py-1 text-xs border border-[#E8392A]/30 text-[#9CA3AF] rounded"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Device badges */}
                  <div className="mb-8">
                    <p className="text-[#6B7280] text-xs uppercase tracking-widest mb-3">
                      Supported Devices
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['Mobile', 'PC', 'Smart TV', 'Firestick'].map(d => (
                        <span key={d} className="px-3 py-1 text-xs bg-[#1A1A1A] text-[#9CA3AF] rounded">
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <WhatsAppButton
                    message={plan.whatsappMsg}
                    variant="primary"
                    className="w-full py-4 text-center font-bebas text-lg tracking-wider"
                  >
                    {plan.cta}
                  </WhatsAppButton>

                  <p className="text-[#6B7280] text-xs text-center mt-3">
                    Credentials via WhatsApp within 15 min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifetime teaser */}
      <section className="py-12 px-6 bg-[#111111]">
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl border border-[#E8392A]/30 bg-[#1A0A0A] p-8 text-center">
            <p className="text-[#E8392A] text-xs uppercase tracking-widest mb-3">
              Limited — spots filling fast
            </p>
            <h3 className="font-bebas text-white text-5xl mb-2">LIFETIME PREMIUM</h3>
            <p className="text-[#9CA3AF] mb-4">Yours for life — one payment, never pay again</p>
            <div className="font-bebas text-[#E8392A] text-6xl mb-2">£299</div>
            <p className="text-[#6B7280] text-sm mb-6">
              After 3 years it pays for itself. Save £2,000+ vs annual payments.
            </p>
            <WhatsAppButton
              message="Hi! I'm interested in the Lifetime Premium plan (£299)"
              variant="outline"
              className="px-8 py-3 font-bebas text-lg"
            >
              ENQUIRE ABOUT LIFETIME
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Plan comparison table */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-bebas text-white text-center mb-16"
            style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
          >
            PLAN <span style={{ color: '#E8392A' }}>COMPARISON</span>
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[#1A1A1A]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  <th className="text-left py-4 px-6 text-[#6B7280] font-medium w-1/4">Feature</th>
                  <th className="text-center py-4 px-4 text-white font-bebas text-xl">STANDARD</th>
                  <th className="text-center py-4 px-4 text-[#E8392A] font-bebas text-xl bg-[#1A0A0A]">
                    ANNUAL
                  </th>
                  <th className="text-center py-4 px-4 text-white font-bebas text-xl">FAMILY</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-[#1A1A1A] ${i % 2 === 0 ? 'bg-[#0A0A0A]' : 'bg-[#0F0F0F]'}`}
                  >
                    <td className="py-4 px-6 text-[#9CA3AF]">{row.label}</td>
                    <td className="py-4 px-4 text-center text-[#D1D5DB]">{row.standard}</td>
                    <td className="py-4 px-4 text-center text-[#E8392A] font-medium bg-[#1A0A0A]">
                      {row.annual}
                    </td>
                    <td className="py-4 px-4 text-center text-[#D1D5DB]">{row.family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How payment works */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bebas text-white mb-12"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            HOW PAYMENT <span style={{ color: '#E8392A' }}>WORKS</span>
          </h2>
          <div className="space-y-4">
            {paymentFAQ.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#1A1A1A] bg-[#0A0A0A] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                  <span className="text-white font-medium">{item.q}</span>
                  <span className="text-[#E8392A] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-[#9CA3AF] text-sm leading-relaxed border-t border-[#1A1A1A] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-bebas text-white mb-12"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            FREQUENTLY ASKED <span style={{ color: '#E8392A' }}>QUESTIONS</span>
          </h2>
          <div className="space-y-4">
            {pricingFAQs.map((item, i) => (
              <details
                key={i}
                className="group rounded-xl border border-[#1A1A1A] bg-[#111111] overflow-hidden"
              >
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                  <span className="text-white font-medium">{item.q}</span>
                  <span className="text-[#E8392A] text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 text-[#9CA3AF] text-sm leading-relaxed border-t border-[#1A1A1A] pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 bg-[#E8392A] text-center">
        <h2 className="font-bebas text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
          START WATCHING TODAY
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Join 100,000+ UK subscribers. Free 24-hour trial — no credit card required.
        </p>
        <WhatsAppButton
          message="Hi! I'd like a free 24-hour IPTV UK trial"
          variant="outline"
          className="px-10 py-4 font-bebas text-xl border-white text-white hover:bg-white hover:text-[#E8392A]"
        >
          GET FREE TRIAL
        </WhatsAppButton>
      </section>

      {/* Internal link back to homepage */}
      <section className="py-6 px-6 bg-[#0A0A0A] text-center">
        <p className="text-[#6B7280] text-sm">
          Looking for our full service overview?{' '}
          <Link
            href="/"
            className="text-[#E8392A] hover:underline"
          >
            Learn more about our iptv uk subscription
          </Link>
        </p>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'IPTV UK Subscription',
            description:
              'Premium IPTV UK subscription with 35,000+ live channels, 100,000+ VOD titles, HD & 4K quality.',
            brand: { '@type': 'Brand', name: 'IPTV UK Subscription' },
            offers: plans.map(p => ({
              '@type': 'Offer',
              name: p.name,
              price: p.price.replace('£', ''),
              priceCurrency: 'GBP',
              availability: 'https://schema.org/InStock',
              url: 'https://iptvuksubscription.uk/pricing/',
            })),
          }),
        }}
      />
    </main>
  )
}
