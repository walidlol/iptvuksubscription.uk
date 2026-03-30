import { Suspense } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { searchContent, posterUrl } from '@/lib/tmdb'
import { SectionSkeleton } from '@/components/ui/SectionSkeleton'
import WhatsAppButton from '@/components/WhatsAppButton'

export const revalidate = 3600

export const metadata: Metadata = {
  title: '30,000+ IPTV UK Channels List 2026 | iptvuksubscription.uk',
  description:
    'Browse our complete IPTV UK channels list. 30,000+ live channels including UK Sports, BBC, ITV, Sky, BT Sport, Movies, Kids, International and more. HD & 4K.',
  alternates: { canonical: 'https://iptvuksubscription.uk/iptv-uk-channels/' },
  openGraph: {
    title: '30,000+ IPTV UK Channels List 2026',
    description:
      'Browse our complete IPTV UK channels list. 30,000+ live channels including UK Sports, BBC, ITV, Sky, BT Sport, Movies, Kids, International and more.',
    url: 'https://iptvuksubscription.uk/iptv-uk-channels/',
  },
}

// Static channel category data
const CHANNEL_CATEGORIES = [
  {
    id: 'sports',
    name: 'UK Sports',
    description: 'Every Premier League, Champions League & major sports event',
    channels: [
      'Sky Sports Main Event', 'Sky Sports Football', 'Sky Sports F1',
      'TNT Sports 1', 'TNT Sports 2', 'TNT Sports 3', 'TNT Sports 4',
      'Premier League TV', 'beIN Sports', 'ESPN', 'Eurosport 1',
      'Eurosport 2', 'Sky Sports Cricket', 'Sky Sports Golf',
    ],
    tmdbQuery: 'sport',
    count: '2,400+',
  },
  {
    id: 'drama',
    name: 'UK Drama & Entertainment',
    description: 'All BBC, ITV, Channel 4, Sky Atlantic and more',
    channels: [
      'BBC One', 'BBC Two', 'BBC Three', 'BBC Four',
      'ITV', 'ITV2', 'ITV3', 'ITV4',
      'Channel 4', 'E4', 'More4', 'Film4',
      'Channel 5', '5Star', '5USA',
      'Sky Atlantic', 'Sky Max', 'Sky Comedy',
      'Dave', 'Gold', 'W', 'Yesterday',
    ],
    tmdbQuery: 'drama',
    count: '800+',
  },
  {
    id: 'news',
    name: 'UK & International News',
    description: 'Breaking news from the UK and around the world, 24/7',
    channels: [
      'BBC News', 'Sky News', 'ITV News', 'GB News',
      'CNN International', 'Fox News', 'BBC World News',
      'Al Jazeera English', 'France 24', 'DW English',
      'Euronews', 'CNBC', 'Bloomberg',
    ],
    tmdbQuery: 'news',
    count: '400+',
  },
  {
    id: 'movies',
    name: 'Movies & Film',
    description: '100,000+ movies on demand + all Sky Cinema channels',
    channels: [
      'Sky Cinema Premiere', 'Sky Cinema Action', 'Sky Cinema Comedy',
      'Sky Cinema Drama', 'Sky Cinema Sci-Fi/Horror', 'Sky Cinema Thriller',
      'Sky Cinema Greats', 'Sky Cinema Animation', 'Sky Cinema Family',
      'Film4', 'TCM', 'Horror Channel', 'True Movies',
    ],
    tmdbQuery: 'cinema',
    count: '12,000+',
  },
  {
    id: 'kids',
    name: 'Kids & Family',
    description: 'Safe, family-friendly content with parental controls',
    channels: [
      'CBeebies', 'CBBC',
      'Cartoon Network', 'Boomerang', 'Cartoon Network +1',
      'Nickelodeon', 'Nick Jr', 'NickToons',
      'Disney Channel', 'Disney Junior', 'Disney XD',
      'Baby TV', 'Milkshake',
    ],
    tmdbQuery: 'family animation',
    count: '600+',
  },
  {
    id: 'international',
    name: 'International & Multi-Language',
    description: '200+ countries — Arabic, Turkish, Polish, Hindi, and many more',
    channels: [
      'MBC 1', 'MBC Drama', 'Al Arabiya', 'TRT 1', 'Show TV',
      'TVP Polonia', 'TV4 Sweden', 'RTL Germany', 'TF1 France',
      'Rai Uno', 'Telecinco Spain', 'Zee TV', 'Star Plus',
      'ARY Digital', 'Geo TV',
    ],
    tmdbQuery: 'international world',
    count: '18,000+',
  },
]

async function ChannelRow({
  category,
}: {
  category: typeof CHANNEL_CATEGORIES[number]
}) {
  // Fetch TMDB images for visual context
  const items = await searchContent(category.tmdbQuery)
  const posters = items.filter(i => i.poster_path).slice(0, 8)

  return (
    <div data-reveal className="mb-16">
      <div className="flex items-end justify-between mb-6 px-6">
        <div>
          <h2 className="font-bebas text-white text-3xl mb-1">{category.name}</h2>
          <p className="text-[#9CA3AF] text-sm">{category.description}</p>
        </div>
        <span className="text-[#E8392A] font-bebas text-2xl">{category.count}</span>
      </div>

      {/* Poster scroll row (decorative, with alt text for SEO) */}
      {posters.length > 0 && (
        <div className="flex gap-3 overflow-x-auto pb-4 px-6 scrollbar-hide mb-6">
          {posters.map(item => {
            const url = posterUrl(item.poster_path, 'w200')
            if (!url) return null
            const label = item.title ?? item.name ?? category.name
            return (
              <div
                key={item.id}
                className="shrink-0 rounded-lg overflow-hidden border border-[#1A1A1A]
                           hover:border-[#E8392A]/60 transition-colors"
                style={{ width: 100, height: 150 }}
              >
                <Image
                  src={url}
                  alt={`${label} — available on ${category.name} IPTV UK`}
                  width={100}
                  height={150}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Channel name pills */}
      <div className="flex flex-wrap gap-2 px-6">
        {category.channels.map(ch => (
          <span
            key={ch}
            className="px-4 py-2 text-sm border-l-2 border-[#E8392A] bg-[#111111] text-[#D1D5DB]
                       hover:bg-[#1A0A0A] hover:text-white transition-colors rounded-r-lg"
          >
            <h3 className="inline font-normal text-sm">{ch}</h3>
          </span>
        ))}
        <span className="px-4 py-2 text-sm text-[#6B7280] italic">
          + hundreds more...
        </span>
      </div>
    </div>
  )
}

async function AllChannelRows() {
  return (
    <>
      {CHANNEL_CATEGORIES.map(cat => (
        <ChannelRow key={cat.id} category={cat} />
      ))}
    </>
  )
}

export default async function ChannelsPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center bg-[#0A0A0A]">
        <p className="text-[#E8392A] text-xs uppercase tracking-widest mb-4 font-medium">
          LIVE · ON DEMAND · 4K
        </p>
        <h1
          className="font-bebas text-white mb-6"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1 }}
        >
          30,000+ IPTV UK CHANNELS
        </h1>
        <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto mb-10">
          The most comprehensive IPTV UK channel list available in 2026. Sports, entertainment,
          movies, kids, news, and international content — all in one subscription.
        </p>
        {/* Stats bar */}
        <div className="flex flex-wrap justify-center gap-8 text-center">
          {[
            { num: '35,000+', label: 'Live Channels' },
            { num: '100,000+', label: 'Movies & VOD' },
            { num: '200+', label: 'Countries' },
            { num: '4K', label: 'Quality Available' },
          ].map(s => (
            <div key={s.label}>
              <div className="font-bebas text-[#E8392A] text-4xl">{s.num}</div>
              <div className="text-[#9CA3AF] text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Intro paragraph — keyword-rich */}
      <section className="py-12 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <p className="text-[#9CA3AF] text-base leading-relaxed">
            Our IPTV UK channels list is one of the most comprehensive available in 2026, covering
            every major UK broadcaster and thousands of international channels. Whether you are a
            sports fan wanting uninterrupted Premier League and Champions League coverage, a family
            looking for reliable kids entertainment, or someone who wants global news in their native
            language — our IPTV UK subscription delivers it all through a single, affordable plan.
            With over 35,000 live channels updated daily and 100,000+ on-demand titles spanning
            movies, TV series, and documentaries, there is always something worth watching. Every
            channel streams in HD by default, with 4K available on supported content from Sky Sports,
            TNT Sports, and major cinema releases. Browse the categories below to explore the full
            IPTV UK channel lineup across sports, drama, news, film, kids, and international content.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="search"
              placeholder="Search channels e.g. BBC One, Sky Sports..."
              className="w-full bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl pl-12 pr-4 py-4
                         text-white placeholder-[#6B7280] focus:outline-none focus:border-[#E8392A]
                         transition-colors"
            />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Channel rows */}
      <section className="py-16 bg-[#0A0A0A]">
        <Suspense fallback={<SectionSkeleton rows={6} />}>
          <AllChannelRows />
        </Suspense>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* CTA */}
      <section className="py-20 px-6 bg-[#E8392A] text-center">
        <h2 className="font-bebas text-white mb-4" style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}>
          GET ALL 35,000+ CHANNELS
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          Access every channel listed above. Free 24-hour trial — no credit card required.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <WhatsAppButton
            message="Hi! I'd like a free 24-hour IPTV UK trial"
            variant="outline"
            className="px-10 py-4 font-bebas text-xl border-white text-white hover:bg-white hover:text-[#E8392A]"
          >
            GET FREE TRIAL
          </WhatsAppButton>
          <Link
            href="/pricing/"
            className="px-10 py-4 font-bebas text-xl bg-white text-[#E8392A] rounded-lg
                       hover:bg-white/90 transition-colors"
          >
            VIEW IPTV UK SUBSCRIPTION PLANS
          </Link>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'IPTV UK Channels List',
            description: '30,000+ IPTV UK channels available in 2026',
            numberOfItems: CHANNEL_CATEGORIES.length,
            itemListElement: CHANNEL_CATEGORIES.map((cat, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: cat.name,
              description: cat.description,
            })),
          }),
        }}
      />
    </main>
  )
}
