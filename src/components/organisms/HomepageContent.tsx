'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, staggerChild, viewport } from '@/lib/animations'

/* ============================================================
   HomepageContent — Long-form SEO body
   Primary keyword: "iptv uk" / "iptv uk subscription"
   Target: 2,000+ words inline semantic content
   H2 → H3 → H4 hierarchy, internal links to all 3 silos
   ============================================================ */

export default function HomepageContent() {
  return (
    <section
      className="section"
      aria-labelledby="content-main-heading"
    >
      <div className="container">
        <motion.article
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-4xl mx-auto prose-dark"
        >

          {/* ── Section 1 ── */}
          <motion.div variants={fadeUp}>
            <h2 id="content-main-heading">
              What Is IPTV UK and How Does It Work?
            </h2>
            <p>
              <strong>IPTV UK</strong> stands for Internet Protocol Television delivered specifically to UK broadband subscribers. Rather than receiving your television signal via satellite dish, cable infrastructure, or a Freeview aerial, IPTV streams live channels and on-demand video directly over your internet connection. The result is a flexible, device-agnostic television experience that works wherever you have broadband — in your living room, on your commute, or on holiday abroad.
            </p>
            <p>
              The technology itself is not new. Major broadcasters including the BBC (via iPlayer), ITV (ITVX), and Channel 4 (My4) have offered IPTV-style catch-up services for years. What our <Link href="/iptv-uk-subscription/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">IPTV UK subscription</Link> delivers is something far broader: a single service that aggregates over 35,000 live channels from the UK, USA, Europe, Middle East, and beyond — alongside 100,000+ on-demand films and series — into one unified, always-on platform.
            </p>
            <p>
              At its core, your IPTV UK service works like this: you receive a set of Xtream Codes credentials (username, password, and server URL) or an M3U playlist link. You enter these into a compatible IPTV player app on your device — IPTV Smarters Pro and TiviMate are the two most popular choices in the UK — and within seconds you have access to the full channel lineup. Most of our customers are up and running within ten minutes of receiving their credentials.
            </p>
          </motion.div>

          {/* ── Section 2 ── */}
          <motion.div variants={fadeUp}>
            <h2>The Real Cost of UK Television in 2026 — and Why IPTV Wins</h2>
            <p>
              British households are paying more for television than ever before. A combination of Sky TV, Netflix, Disney+, Apple TV+, and Amazon Prime Video can easily cost a household between £80 and £130 per month. Add a TV licence fee of £169.50 per year and the total annual spend on television can exceed £1,500. For families watching sport, that figure climbs higher still: Sky Sports alone costs over £43 per month on top of a base Sky subscription.
            </p>

            <h3>How Our IPTV UK Subscription Compares</h3>
            <p>
              Our <Link href="/plans/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">IPTV UK plans</Link> start at £9.99 per month for the Standard tier. Our Premium Annual plan — the most popular choice among UK subscribers — costs £79.99 for a full 12 months. That works out to less than £0.22 per day for access to every channel listed below, 4K Ultra HD streams, a full EPG electronic programme guide, and seven-day catch-up TV. For context:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#9CA3AF] text-sm my-4">
              <li>Sky Sports Full Pass: from £43/month → <strong className="text-[#F0F2F7]">we cover all Sky Sports channels</strong></li>
              <li>BT Sport (now TNT Sports): from £30/month → <strong className="text-[#F0F2F7]">included in all our plans</strong></li>
              <li>Netflix Standard 4K: £17.99/month → <strong className="text-[#F0F2F7]">our 100,000+ VOD library covers most major titles</strong></li>
              <li>Our Premium Annual: <strong className="text-[#F0F2F7]">£79.99/year total</strong> — all of the above, one subscription</li>
            </ul>
            <p>
              The savings are significant enough that most UK subscribers recoup their full annual subscription cost within the first fortnight of cancelling their legacy pay-TV packages.
            </p>

            <h3>IPTV vs. Sky, Virgin Media, and Freesat</h3>
            <p>
              Sky and Virgin Media both require long-term contracts — typically 18 to 24 months — along with professional installation, hardware rental fees, and price rises baked in after your introductory period. Freesat and Freeview offer a limited channel selection with no on-demand depth and no 4K content outside of the BBC's limited Freesat 4K offering.
            </p>
            <p>
              An <Link href="/iptv-subscription-uk/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">IPTV subscription UK</Link> service like ours requires no hardware installation, no satellite dish, no long-term commitment on Standard plans, and delivers a content library that dwarfs what any single UK broadcaster or pay-TV provider offers. You cancel when you want, on your terms.
            </p>
          </motion.div>

          {/* ── Section 3 ── */}
          <motion.div variants={fadeUp}>
            <h2>UK Channels Included — What Can You Watch?</h2>
            <p>
              Our <Link href="/channels/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">full UK channel list</Link> exceeds 5,000 UK and US channels within our broader 35,000+ channel package. The depth and quality of UK channel coverage is the primary reason our subscribers stay long-term.
            </p>

            <h3>UK Entertainment Channels</h3>
            <p>
              Every major UK free-to-air and pay-TV entertainment channel is available, including BBC One, BBC Two, BBC Three, BBC Four, ITV, ITV2, ITV3, ITV4, Channel 4, E4, More4, Channel 5, 5Star, Dave, W, Gold, Really, Yesterday, Comedy Central UK, Crime+Investigation, and all Sky Entertainment channels including Sky Atlantic, Sky Max, Sky Showcase, and Sky Crime. The UK Drama series that dominate Ofcom viewing figures — Coronation Street, EastEnders, Emmerdale, Hollyoaks, Casualty, Peaky Blinders reruns, and Line of Duty rewatches — are all accessible live and via catch-up.
            </p>

            <h3>UK Sport on IPTV — Premier League, F1, Boxing, and More</h3>
            <p>
              Sport is the single biggest driver of IPTV UK subscriptions, and for good reason. Traditional pay-TV sport is ruinously expensive and fragmented across multiple providers. Our service consolidates the entire UK sport landscape:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#9CA3AF] text-sm my-4">
              <li><strong className="text-[#F0F2F7]">Premier League:</strong> All Sky Sports and TNT Sports Premier League fixtures in HD/4K</li>
              <li><strong className="text-[#F0F2F7]">Championship & EFL:</strong> Sky Sports Football coverage of the Championship, League One, and League Two</li>
              <li><strong className="text-[#F0F2F7]">Formula 1:</strong> Every Grand Prix live on Sky Sports F1 plus free-to-air highlights</li>
              <li><strong className="text-[#F0F2F7]">International Football:</strong> UEFA Champions League, Europa League, and international fixtures</li>
              <li><strong className="text-[#F0F2F7]">Cricket:</strong> Sky Sports Cricket — The Ashes, Test matches, The Hundred, and IPL</li>
              <li><strong className="text-[#F0F2F7]">Boxing:</strong> Sky Sports Box Office events and TNT Sports boxing</li>
              <li><strong className="text-[#F0F2F7]">Golf:</strong> Sky Sports Golf — The Open, Ryder Cup, and European Tour</li>
              <li><strong className="text-[#F0F2F7]">Rugby:</strong> Premiership Rugby on TNT Sports and Six Nations on BBC and ITV</li>
              <li><strong className="text-[#F0F2F7]">Wimbledon & Tennis:</strong> BBC's free-to-air Wimbledon coverage and Sky Sports Tennis</li>
              <li><strong className="text-[#F0F2F7]">Horse Racing:</strong> ITV Racing and Sky Sports Racing complete coverage</li>
            </ul>
            <p>
              For families supporting different clubs or sports, our <Link href="/plans/#family" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">Family Plan</Link> allows up to five simultaneous connections — meaning Dad can watch the match on the TV, while the kids stream on tablets, and Mum catches up on a drama on her phone, all at the same time without any buffering or quality degradation.
            </p>

            <h3>International Channels and World Cinema</h3>
            <p>
              Beyond UK content, our 35,000+ channel library spans over 80 countries. Arabic-language subscribers will find beIN Sports Arabia, MBC Group channels, Rotana, and Dubai TV. South Asian viewers have access to Star Plus, Zee TV, Colors, Sony LIV, and all major Indian cricket coverage. French, Spanish, German, Italian, and Turkish international channel packages are available within the same subscription — no additional add-ons required.
            </p>
          </motion.div>

          {/* ── Section 4 ── */}
          <motion.div variants={fadeUp}>
            <h2>Compatible Devices — Watch on Anything</h2>
            <p>
              One of the most frequently asked questions we receive is: <em>"Will IPTV UK work on my device?"</em> The short answer is almost certainly yes. Our service is compatible with any device that supports a modern IPTV player application.
            </p>

            <h3>Most Popular Devices for IPTV UK</h3>
            <p>
              The <strong>Amazon Firestick</strong> is by far the most popular device among our UK subscribers. It is inexpensive, widely available from Amazon UK, and runs IPTV Smarters Pro and TiviMate natively. Our <Link href="/setup-guide/#firestick" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">Firestick IPTV setup guide</Link> walks through the process in under five minutes.
            </p>
            <p>
              <strong>Android TV boxes</strong> — including the NVIDIA Shield, Xiaomi Mi Box, and budget alternatives like the X96 series — offer more processing power and storage than a Firestick, making them ideal for 4K HDR streams and simultaneous recording features in TiviMate Premium. <strong>Samsung Smart TVs</strong> and <strong>LG Smart TVs</strong> running Tizen and webOS respectively support IPTV Smarters directly from their app stores in many regions, or via screen casting from an Android device.
            </p>
            <p>
              Mobile viewers can use <strong>IPTV Smarters Pro on iOS and Android</strong> to watch on the go — on the train, during a lunch break, or while travelling abroad within Europe. The app supports picture-in-picture mode on supported iOS and Android versions, so you can follow a match while browsing elsewhere on your phone.
            </p>

            <h3>MAG Boxes and Enigma2 Devices</h3>
            <p>
              Traditional set-top box users running <strong>MAG254, MAG322, or MAG420</strong> devices can connect using our IPTV portal URL in the built-in stalker portal browser. <strong>Enigma2 devices</strong> — Zgemma, Vu+, Formuler Z — are fully supported via the included m3u playlist. Our support team, available via WhatsApp, can walk through the configuration for any of these devices if you encounter difficulties.
            </p>
          </motion.div>

          {/* ── Section 5 ── */}
          <motion.div variants={fadeUp}>
            <h2>How to Get Started with IPTV UK Subscription</h2>
            <p>
              Getting started takes less than ten minutes from purchase to first stream. Here is the complete process:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-[#9CA3AF] text-sm my-4">
              <li>
                <strong className="text-[#F0F2F7]">Choose your plan</strong> — visit our <Link href="/plans/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">pricing page</Link> and select Standard Monthly, Premium Annual, or Family Plan based on how many connections you need and whether you want 4K quality and catch-up TV.
              </li>
              <li>
                <strong className="text-[#F0F2F7]">Complete payment</strong> — we accept PayPal (no PayPal account required — you can pay by card through PayPal's guest checkout) and cryptocurrency including Bitcoin, Ethereum, and USDT via NOWPayments.
              </li>
              <li>
                <strong className="text-[#F0F2F7]">Message us on WhatsApp</strong> — after payment, send us a quick WhatsApp message with your order reference. We create your account credentials manually to ensure quality control.
              </li>
              <li>
                <strong className="text-[#F0F2F7]">Receive your credentials</strong> — within 15 minutes during UK business hours (and typically within the hour at other times), you will receive your Xtream Codes login or M3U URL.
              </li>
              <li>
                <strong className="text-[#F0F2F7]">Install and configure your IPTV player</strong> — follow our <Link href="/setup-guide/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">setup guide</Link> for step-by-step instructions for your specific device. Most users are watching live TV within five minutes of receiving their credentials.
              </li>
            </ol>
            <p>
              Not sure yet? Our <Link href="/free-trial/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">free 24-hour IPTV trial</Link> lets you experience the full service — all channels, 4K quality, the complete VOD library — before committing to a paid plan. Trials are available via WhatsApp request and are limited to 20 per day to maintain service quality.
            </p>
          </motion.div>

          {/* ── Section 6 ── */}
          <motion.div variants={fadeUp}>
            <h2>IPTV UK Quality and Reliability — What to Expect</h2>
            <p>
              Stream quality and uptime are the two non-negotiables for any IPTV UK service. Poor quality at match time, or buffering during a tense Premier League finale, is unacceptable. Here is what our infrastructure delivers:
            </p>

            <h3>Stream Quality Tiers</h3>
            <p>
              Our Standard plan delivers HD (720p) and Full HD (1080p) streams across all channels. The Premium Annual and Family plans unlock 4K Ultra HD (2160p) streams on channels that broadcast in 4K, including selected Sky Sports and BBC events. All streams are served over adaptive bitrate delivery — meaning the service automatically adjusts to your connection speed to eliminate buffering, dropping to 1080p briefly if your broadband dips, then recovering to 4K when bandwidth is restored.
            </p>

            <h3>Server Infrastructure and Uptime</h3>
            <p>
              We maintain a <strong>99.9% uptime guarantee</strong> backed by geographically distributed server infrastructure across multiple European data centres. Load is automatically balanced across server nodes, ensuring that high-demand events — Premier League Super Sundays, Champions League finals, major boxing nights — do not create bottlenecks. Our monitoring runs continuously, with automatic failover to redundant nodes within seconds of any server-level issue.
            </p>
            <p>
              In over two years of operation, the service has experienced fewer than five extended outages, all of which affected only a subset of channels and were resolved within hours. UK-specific channels are hosted on dedicated infrastructure to ensure the lowest possible latency for British subscribers.
            </p>

            <h3>Broadband Requirements</h3>
            <p>
              For HD streams, a minimum of 10 Mbps download speed is recommended. For 4K streams, 25 Mbps is ideal. The vast majority of UK broadband connections — whether FTTC (fibre to the cabinet), FTTP (full fibre), or Virgin Media cable — far exceed these requirements. If you experience any buffering issues, our support team will diagnose whether the issue is connection-related and recommend optimisations including router placement, wired Ethernet connection, or IPTV buffer settings within your player app.
            </p>
          </motion.div>

          {/* ── Internal link CTA block ── */}
          <motion.div
            variants={fadeUp}
            className="mt-12 grid sm:grid-cols-3 gap-4"
          >
            {[
              { label: 'View All Plans & Pricing', href: '/plans/', desc: 'From £9.99/month' },
              { label: 'Full UK Channel List', href: '/channels/', desc: '35,000+ channels' },
              { label: 'IPTV UK Setup Guide', href: '/setup-guide/', desc: 'Any device, 5 minutes' },
            ].map(({ label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="glass glass-hover flex flex-col gap-1 p-4 rounded-xl cursor-pointer transition-colors duration-200 group"
              >
                <span className="font-ui text-sm font-semibold text-[#F0F2F7] group-hover:text-[#E5181E] transition-colors">
                  {label} →
                </span>
                <span className="font-ui text-xs text-[#6B7280]">{desc}</span>
              </Link>
            ))}
          </motion.div>

        </motion.article>
      </div>
    </section>
  )
}
