/**
 * Server component — fetches TMDB trending backdrops and passes to HeroSection.
 * This keeps the client component clean (no fetch calls) and the API key server-only.
 */

import { getTrending, posterUrl, pickWithPosters } from '@/lib/tmdb'
import HeroSection from './HeroSection'

export default async function HeroSectionServer() {
  /* 6 trending items → use portrait poster_path for the floating cards */
  const trending = await getTrending()
  const picks    = pickWithPosters(trending, 6)

  const posterImageUrls = picks.map(item => posterUrl(item.poster_path, 'w500'))

  return <HeroSection posterImageUrls={posterImageUrls} />
}
