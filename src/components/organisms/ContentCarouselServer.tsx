/**
 * Server component — fetches TMDB data then renders ContentCarousel.
 * Keep this file server-only (no 'use client').
 */

import {
  getPopularMovies,
  getPopularTV,
  getTrending,
  searchContent,
  posterUrl,
  pickWithPosters,
} from '@/lib/tmdb'
import { DEFAULT_ROWS, type ContentRow } from '@/lib/carouselData'
import ContentCarousel from './ContentCarousel'

export default async function ContentCarouselServer() {
  /* Fetch all 4 row datasets in parallel */
  const [movies, tvShows, trending, sports] = await Promise.all([
    getPopularMovies(),
    getPopularTV(),
    getTrending(),
    searchContent('football boxing sport'),
  ])

  /* Sports (8 cards) — sports movie search results */
  const sportsPosters = pickWithPosters(sports, 8).map(item => posterUrl(item.poster_path))

  /* Movies (8 cards) — UK popular movies */
  const moviePosters = pickWithPosters(movies, 8).map(item => posterUrl(item.poster_path))

  /* UK Drama (8 cards) — popular TV shows */
  const dramaPosters = pickWithPosters(tvShows, 8).map(item => posterUrl(item.poster_path))

  /* International (8 cards) — trending (skip first 8 to avoid overlap with movies) */
  const intlPosters  = pickWithPosters(trending.slice(8), 8).map(item => posterUrl(item.poster_path))

  const posterMaps: Record<string, (string | null)[]> = {
    sports:        sportsPosters,
    movies:        moviePosters,
    drama:         dramaPosters,
    international: intlPosters,
  }

  /* Merge TMDB posters into the default rows */
  const rows: ContentRow[] = DEFAULT_ROWS.map(row => ({
    ...row,
    cards: row.cards.map((card, i) => ({
      ...card,
      posterUrl: posterMaps[row.id]?.[i] ?? undefined,
    })),
  }))

  return <ContentCarousel rows={rows} />
}
