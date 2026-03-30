/**
 * Pricing / Conversion Page — /plans/
 * Primary keyword: "iptv uk plans", "iptv uk pricing"
 * Target: 2,000+ words
 */

import Link from 'next/link'
import { Check, MessageCircle, Shield, Clock } from 'lucide-react'
import { buildPlansMetadata } from '@/lib/seo'
import {
  buildFAQSchema,
  buildBreadcrumbSchema,
  buildAllPricingSchemas,
} from '@/lib/schema'
import { PricingTable, FAQSection } from '@/components/organisms'

export const metadata = buildPlansMetadata()

const PLANS_FAQS = [
  {
    question: 'How do I pay for my IPTV UK plan?',
    answer:   'We accept PayPal (no PayPal account required — pay by card through PayPal guest checkout) and cryptocurrency including Bitcoin (BTC), Ethereum (ETH), and USDT via NOWPayments. Payment is processed securely and credentials are delivered via WhatsApp within 15 minutes of payment confirmation.',
  },
  {
    question: 'Can I upgrade from Standard to Premium Annual at any time?',
    answer:   'Yes. If you start on our Standard Monthly plan and decide to upgrade to Premium Annual, contact us on WhatsApp and we will arrange a prorated upgrade. The cost difference is calculated based on remaining days on your current plan.',
  },
  {
    question: 'Is there a contract or minimum term?',
    answer:   'Standard Monthly plans have no contract or minimum term — they are a straightforward one-month access purchase with no automatic renewal. Annual plans (Premium and Family) are a one-time payment for 12 months. There are no auto-renewals on any plan.',
  },
  {
    question: 'What payment methods do you accept for IPTV UK?',
    answer:   'PayPal (which also accepts Visa, Mastercard, and American Express without requiring a PayPal account) and cryptocurrency. We accept BTC, ETH, USDT, LTC, and over 100 other coins via NOWPayments.',
  },
  {
    question: 'How quickly do I receive my IPTV UK credentials after payment?',
    answer:   'Within 15 minutes during UK business hours (9am–10pm GMT). After purchasing, send a WhatsApp message with your payment reference. You will receive your Xtream Codes login or M3U URL in the same conversation.',
  },
]

const COMPARISON = [
  { feature: 'Live Channels',         standard: '35,000+',  premium: '35,000+',  family: '35,000+'  },
  { feature: 'VOD Library',           standard: '100,000+', premium: '100,000+', family: '100,000+' },
  { feature: 'UK Channels',           standard: '5,000+',   premium: '5,000+',   family: '5,000+'   },
  { feature: 'Stream Quality',        standard: 'HD / FHD', premium: '4K UHD',   family: '4K UHD'   },
  { feature: 'Simultaneous Screens',  standard: '1',         premium: '2',         family: '5'         },
  { feature: 'EPG Guide',             standard: '—',         premium: '✓',         family: '✓'         },
  { feature: 'Catch-Up TV (7 days)', standard: '—',         premium: '✓',         family: '✓'         },
  { feature: 'Uptime Guarantee',      standard: '99.9%',    premium: '99.9%',    family: '99.9%'    },
  { feature: 'WhatsApp Support',      standard: '✓',         premium: '✓',         family: '✓'         },
  { feature: 'Price',                 standard: '£9.99/mo', premium: '£79.99/yr', family: '£129.99/yr'},
]

const PAYMENT_CONTENT = [
  {
    q: 'Paying with PayPal',
    a: "Clicking \"Buy Now\" on any plan takes you to a PayPal payment page. You can pay using your existing PayPal balance, or as a PayPal guest using any Visa, Mastercard, or American Express card without needing a PayPal account. PayPal's Buyer Protection applies to all transactions, giving UK consumers an additional layer of purchase protection.",
  },
  {
    q: 'Paying with Cryptocurrency',
    a: 'Cryptocurrency payments are processed via NOWPayments, a regulated crypto payment processor. We accept over 100 cryptocurrencies including Bitcoin (BTC), Ethereum (ETH), Tether (USDT on TRC20 and ERC20), Litecoin (LTC), Binance Coin (BNB), and Solana (SOL). Payment is confirmed after standard blockchain confirmation times — typically 10–30 minutes for Bitcoin and under 5 minutes for most altcoins.',
  },
  {
    q: 'Credential delivery process',
    a: "After payment is confirmed, send us a WhatsApp message with your payment reference. Our team creates a dedicated account and sends your credentials — Xtream Codes (username, password, server URL) or an M3U playlist URL — directly via WhatsApp. Average delivery time is 8 minutes within UK business hours.",
  },
  {
    q: 'What happens after you buy an IPTV UK plan',
    a: '1. Confirmation — PayPal sends an email receipt or NOWPayments shows confirmation. 2. WhatsApp — you message us with your order reference; we respond within 15 minutes during UK hours. 3. Credentials — you receive your Xtream Codes or M3U URL. 4. Installation — follow our step-by-step setup guide for your device. 5. First stream — select your first channel and begin watching.',
  },
]

export default function PlansPage() {
  const faqSchema      = buildFAQSchema(PLANS_FAQS)
  const breadcrumb     = buildBreadcrumbSchema([
    { name: 'Home',  path: '/' },
    { name: 'Plans', path: '/plans/' },
  ])
  const pricingSchemas = buildAllPricingSchemas()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {pricingSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <main id="main-content" className="relative z-[20] flex flex-col flex-1 bg-[#0A0A0A] pt-16">

        {/* ── Awwwards hero ── */}
        <section className="relative py-20 overflow-hidden" aria-labelledby="plans-h1">
          {/* Red glow orb */}
          <div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              transform: 'translate(-50%, -60%)',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse at center, rgba(232,57,42,0.15) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            aria-hidden="true"
          />

          <div className="container relative text-center max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center gap-2 font-ui text-xs text-[#9CA3AF]" role="list">
                <li><Link href="/" className="hover:text-[#E8392A] transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-[#374151]">/</li>
                <li className="text-[#F5F5F5]" aria-current="page">Plans & Pricing</li>
              </ol>
            </nav>

            {/* Eyebrow */}
            <p className="font-ui text-[11px] tracking-[0.25em] uppercase text-[#E8392A] mb-6">
              No contracts · Cancel anytime
            </p>

            {/* Main heading */}
            <h1
              id="plans-h1"
              className="font-display text-[#F5F5F5] uppercase leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)' }}
            >
              IPTV UK Plans{' '}
              <span style={{ color: '#E8392A' }}>&</span>{' '}
              Pricing
            </h1>

            {/* Red gradient underline */}
            <div
              className="mx-auto mb-6"
              style={{
                height: '3px',
                maxWidth: '300px',
                background: 'linear-gradient(to right, transparent, #E8392A, transparent)',
              }}
              aria-hidden="true"
            />

            <p className="font-sans text-[#9CA3AF] text-lg mb-10 max-w-xl mx-auto">
              Three plans. No hidden fees. Credentials delivered via WhatsApp within 15 minutes.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { icon: Shield,        label: '99.9% Uptime' },
                { icon: Clock,         label: 'Credentials in 15 min' },
                { icon: MessageCircle, label: 'WhatsApp support' },
                { icon: Check,         label: 'No auto-renewals' },
              ].map(({ icon: Icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 font-ui text-sm text-[#9CA3AF]">
                  <Icon size={14} className="text-[#E8392A]" aria-hidden="true" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Red separator */}
        <span className="red-separator block" aria-hidden="true" />

        {/* ── Pricing cards ── */}
        <PricingTable />

        {/* ── Comparison table ── */}
        <section className="py-20" aria-labelledby="comparison-heading">
          <div className="container">
            <h2
              id="comparison-heading"
              className="font-display text-[#F5F5F5] uppercase text-center mb-12"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Plan <span style={{ color: '#E8392A' }}>Comparison</span>
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
              <table className="w-full text-sm" aria-label="IPTV UK plan comparison">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                    <th scope="col" className="font-ui text-xs text-[#9CA3AF] uppercase tracking-widest text-left px-6 py-4 w-48">Feature</th>
                    <th scope="col" className="font-ui text-xs text-[#F5F5F5] uppercase tracking-widest text-center px-6 py-4">Standard</th>
                    <th scope="col" className="font-ui text-xs text-[#E8392A] uppercase tracking-widest text-center px-6 py-4 bg-[rgba(232,57,42,0.05)]">
                      Premium Annual ★
                    </th>
                    <th scope="col" className="font-ui text-xs text-[#F5F5F5] uppercase tracking-widest text-center px-6 py-4">Family</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ feature, standard, premium, family }, i) => (
                    <tr
                      key={feature}
                      className={`border-b border-white/[0.05] ${i % 2 === 0 ? '' : 'bg-white/[0.015]'}`}
                    >
                      <td className="font-ui text-sm text-[#9CA3AF] px-6 py-4">{feature}</td>
                      <td className="font-mono text-sm text-[#F5F5F5] text-center px-6 py-4">{standard}</td>
                      <td className="font-mono text-sm text-[#F5F5F5] text-center px-6 py-4 bg-[rgba(232,57,42,0.03)]">{premium}</td>
                      <td className="font-mono text-sm text-[#F5F5F5] text-center px-6 py-4">{family}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Payment info — collapsible accordions ── */}
        <section className="py-16 border-t border-white/[0.06]" id="crypto" aria-labelledby="payment-heading">
          <div className="container max-w-3xl mx-auto">
            <h2
              id="payment-heading"
              className="font-display text-[#F5F5F5] uppercase mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              How Payment <span style={{ color: '#E8392A' }}>Works</span>
            </h2>

            <div className="flex flex-col gap-4">
              {PAYMENT_CONTENT.map(({ q, a }) => (
                <details
                  key={q}
                  className="border border-white/[0.08] rounded-xl overflow-hidden group open:border-[rgba(232,57,42,0.3)] open:bg-[rgba(232,57,42,0.03)] transition-colors"
                >
                  <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none font-display uppercase tracking-wide text-base text-[#F5F5F5] select-none">
                    {q}
                    <span className="ml-4 shrink-0 text-[#9CA3AF] group-open:text-[#E8392A] transition-colors text-xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-4" />
                    <p className="font-sans text-[#9CA3AF] text-sm leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-16 border-t border-white/[0.06]" aria-labelledby="plans-faq-heading">
          <div className="container max-w-3xl mx-auto">
            <h2
              id="plans-faq-heading"
              className="font-display text-[#F5F5F5] uppercase mb-8"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Frequently Asked <span style={{ color: '#E8392A' }}>Questions</span>
            </h2>

            <div className="flex flex-col gap-4">
              {PLANS_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="border border-white/[0.08] rounded-xl overflow-hidden group open:border-[rgba(232,57,42,0.3)] open:bg-[rgba(232,57,42,0.03)] transition-colors"
                >
                  <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none font-ui font-semibold text-sm text-[#F5F5F5] select-none">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-[#9CA3AF] group-open:text-[#E8392A] transition-colors text-xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-4" />
                    <p className="font-sans text-[#9CA3AF] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
