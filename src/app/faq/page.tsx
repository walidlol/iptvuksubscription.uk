/**
 * FAQ Silo — /faq/
 * Primary keyword: "iptv uk faq"
 * Target: 2,000+ words across all Q&As
 */

import Link from 'next/link'
import { buildFAQMetadata } from '@/lib/seo'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema'
import { FAQSection } from '@/components/organisms'

export const metadata = buildFAQMetadata()

const ALL_FAQS = [
  // ── General ──
  {
    question: 'What is IPTV and how does it work in the UK?',
    answer: 'IPTV (Internet Protocol Television) delivers live TV channels and on-demand video over your broadband connection instead of a satellite dish or Freeview aerial. You need a broadband connection of at least 10 Mbps for HD or 25 Mbps for 4K. Our service delivers 35,000+ live channels and 100,000+ VOD titles to any compatible device. You receive login credentials, enter them into a free IPTV player app, and you\'re watching within minutes.',
  },
  {
    question: 'Is IPTV legal in the UK?',
    answer: 'This is a nuanced area. IPTV technology itself is legal — it is the method used by the BBC iPlayer, ITVX, Netflix, and every other streaming service. The legality of specific IPTV subscription services depends on whether the content being streamed is properly licensed. We strongly recommend seeking independent legal advice if you have specific concerns. Under UK copyright law, streaming (as opposed to downloading) copyrighted content sits in a legally complex area.',
  },
  {
    question: 'What internet speed do I need for IPTV UK?',
    answer: 'For HD (720p) and Full HD (1080p) streams, a minimum of 10 Mbps download speed is recommended per stream. For 4K Ultra HD streams, 25 Mbps per stream is ideal. Most UK broadband connections — FTTC, FTTP, or Virgin Media cable — comfortably exceed these requirements. If multiple household members stream simultaneously on our Family Plan (5 connections), a 100 Mbps connection is recommended to maintain 4K quality on all screens.',
  },
  {
    question: 'Which devices work with IPTV UK subscription?',
    answer: 'Our service is compatible with: Amazon Firestick (all generations), Android TV boxes (NVIDIA Shield, Xiaomi Mi Box, X96, etc.), Samsung Smart TVs (via app store or casting), LG Smart TVs (webOS), Android smartphones and tablets, iPhones and iPads (via IPTV Smarters Pro), MAG boxes (MAG254, MAG322, MAG420), Zgemma and Enigma2 devices, and Windows/Mac computers via VLC media player or IPTV Smarters web. See our full setup guide for device-specific instructions.',
  },
  {
    question: 'What IPTV player app should I use?',
    answer: 'TiviMate is the best IPTV player for Android-based devices including Firestick and Android TV boxes. It offers a polished TV guide interface, EPG integration, catch-up support, and multi-connection management. IPTV Smarters Pro is the best choice for iPhone and iPad users and is also excellent on Android. Both apps support Xtream Codes and M3U playlist connections. We include setup guides for both in our documentation.',
  },
  // ── Plans & Pricing ──
  {
    question: 'How much does IPTV UK cost per month?',
    answer: 'Our Standard Monthly plan costs £9.99 per month. Our Premium Annual plan costs £79.99 per year — approximately £6.67 per month, which is less than £0.22 per day. The Family Plan (5 connections) costs £129.99 per year. All prices include the full 35,000+ channel library and 100,000+ VOD collection. See our plans page for a full feature comparison.',
  },
  {
    question: 'Is there a free IPTV UK trial?',
    answer: 'Yes. We offer a free 24-hour trial with full access to all channels, 4K streams, and the complete VOD library — identical to the Premium Annual experience. Trials are limited to 20 per day to maintain server quality and are delivered via WhatsApp. Visit our free trial page to request yours. There is no credit card required for the trial.',
  },
  {
    question: 'Can I pay for IPTV UK with crypto?',
    answer: 'Yes. We accept Bitcoin (BTC), Ethereum (ETH), Tether (USDT on TRC20 and ERC20), Litecoin (LTC), Binance Coin (BNB), Solana (SOL), and over 100 other cryptocurrencies via NOWPayments. Payments are confirmed after standard blockchain confirmation times. Credentials are issued immediately after confirmation. We also accept PayPal (with or without a PayPal account — pay by Visa or Mastercard as a guest).',
  },
  {
    question: 'How quickly do I receive my IPTV credentials?',
    answer: 'Within 15 minutes of payment during UK business hours (9am–10pm GMT). Outside these hours, credentials are typically delivered within 1–3 hours. After purchasing, message our WhatsApp support number with your payment reference and the device you plan to use. You will receive your Xtream Codes credentials or M3U URL in the same WhatsApp conversation.',
  },
  {
    question: 'Do IPTV plans auto-renew?',
    answer: 'No. None of our plans auto-renew. The Standard Monthly plan is a one-month access purchase — when it expires, you decide whether to renew. Annual plans are a one-time payment for 12 months. We send a WhatsApp reminder 7 days before your subscription expires, giving you the option to renew at your convenience with no pressure.',
  },
  // ── Technical ──
  {
    question: 'Why is my IPTV buffering?',
    answer: 'Buffering is almost always caused by one of four things: (1) broadband speed below the recommended threshold — test your speed at fast.com and ensure you have at least 10 Mbps per stream; (2) Wi-Fi interference — connect via Ethernet cable where possible, or move your streaming device closer to the router; (3) incorrect buffer settings in your IPTV player — increase the buffer size to 5–10 seconds in TiviMate settings; (4) a specific channel stream having a temporary issue — switch to an alternative stream if available. Contact our WhatsApp support for personalised diagnosis.',
  },
  {
    question: 'Can I watch IPTV UK abroad?',
    answer: 'Yes. Your IPTV UK subscription works on any internet connection anywhere in the world. There is no geoblocking on our service — UK channels including BBC One, ITV, Sky Sports, and TNT Sports are fully accessible from Spain, France, the USA, Australia, or anywhere else. UK expatriates and frequent travellers are among our most satisfied subscribers specifically for this reason.',
  },
  {
    question: 'Does IPTV work on Smart TVs without a separate device?',
    answer: 'Samsung Smart TVs running Tizen OS can install IPTV Smarters directly from the Samsung Smart Hub app store in many regions. LG Smart TVs running webOS support IPTV Smarters via the LG Content Store. If the app is not available in your region, you can cast from an Android phone or tablet to your TV using Chromecast built-in functionality, or connect an Amazon Firestick or Android TV box to your TV\'s HDMI port.',
  },
  {
    question: 'What is an EPG and do I need it?',
    answer: 'An EPG (Electronic Programme Guide) is the TV guide interface that shows what is currently broadcasting on each channel and what is scheduled next, similar to the channel guide on Sky or Freesat. If you want to browse channels by schedule rather than manually flicking through 35,000 channels, an EPG is essential. It is included in our Premium Annual and Family plans. TiviMate uses the EPG to power its catch-up TV browser and recording features.',
  },
  {
    question: 'What is catch-up TV on IPTV?',
    answer: 'Catch-up TV allows you to watch programmes that were broadcast in the last 7 days, even if you missed them live. On our Premium Annual and Family plans, you can browse the catch-up library within TiviMate or IPTV Smarters for all major UK channels — BBC, ITV, Channel 4, Sky Sports replays, and more. This replaces the need for BBC iPlayer, ITVX, or My4, and crucially works abroad without a UK IP address.',
  },
  // ── Support ──
  {
    question: 'How do I get support for my IPTV UK subscription?',
    answer: 'All support is provided via WhatsApp — direct human support, no bots or ticketing systems. You receive our WhatsApp support number when your credentials are delivered. For common issues (buffering, credentials not working, device setup), average response time is under 15 minutes during UK business hours. We also maintain a comprehensive setup guide covering every supported device and the most common troubleshooting scenarios.',
  },
  {
    question: 'What happens if a channel stops working?',
    answer: 'Individual channels occasionally experience temporary issues — a source stream goes offline, an encoder fails, or a content provider changes their delivery method. When this happens, contact our WhatsApp support with the specific channel name and we will either provide an alternative stream or confirm when the main stream will be restored. Our channel library is monitored weekly and dead channels are replaced within 24 hours of identification.',
  },
]

export default function FAQPage() {
  const faqSchema  = buildFAQSchema(ALL_FAQS)
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'FAQ',  path: '/faq/' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main id="main-content" className="relative z-[20] flex flex-col flex-1 pt-16">

        {/* ── Hero ── */}
        <section className="section" aria-labelledby="faq-page-h1">
          <div className="container max-w-3xl mx-auto text-center">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center justify-center gap-2 font-ui text-xs text-[#6B7280]" role="list">
                <li><Link href="/" className="hover:text-[#E5181E] transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-[#374151]">/</li>
                <li className="text-[#F0F2F7]" aria-current="page">FAQ</li>
              </ol>
            </nav>
            <h1 id="faq-page-h1" className="font-display text-h1 text-[#F0F2F7] uppercase leading-none mb-6">
              IPTV UK{' '}
              <span className="gradient-text-red">FAQ</span>
            </h1>
            <p className="font-sans text-[#9CA3AF] text-lg leading-relaxed mb-4">
              Answers to every common question about our IPTV UK subscription service.
              Devices, channels, pricing, setup, trials, and technical support — all here.
            </p>
            <p className="font-ui text-sm text-[#6B7280]">
              Can&apos;t find your answer?{' '}
              <a
                href="https://wa.me/447451296412?text=Hi%2C%20I%20have%20a%20question%20about%20IPTV%20UK%20subscription."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5181E] hover:text-[#FF2D34] underline underline-offset-2 transition-colors"
              >
                Ask us on WhatsApp
              </a>{' '}
              — we reply within 15 minutes.
            </p>
          </div>
        </section>

        {/* ── Category nav ── */}
        <div className="container mb-10">
          <div className="max-w-3xl mx-auto flex flex-wrap gap-2 justify-center">
            {['General', 'Plans & Pricing', 'Technical', 'Support'].map((cat) => (
              <span key={cat} className="badge badge-muted cursor-default">{cat}</span>
            ))}
          </div>
        </div>

        {/* ── Full FAQ list — uses the shared FAQSection but injects all FAQs ── */}
        <section className="section pt-0">
          <div className="container">
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              {ALL_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="border border-white/[0.08] rounded-xl overflow-hidden group open:border-[rgba(229,24,30,0.3)] open:bg-[rgba(229,24,30,0.03)] transition-colors"
                >
                  <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none font-ui font-semibold text-sm sm:text-base text-[#F0F2F7] select-none">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-[#6B7280] group-open:text-[#E5181E] transition-colors text-xl leading-none">+</span>
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

        {/* ── CTA strip ── */}
        <section className="section pt-0">
          <div className="container max-w-3xl mx-auto">
            <div className="glass p-8 rounded-2xl text-center">
              <h2 className="font-display text-2xl text-[#F0F2F7] uppercase mb-3">
                Ready to start watching?
              </h2>
              <p className="font-sans text-[#9CA3AF] text-sm mb-6">
                Join 2,400+ UK subscribers already watching with{' '}
                <Link href="/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">IPTV UK Subscription</Link>.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/plans/" className="btn-red inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold">
                  View Plans — From £9.99/mo
                </Link>
                <Link href="/free-trial/" className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-white/20 font-ui text-sm text-[#F0F2F7] hover:bg-white/5 transition-colors">
                  Free 24-Hour Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
