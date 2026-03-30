import Image from 'next/image'
import { Star } from 'lucide-react'
import { getTrending, posterUrl, type TMDBItem } from '@/lib/tmdb'

/* TMDB genre id → name map (common subset) */
const GENRE_MAP: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 27: 'Horror', 10749: 'Romance', 878: 'Sci-Fi',
  53: 'Thriller', 37: 'Western',
}

interface TMDBItemExtended extends TMDBItem {
  vote_average?: number
  genre_ids?:    number[]
}

function VodCard({ item }: { item: TMDBItemExtended }) {
  const title  = item.title ?? item.name ?? 'Unknown'
  const imgSrc = posterUrl(item.poster_path, 'w342')
  const rating = item.vote_average ? Math.round(item.vote_average * 10) / 10 : null
  const genre  = item.genre_ids?.length
    ? GENRE_MAP[item.genre_ids[0]] ?? 'Entertainment'
    : (item.media_type === 'tv' ? 'TV Series' : 'Movie')

  return (
    <article className="group relative" aria-label={`${title} — Watch on IPTV UK`}>
      {/* Hidden SEO heading */}
      <h3 className="sr-only">{title} — Watch on IPTV UK Subscription</h3>

      {/* Poster */}
      <div
        className="relative rounded-xl overflow-hidden aspect-[2/3] bg-[#1A1A1A]"
        style={{ marginBottom: '0.5rem' }}
      >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={`${title} - Watch on IPTV UK Subscription`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px"
            loading="lazy"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <span className="badge badge-red text-[9px] mb-1 inline-block">INCLUDED IN YOUR PLAN</span>
          <span className="font-ui text-xs text-[#F5F5F5] font-semibold leading-tight">
            Available on IPTV UK
          </span>
        </div>

        {/* Rating badge */}
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/70 rounded px-1.5 py-0.5">
            <Star size={9} className="text-[#F5A623] fill-[#F5A623]" aria-hidden="true" />
            <span className="font-mono text-[10px] text-[#F5F5F5]">{rating}</span>
          </div>
        )}
      </div>

      {/* Info below */}
      <p className="font-ui text-xs text-[#F5F5F5] truncate font-medium">{title}</p>
      <p className="font-ui text-[10px] text-[#9CA3AF]">{genre}</p>
    </article>
  )
}

export default async function TrendingVODSection() {
  /* Fetch 20 trending items — we'll display 12 */
  const trending = (await getTrending()) as TMDBItemExtended[]
  const items    = trending.slice(0, 12)

  if (items.length === 0) return null

  return (
    <section className="section bg-[#0A0A0A]" aria-labelledby="vod-heading">
      <div className="container">
        <div className="mb-10" data-reveal>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#E8392A] mb-2">On Demand</p>
          <h2
            id="vod-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            Trending Now
          </h2>
          <p className="font-ui text-[#9CA3AF] mt-2 text-sm">
            100,000+ movies and TV shows — all included in your IPTV UK subscription.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map(item => (
            <VodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
