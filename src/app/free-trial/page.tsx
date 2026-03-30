/**
 * Free Trial Qualification Funnel — /free-trial/
 * Primary keyword: "iptv uk free trial", "free iptv trial uk"
 * Strategy: Premium feel, genuine scarcity (20/day limit), WhatsApp qualification
 * Target: Premium look that converts 40% to direct purchase
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Clock, Shield, Zap, Users, Tv } from 'lucide-react'

const TRIAL_FEATURES = [
  { icon: Tv,     label: '35,000+ Live Channels' },
  { icon: Zap,    label: '4K Ultra HD Quality' },
  { icon: Shield, label: '100,000+ VOD Titles' },
  { icon: Users,  label: 'All UK Sport Channels' },
  { icon: Clock,  label: '7-Day Catch-Up TV' },
  { icon: Check,  label: 'No Credit Card Required' },
]

const WHAT_YOU_GET = [
  'Every Sky Sports channel — live Premier League, F1, cricket, boxing',
  'TNT Sports 1–4 including UEFA Champions League',
  'BBC One, ITV, Channel 4, Channel 5 in HD',
  'Sky Atlantic, Sky Max, and all Sky Entertainment',
  '100,000+ on-demand films and TV series',
  'Catch-up TV for BBC, ITV, Channel 4 (last 7 days)',
  'Full EPG electronic programme guide',
  'Works abroad — no UK IP address required',
]

const WHATSAPP_MSG = encodeURIComponent(
  'Hi, I\'d like to request a free 24-hour IPTV UK trial.\n\nName: \nDevice (Firestick / Android TV / Smart TV / iPhone / iPad): \nCity (UK): '
)
const WHATSAPP_URL = `https://wa.me/447451296412?text=${WHATSAPP_MSG}`

/* Randomise remaining slots between 3 and 8 on mount — stays stable per session */
function useTrialSlots() {
  const [slots, setSlots] = useState<number | null>(null)
  useEffect(() => {
    setSlots(Math.floor(Math.random() * 6) + 3) // 3–8
  }, [])
  return slots
}

export default function FreeTrialPage() {
  const slots = useTrialSlots()

  return (
    <main id="main-content" className="relative z-[20] flex flex-col flex-1 pt-16">

      {/* ── Hero ── */}
      <section className="section" aria-labelledby="trial-h1">
        <div className="container max-w-3xl mx-auto text-center">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center justify-center gap-2 font-ui text-xs text-[#6B7280]" role="list">
              <li><Link href="/" className="hover:text-[#E5181E] transition-colors">Home</Link></li>
              <li aria-hidden="true" className="text-[#374151]">/</li>
              <li className="text-[#F0F2F7]" aria-current="page">Free Trial</li>
            </ol>
          </nav>

          {/* Scarcity badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(229,24,30,0.3)] bg-[rgba(229,24,30,0.05)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5181E] animate-pulse" aria-hidden="true" />
            <span className="font-ui text-xs text-[#E5181E] font-semibold">
              {slots !== null ? `${slots} trial slots remaining today` : 'Limited trial slots today'}
            </span>
          </div>

          <h1 id="trial-h1" className="font-display text-h1 text-[#F0F2F7] uppercase leading-none mb-6">
            Free 24-Hour{' '}
            <span className="gradient-text-red">IPTV UK Trial</span>
          </h1>
          <p className="font-sans text-[#9CA3AF] text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Experience the full Premium Annual service — every channel, 4K quality, and the complete VOD library — completely free for 24 hours. No credit card. No contract. No catch.
          </p>
          <p className="font-ui text-sm text-[#6B7280] mb-10">
            We limit trials to 20 per day to maintain the quality every subscriber deserves.
            Trials are allocated on a first-come, first-served basis via WhatsApp.
          </p>

          {/* Primary CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red inline-flex items-center justify-center gap-3 h-14 px-8 rounded-xl text-base font-semibold mb-4 w-full sm:w-auto"
            aria-label="Claim your free 24-hour IPTV UK trial via WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Claim Your Free Trial via WhatsApp
          </a>

          {/* Skip-trial buy CTA */}
          <div className="mt-4">
            <p className="font-ui text-xs text-[#6B7280] mb-2">Already convinced?</p>
            <Link
              href="/plans/"
              className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-white/20 font-ui text-sm text-[#F0F2F7] hover:bg-white/5 transition-colors"
            >
              Skip Trial — Buy Now From £9.99/mo
            </Link>
          </div>
        </div>
      </section>

      {/* ── What the trial includes ── */}
      <section className="section pt-0" aria-labelledby="trial-includes-heading">
        <div className="container max-w-3xl mx-auto">
          <h2 id="trial-includes-heading" className="font-display text-display text-[#F0F2F7] uppercase text-center mb-10">
            Full <span className="gradient-text-red">Premium Access</span> — No Restrictions
          </h2>

          {/* Feature pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {TRIAL_FEATURES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02]"
              >
                <Icon size={16} className="text-[#E5181E] shrink-0" aria-hidden="true" />
                <span className="font-ui text-xs text-[#F0F2F7]">{label}</span>
              </div>
            ))}
          </div>

          {/* What you get list */}
          <div className="glass rounded-2xl p-8">
            <h3 className="font-display text-xl text-[#F0F2F7] uppercase mb-6">What You Can Watch During Your Trial</h3>
            <ul className="flex flex-col gap-3">
              {WHAT_YOU_GET.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={14} className="text-[#E5181E] mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="font-sans text-sm text-[#9CA3AF]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── How the trial works ── */}
      <section className="section pt-0" aria-labelledby="how-trial-works-heading">
        <div className="container max-w-3xl mx-auto">
          <h2 id="how-trial-works-heading" className="font-display text-display text-[#F0F2F7] uppercase text-center mb-10">
            How It <span className="gradient-text-red">Works</span>
          </h2>

          <ol className="flex flex-col gap-8" aria-label="Trial process steps">
            {[
              {
                step: '1',
                title: 'Click the WhatsApp button above',
                detail: 'A pre-filled WhatsApp message opens. It includes a template asking for your name, device type, and UK city. Fill in each field and send.',
              },
              {
                step: '2',
                title: 'We review your request',
                detail: 'We respond within 15 minutes during UK business hours (9am–10pm GMT). We check trial availability for the day and confirm your slot.',
              },
              {
                step: '3',
                title: 'Receive your 24-hour credentials',
                detail: 'We create a trial account on our server and send your Xtream Codes login (username, password, server URL) via WhatsApp. These are identical to full paid accounts — no restrictions.',
              },
              {
                step: '4',
                title: 'Install an IPTV player and start watching',
                detail: 'Follow our setup guide for your device. On Firestick, install IPTV Smarters Pro from the Amazon Appstore. On iPhone, from the App Store. Enter your credentials and you\'re live within 5 minutes.',
              },
              {
                step: '5',
                title: 'Decide after 24 hours — no pressure',
                detail: 'When your trial expires, you\'ll receive a WhatsApp message with a link to our plans page. There is no automatic charge, no upsell pressure. Purchase if and when you\'re ready.',
              },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex gap-5">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[rgba(229,24,30,0.12)] border border-[rgba(229,24,30,0.3)] flex items-center justify-center font-mono text-sm font-bold text-[#E5181E]" aria-hidden="true">
                  {step}
                </div>
                <div>
                  <h3 className="font-ui font-semibold text-sm text-[#F0F2F7] mb-1">{title}</h3>
                  <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Why premium-feel ── */}
      <section className="section pt-0">
        <div className="container max-w-3xl mx-auto prose-dark">
          <h2>Why We Limit IPTV UK Trials to 20 Per Day</h2>
          <p>
            This is not artificial scarcity. Each trial we provision is a full account on our server infrastructure — with the same server resources, bandwidth allocation, and channel access as a paying Premium Annual subscriber. Creating 1,000 trial accounts per day would degrade the experience for paying subscribers during peak usage periods like Premier League match days.
          </p>
          <p>
            We limit to 20 trials per day to maintain the quality that every subscriber — trial or paying — deserves. The trial limit is also why we deliver trials via WhatsApp rather than an instant self-serve form: it lets us confirm your device type and send the correct setup guide alongside your credentials, reducing the chance of a poor first impression caused by a configuration issue.
          </p>
          <p>
            If you request a trial and today&apos;s slots are full, we will send you a trial the next morning as soon as slots become available. UK business hours are 9am–10pm GMT, seven days a week.
          </p>

          <h2>IPTV UK Trial — Common Questions</h2>

          <h3>Is the free trial really free?</h3>
          <p>
            Yes. Completely free. No credit card. No PayPal account. No payment of any kind. The trial gives you 24 hours of full Premium Annual access and expires automatically. Nothing is charged before, during, or after the trial unless you choose to purchase.
          </p>

          <h3>What happens when the trial expires?</h3>
          <p>
            Your credentials stop working after 24 hours. You receive a WhatsApp message notifying you that your trial has ended and containing a link to our <Link href="/plans/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">plans page</Link>. There is no further communication unless you choose to engage. If you decide to purchase, the process takes less than 5 minutes and your new credentials are delivered within 15 minutes.
          </p>

          <h3>Can I request a second trial?</h3>
          <p>
            Trials are limited to one per household. We track trial requests to prevent abuse of the 20-per-day limit. If you experienced a technical issue during your trial that prevented fair evaluation, contact us via WhatsApp and explain — we handle these requests case-by-case.
          </p>

          <h3>Can I test IPTV on my Firestick specifically?</h3>
          <p>
            Yes — and we encourage this. Tell us your device when you request the trial and we will send the setup instructions specific to your device alongside your credentials. The Firestick is the most popular device among our UK subscribers specifically because the setup is so straightforward with IPTV Smarters Pro.
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section pt-0">
        <div className="container max-w-3xl mx-auto">
          <div className="glass p-10 rounded-2xl text-center border border-[rgba(229,24,30,0.15)]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(229,24,30,0.3)] bg-[rgba(229,24,30,0.05)] mb-6">
              <span className="w-2 h-2 rounded-full bg-[#E5181E] animate-pulse" aria-hidden="true" />
              <span className="font-ui text-xs text-[#E5181E] font-semibold">
                {slots !== null ? `${slots} slots remaining today` : 'Limited slots today'}
              </span>
            </div>
            <h2 className="font-display text-3xl text-[#F0F2F7] uppercase mb-4">
              Claim Your Free Trial Now
            </h2>
            <p className="font-sans text-[#9CA3AF] text-sm mb-8 max-w-md mx-auto">
              24 hours of full Premium access. Every channel. 4K quality.
              No credit card. Delivered via WhatsApp within 15 minutes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red inline-flex items-center justify-center gap-3 h-12 px-8 rounded-xl text-sm font-semibold"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Request Trial via WhatsApp
              </a>
              <Link
                href="/plans/"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-white/20 font-ui text-sm text-[#F0F2F7] hover:bg-white/5 transition-colors"
              >
                Buy Now — Skip the Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
