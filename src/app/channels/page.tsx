/**
 * Channel List Silo — /channels/
 * Primary keyword: "iptv uk channels"
 * Target: 2,500+ words
 */

import Link from 'next/link'
import { buildChannelsMetadata } from '@/lib/seo'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/lib/schema'
import ChannelSearch from '@/components/organisms/ChannelSearch'
import {
  getTrending,
  getPopularMovies,
  getPopularTV,
  searchContent,
  backdropUrlMedium,
  pickWithPosters,
} from '@/lib/tmdb'

export const metadata = buildChannelsMetadata()

const CHANNEL_CATEGORIES = [
  {
    id:          'sport',
    heading:     'UK Sport',
    description: 'Every major live sport channel — Premier League, F1, cricket, boxing, golf, rugby, and more.',
    badge:       'Most Popular',
    color:       'from-sky-900',
    channels: [
      'Sky Sports Main Event HD',
      'Sky Sports Premier League HD',
      'Sky Sports Football HD',
      'Sky Sports Cricket HD',
      'Sky Sports Golf HD',
      'Sky Sports F1 HD',
      'Sky Sports Arena HD',
      'Sky Sports Action HD',
      'Sky Sports News HD',
      'TNT Sports 1 HD',
      'TNT Sports 2 HD',
      'TNT Sports 3 HD',
      'TNT Sports 4 HD',
      'TNT Sports Ultimate HD',
      'BBC Sport HD',
      'ITV4 Sport HD',
      'Channel 4 Sport HD',
      'Eurosport 1 HD',
      'Eurosport 2 HD',
      'ESPN UK HD',
      'Premier Sports 1 HD',
      'Premier Sports 2 HD',
      'FreeSports HD',
      'Sky Sports Racing HD',
      'Sky Sports Box Office',
    ] as const,
  },
  {
    id:          'entertainment',
    heading:     'UK Entertainment',
    description: 'The complete UK entertainment landscape — BBC, Sky Atlantic, ITV, and every pay channel.',
    badge:       null,
    color:       'from-purple-900',
    channels: [
      'BBC One HD',
      'BBC Two HD',
      'BBC Three HD',
      'BBC Four HD',
      'ITV HD',
      'ITV2 HD',
      'ITV3 HD',
      'ITV4 HD',
      'ITVBE HD',
      'Channel 4 HD',
      'E4 HD',
      'More4 HD',
      'Film4 HD',
      'Channel 5 HD',
      '5Star HD',
      '5USA HD',
      'Sky Atlantic HD',
      'Sky Max HD',
      'Sky Showcase HD',
      'Sky Crime HD',
      'Sky Documentaries HD',
      'Sky History HD',
      'Sky Arts HD',
      'Gold HD',
      'Dave HD',
      'Comedy Central UK HD',
      'MTV UK HD',
      'Discovery Channel UK HD',
      'National Geographic UK HD',
      'TLC UK HD',
    ] as const,
  },
  {
    id:          'news',
    heading:     'UK & World News',
    description: 'Every major UK and international news channel, 24 hours a day.',
    badge:       null,
    color:       'from-red-900',
    channels: [
      'BBC News HD',
      'ITV News HD',
      'Sky News HD',
      'GB News HD',
      'BBC Parliament HD',
      'CNN International HD',
      'Fox News HD',
      'MSNBC HD',
      'Euronews English HD',
      'Al Jazeera English HD',
      'Bloomberg UK HD',
      'CNBC Europe HD',
      'France 24 English HD',
      'DW English HD',
    ] as const,
  },
  {
    id:          'movies',
    heading:     'Movies & Film',
    description: 'Sky Cinema in full, plus every major UK and international movie channel.',
    badge:       null,
    color:       'from-indigo-900',
    channels: [
      'Sky Cinema Premiere HD',
      'Sky Cinema Select HD',
      'Sky Cinema Hits HD',
      'Sky Cinema Greats HD',
      'Sky Cinema Animation HD',
      'Sky Cinema Family HD',
      'Sky Cinema Action HD',
      'Sky Cinema Comedy HD',
      'Sky Cinema Drama HD',
      'Sky Cinema Thriller HD',
      'Sky Cinema Sci-Fi & Horror HD',
      'Film4 HD',
      'Horror Channel HD',
      'Movies24 HD',
      'True Movies 1 HD',
      'True Movies 2 HD',
    ] as const,
  },
  {
    id:          'kids',
    heading:     'Kids & Family',
    description: 'CBeebies, CBBC, Disney, Nick Jr, Cartoon Network — for all ages.',
    badge:       null,
    color:       'from-emerald-900',
    channels: [
      'CBeebies HD',
      'CBBC HD',
      'Disney Channel UK HD',
      'Disney Junior UK HD',
      'Disney XD UK HD',
      'Nick Jr UK HD',
      'Nickelodeon UK HD',
      'Nicktoons UK HD',
      'Cartoon Network UK HD',
      'Boomerang UK HD',
      'Tiny Pop HD',
      'Pop HD',
      'CITV HD',
      'BabyTV HD',
    ] as const,
  },
  {
    id:          'international',
    heading:     'International',
    description: "Channels for the UK's diverse communities — South Asian, Arabic, Polish, Turkish, and more.",
    badge:       null,
    color:       'from-orange-900',
    channels: [
      'Star Plus HD',
      'Zee TV UK HD',
      'Sony Entertainment TV UK HD',
      'Colors UK HD',
      'ARY Digital UK HD',
      'Geo TV HD',
      'Hum TV HD',
      'Al Jazeera Arabic HD',
      'MBC 1 HD',
      'MBC 2 HD',
      'MBC 4 HD',
      'beIN Sports Arabia 1 HD',
      'Rotana Cinema HD',
      'TVP Poland HD',
      'Polsat HD',
      'TRT 1 HD',
      'Show TV Turkey HD',
      'RAI 1 Italy HD',
      'France 2 HD',
      'TF1 France HD',
      'ARD Germany HD',
      'ZDF Germany HD',
      'TVE Spain HD',
      'Romania TV HD',
    ] as const,
  },
] as const

const CHANNELS_FAQS = [
  {
    question: 'How many UK channels are included in the IPTV UK subscription?',
    answer:   'Our service includes 5,000+ UK and US English-language channels within our broader 35,000+ channel package. This covers every major free-to-air channel (BBC One, ITV, Channel 4, Channel 5), every Sky Sports channel, TNT Sports 1–4, Sky Cinema in full, and all UK entertainment, news, and kids channels.',
  },
  {
    question: 'Are all the listed IPTV UK channels working and in HD?',
    answer:   'Our entire channel library is tested weekly. Dead or degraded channels are replaced within 24 hours of being identified. The vast majority of UK channels are available in HD (720p) or Full HD (1080p) on all plans; 4K versions of selected channels are available on Premium Annual and Family plans.',
  },
  {
    question: 'Does the IPTV UK channel list include Sky Sports Box Office events?',
    answer:   'Yes. Pay-per-view boxing events on Sky Sports Box Office and TNT Box Office are included within our standard channel package at no additional cost. This includes major world title fights and premium sporting occasions.',
  },
  {
    question: 'Can I get an EPG (TV guide) for the UK channels?',
    answer:   'Yes. The EPG (Electronic Programme Guide) is included on our Premium Annual and Family plans, covering all major UK channels for the current day and the next 7 days. It integrates natively with TiviMate and IPTV Smarters Pro.',
  },
  {
    question: 'Are international channels included at no extra cost?',
    answer:   'Yes. South Asian, Arabic, Polish, Turkish, German, French, Spanish, Italian, and Romanian channels are all included within the same single subscription. One subscription covers all 35,000+ channels.',
  },
]

export default async function ChannelsPage() {
  const faqSchema  = buildFAQSchema(CHANNELS_FAQS)
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home',     path: '/' },
    { name: 'Channels', path: '/channels/' },
  ])

  /* Fetch TMDB backdrops for category headers in parallel */
  const [trending, movies, tvShows, sports] = await Promise.all([
    getTrending(),
    getPopularMovies(),
    getPopularTV(),
    searchContent('football sport boxing'),
  ])

  const categoryBackdrops: Record<string, string | null> = {
    sport:         backdropUrlMedium(pickWithPosters(sports,  1)[0]?.backdrop_path ?? null),
    entertainment: backdropUrlMedium(pickWithPosters(tvShows, 2)[1]?.backdrop_path ?? null),
    news:          backdropUrlMedium(pickWithPosters(trending, 6)[5]?.backdrop_path ?? null),
    movies:        backdropUrlMedium(pickWithPosters(movies,  1)[0]?.backdrop_path ?? null),
    kids:          backdropUrlMedium(pickWithPosters(tvShows, 4)[3]?.backdrop_path ?? null),
    international: backdropUrlMedium(pickWithPosters(trending, 10)[9]?.backdrop_path ?? null),
  }

  /* Merge backdrops into categories */
  const categoriesWithBackdrops = CHANNEL_CATEGORIES.map(cat => ({
    ...cat,
    channels: [...cat.channels],
    backdropUrl: categoryBackdrops[cat.id] ?? null,
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <main id="main-content" className="relative z-[20] flex flex-col flex-1 bg-[#0A0A0A] pt-16">

        {/* ── Page hero ── */}
        <section className="py-16 overflow-hidden" aria-labelledby="channels-h1">
          <div className="container">

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-ui text-xs text-[#9CA3AF]" role="list">
                <li><Link href="/" className="hover:text-[#E8392A] transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-[#374151]">/</li>
                <li className="text-[#F5F5F5]" aria-current="page">UK Channels</li>
              </ol>
            </nav>

            {/* Heading */}
            <h1
              id="channels-h1"
              className="font-display text-[#F5F5F5] uppercase leading-none mb-4"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
            >
              IPTV UK{' '}
              <span style={{ color: '#E8392A' }}>Channel List</span>
            </h1>
            <p className="font-sans text-[#9CA3AF] text-lg max-w-2xl mb-8">
              Over 5,000 UK channels included — every Sky Sports channel, all BBC and ITV, TNT Sports, Sky Cinema, kids, news, and 30,000+ international channels in one subscription.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/plans/"
                className="inline-flex items-center justify-center font-display uppercase tracking-widest text-white bg-[#E8392A] px-8 py-3 transition-all duration-200 hover:bg-[#B52B1F]"
                style={{ borderRadius: '2px' }}
              >
                Get All Channels — From £9.99
              </Link>
              <a
                href="https://wa.me/447451296412?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-display uppercase tracking-widest text-[#F5F5F5] border border-white/30 px-8 py-3 hover:border-[#E8392A] transition-all duration-200"
                style={{ borderRadius: '2px' }}
              >
                Free Trial
              </a>
            </div>
          </div>
        </section>

        {/* ── Red separator ── */}
        <span className="red-separator block" aria-hidden="true" />

        {/* ── Interactive channel grid (client component) ── */}
        <section className="py-16" aria-label="Channel categories and search">
          <ChannelSearch categories={categoriesWithBackdrops} />
        </section>

        {/* ── Long-form SEO content ── */}
        <section className="py-16 border-t border-white/[0.06]" aria-labelledby="channels-content-heading">
          <div className="container max-w-4xl mx-auto">

            <h2
              id="channels-content-heading"
              className="font-display text-[#F5F5F5] uppercase mb-8"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              About Our <span style={{ color: '#E8392A' }}>IPTV UK Channel</span> Library
            </h2>

            <div className="flex flex-col gap-4">
              {[
                {
                  q: 'Why our UK channel quality stands apart',
                  a: 'Many IPTV UK providers advertise enormous channel counts that include thousands of dead links, duplicated entries, and foreign channels with no UK relevance. Our approach is different: our channel playlist is tested weekly, channel-by-channel, for live status, stream quality, and audio synchronisation. Dead channels are removed and replaced within 24 hours. The result is a playlist where the channels that matter to UK viewers actually work, consistently, when you need them — including during high-demand events like Premier League Super Sunday, Grand Prix qualifying, or a world title boxing night.',
                },
                {
                  q: 'Sky Sports — the complete UK package',
                  a: 'All Sky Sports channels are included: Sky Sports Main Event, Sky Sports Premier League (with multiple simultaneous match streams), Sky Sports Football, Sky Sports Cricket, Sky Sports Golf, Sky Sports F1, Sky Sports Arena (boxing, darts, rugby league), Sky Sports Action, and Sky Sports News. Sky Sports Box Office events — major boxing pay-per-view nights — are included within our standard package at no additional cost.',
                },
                {
                  q: 'Catch-up TV and EPG guide',
                  a: 'Premium Annual and Family plan subscribers receive a 7-day catch-up TV library for all major UK channels and a full EPG guide. Unlike BBC iPlayer, ITVX, and My4, our catch-up system does not enforce UK IP address geoblocking — so it works from any internet connection worldwide without a VPN.',
                },
                {
                  q: '4K Ultra HD UK channels',
                  a: 'Selected Sky Sports channels broadcast certain events in 4K HDR — Premier League matches, Champions League fixtures, F1 races. Our Premium Annual and Family plans receive these 4K streams when available. For 4K streams, we recommend a minimum of 25 Mbps dedicated download speed per stream.',
                },
              ].map(({ q, a }) => (
                <details
                  key={q}
                  className="border border-white/[0.08] rounded-xl overflow-hidden group open:border-[rgba(232,57,42,0.3)] open:bg-[rgba(232,57,42,0.03)] transition-colors"
                >
                  <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none font-display text-base text-[#F5F5F5] uppercase tracking-wide select-none">
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

            {/* FAQ */}
            <h2
              className="font-display text-[#F5F5F5] uppercase mt-16 mb-6"
              style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)' }}
            >
              Frequently Asked <span style={{ color: '#E8392A' }}>Questions</span>
            </h2>

            <div className="flex flex-col gap-4">
              {CHANNELS_FAQS.map((faq, i) => (
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
