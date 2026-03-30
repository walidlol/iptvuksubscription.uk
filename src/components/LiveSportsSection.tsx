import Image from 'next/image'
import Link from 'next/link'
import { getTodaysMatches, getUpcomingMatches, type FootballMatch } from '@/lib/football'

function formatTime(utcDate: string) {
  return new Date(utcDate).toLocaleTimeString('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London',
  })
}

function formatDate(utcDate: string) {
  return new Date(utcDate).toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short',
  })
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'IN_PLAY' || status === 'PAUSED' || status === 'LIVE') {
    return (
      <span className="flex items-center gap-1.5 font-ui text-[10px] font-bold uppercase tracking-widest text-[#E8392A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#E8392A] animate-pulse inline-block" />
        LIVE
      </span>
    )
  }
  if (status === 'FINISHED') {
    return <span className="font-ui text-[10px] text-[#9CA3AF] uppercase tracking-widest">FT</span>
  }
  return <span className="font-ui text-[10px] text-[#E8392A] uppercase tracking-widest">TODAY</span>
}

function MatchCard({ match }: { match: FootballMatch }) {
  const { homeTeam, awayTeam, score, status, utcDate } = match
  const home = score.fullTime.home
  const away = score.fullTime.away
  const finished = status === 'FINISHED'

  return (
    <article
      aria-label={`${homeTeam.name} vs ${awayTeam.name} — Premier League`}
      className="flex-none w-64 bg-[#1A1A1A] rounded-xl p-4 border border-white/[0.06] hover:border-[rgba(232,57,42,0.3)] transition-colors"
    >
      {/* Hidden SEO h3 */}
      <h3 className="sr-only">{homeTeam.name} vs {awayTeam.name} — Premier League</h3>

      <div className="flex items-center justify-between mb-3">
        <span className="badge badge-muted text-[9px]">Premier League</span>
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-between gap-2">
        {/* Home */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          {homeTeam.crest ? (
            <Image
              src={homeTeam.crest}
              alt={homeTeam.name}
              width={32}
              height={32}
              className="object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-8 h-8 bg-[#2A2A2A] rounded-full" />
          )}
          <span className="font-ui text-[10px] text-[#F5F5F5] text-center leading-tight">{homeTeam.name}</span>
        </div>

        {/* Score / time */}
        <div className="flex flex-col items-center gap-1">
          {finished ? (
            <span className="font-display text-xl text-[#E8392A]">
              {home ?? 0} – {away ?? 0}
            </span>
          ) : (
            <span className="font-display text-base text-[#E8392A]">
              {formatTime(utcDate)}
            </span>
          )}
          <span className="font-ui text-[9px] text-[#9CA3AF]">{formatDate(utcDate)}</span>
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-1.5 flex-1">
          {awayTeam.crest ? (
            <Image
              src={awayTeam.crest}
              alt={awayTeam.name}
              width={32}
              height={32}
              className="object-contain"
              loading="lazy"
            />
          ) : (
            <div className="w-8 h-8 bg-[#2A2A2A] rounded-full" />
          )}
          <span className="font-ui text-[10px] text-[#F5F5F5] text-center leading-tight">{awayTeam.name}</span>
        </div>
      </div>
    </article>
  )
}

export default async function LiveSportsSection() {
  const [todayMatches, upcomingMatches] = await Promise.all([
    getTodaysMatches(),
    getUpcomingMatches(),
  ])

  const matches  = todayMatches.length > 0 ? todayMatches : upcomingMatches
  const isToday  = todayMatches.length > 0
  const heading  = isToday ? 'LIVE SPORTS TODAY' : 'UPCOMING PREMIER LEAGUE'

  if (matches.length === 0) return null

  return (
    <section className="bg-[#111111] py-16" aria-labelledby="sports-heading">
      <div className="container">
        <div className="mb-8" data-reveal>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#E8392A] mb-2">Premier League</p>
          <h2
            id="sports-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            {heading}
          </h2>
          <p className="font-ui text-[#9CA3AF] mt-2 text-sm">
            Watch every match live on your IPTV UK subscription
          </p>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin" style={{ scrollbarColor: '#E8392A #111111' }}>
          {matches.map(m => <MatchCard key={m.id} match={m} />)}
        </div>

        {/* CTA */}
        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <Link
            href="/plans/"
            className="btn-red inline-flex items-center h-10 px-6 text-sm font-semibold rounded"
          >
            Watch Every Match Live →
          </Link>
          <Link
            href="/channels/"
            className="font-ui text-sm text-[#9CA3AF] hover:text-[#E8392A] transition-colors"
          >
            View all sports channels
          </Link>
        </div>
      </div>
    </section>
  )
}
