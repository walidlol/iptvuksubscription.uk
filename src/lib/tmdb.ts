/**
 * TMDB API helpers — server-side only (no NEXT_PUBLIC_ prefix).
 * All functions cache responses for 1 hour via next.revalidate.
 */

const BASE_URL   = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export interface TMDBItem {
  id:            number
  title?:        string       // movies
  name?:         string       // TV shows
  poster_path:   string | null
  backdrop_path: string | null
  media_type?:   string
}

interface TMDBResponse {
  results: TMDBItem[]
}

function tmdbHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    accept: 'application/json',
  }
}

async function fetchTMDB(path: string): Promise<TMDBItem[]> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: tmdbHeaders(),
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    const data: TMDBResponse = await res.json()
    return data.results ?? []
  } catch {
    return []
  }
}

/** Trending movies + TV this week */
export async function getTrending(): Promise<TMDBItem[]> {
  return fetchTMDB('/trending/all/week?language=en-GB')
}

/** Popular movies in the UK */
export async function getPopularMovies(): Promise<TMDBItem[]> {
  return fetchTMDB('/movie/popular?language=en-GB&region=GB')
}

/** Popular TV shows */
export async function getPopularTV(): Promise<TMDBItem[]> {
  return fetchTMDB('/tv/popular?language=en-GB')
}

/** Multi-search (movies + TV + people) */
export async function searchContent(query: string): Promise<TMDBItem[]> {
  return fetchTMDB(`/search/multi?query=${encodeURIComponent(query)}&language=en-GB&include_adult=false`)
}

/** Now-playing movies */
export async function getNowPlaying(): Promise<TMDBItem[]> {
  return fetchTMDB('/movie/now_playing?language=en-GB&region=GB')
}

/* ── Image URL helpers ── */

/** Portrait poster  — default w500 (200×300px equivalent) */
export function posterUrl(path: string | null, size = 'w500'): string | null {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

/** Landscape backdrop — default original */
export function backdropUrl(path: string | null, size = 'original'): string | null {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

/** w780 backdrop — for medium hero cards */
export function backdropUrlMedium(path: string | null): string | null {
  return backdropUrl(path, 'w1280')
}

/**
 * Pick the best N items from a results array that have a poster_path.
 * Falls back to any item without a poster if count is not met.
 */
export function pickWithPosters(items: TMDBItem[], count: number): TMDBItem[] {
  const withPoster = items.filter(i => i.poster_path)
  if (withPoster.length >= count) return withPoster.slice(0, count)
  return items.slice(0, count)
}
