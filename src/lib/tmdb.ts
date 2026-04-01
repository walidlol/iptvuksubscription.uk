// ─── TMDB API Data Layer ───
// All fetches run server-side with ISR revalidation (1 hour).
// Uses TMDB_READ_ACCESS_TOKEN (Bearer auth), never exposed to client.

const TMDB_BASE = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

// ─── Types ───

export interface TMDBMovie {
  readonly id: number;
  readonly title: string;
  readonly overview: string;
  readonly poster_path: string | null;
  readonly backdrop_path: string | null;
  readonly vote_average: number;
  readonly release_date: string;
  readonly genre_ids: readonly number[];
  readonly media_type?: "movie";
}

export interface TMDBTVShow {
  readonly id: number;
  readonly name: string;
  readonly overview: string;
  readonly poster_path: string | null;
  readonly backdrop_path: string | null;
  readonly vote_average: number;
  readonly first_air_date: string;
  readonly genre_ids: readonly number[];
  readonly media_type?: "tv";
}

export type TMDBMediaItem = TMDBMovie | TMDBTVShow;

interface TMDBPaginatedResponse<T> {
  readonly page: number;
  readonly results: readonly T[];
  readonly total_pages: number;
  readonly total_results: number;
}

/** Normalized shape used by all UI components */
export interface MediaItem {
  readonly id: number;
  readonly title: string;
  readonly posterUrl: string | null;
  readonly backdropUrl: string | null;
  readonly overview: string;
  readonly rating: number;
  readonly year: string;
  readonly mediaType: "movie" | "tv";
}

// ─── Image URL Builders ───

export function posterUrl(path: string | null): string | null {
  if (!path) return null;
  return `${IMAGE_BASE}/w500${path}`;
}

export function backdropUrl(path: string | null): string | null {
  if (!path) return null;
  return `${IMAGE_BASE}/original${path}`;
}

// ─── Normalizer ───

function isMovie(item: TMDBMediaItem): item is TMDBMovie {
  return "title" in item;
}

function normalizeItem(item: TMDBMediaItem): MediaItem {
  const movie = isMovie(item);
  const dateStr = movie ? item.release_date : item.first_air_date;

  return {
    id: item.id,
    title: movie ? item.title : item.name,
    posterUrl: posterUrl(item.poster_path),
    backdropUrl: backdropUrl(item.backdrop_path),
    overview: item.overview,
    rating: item.vote_average,
    year: dateStr ? dateStr.slice(0, 4) : "",
    mediaType: movie ? "movie" : "tv",
  };
}

// ─── Core Fetch Helper ───

async function tmdbFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!token) {
    throw new Error("TMDB_READ_ACCESS_TOKEN is not configured");
  }

  const url = new URL(`${TMDB_BASE}${endpoint}`);
  url.searchParams.set("language", "en-GB");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`TMDB ${endpoint} failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// ─── Fetch Functions ───

/** Trending movies & TV (day) — used for hero backdrops */
export async function getTrending(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBMediaItem>>(
      "/trending/all/day"
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** Pick the best hero backdrop from trending content */
export async function getHeroBackdrop(): Promise<MediaItem | null> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBMediaItem>>(
      "/trending/all/day"
    );
    const withBackdrop = data.results.find((item) => item.backdrop_path);
    return withBackdrop ? normalizeItem(withBackdrop) : null;
  } catch {
    return null;
  }
}

/** Popular movies — "Movies" row */
export async function getPopularMovies(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
      "/trending/movie/week"
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** UK Drama — genre 18, origin country GB */
export async function getUKDrama(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>(
      "/discover/tv",
      {
        with_genres: "18",
        with_origin_country: "GB",
        sort_by: "popularity.desc",
      }
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** Sports content — genre 10764 (Reality, closest to sports on TMDB) */
export async function getSportsContent(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>(
      "/discover/tv",
      {
        with_genres: "10764",
        with_origin_country: "GB",
        sort_by: "popularity.desc",
      }
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** Kids content — animated movies, PG certification */
export async function getKidsContent(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBMovie>>(
      "/discover/movie",
      {
        with_genres: "16",
        certification_country: "GB",
        "certification.lte": "PG",
        sort_by: "popularity.desc",
      }
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** International TV — trending TV worldwide */
export async function getInternationalContent(): Promise<
  readonly MediaItem[]
> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>(
      "/trending/tv/week"
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** News & Documentary — genre 10763 (News) + 99 (Documentary) */
export async function getNewsContent(): Promise<readonly MediaItem[]> {
  try {
    const data = await tmdbFetch<TMDBPaginatedResponse<TMDBTVShow>>(
      "/discover/tv",
      {
        with_genres: "10763,99",
        sort_by: "popularity.desc",
      }
    );
    return data.results.map(normalizeItem);
  } catch {
    return [];
  }
}

/** Fetch all 6 content rows in parallel */
export async function fetchAllContentRows(): Promise<
  readonly { title: string; items: readonly MediaItem[] }[]
> {
  const [sports, ukDrama, movies, kids, international, news] =
    await Promise.all([
      getSportsContent(),
      getUKDrama(),
      getPopularMovies(),
      getKidsContent(),
      getInternationalContent(),
      getNewsContent(),
    ]);

  return [
    { title: "UK Sports & Reality", items: sports },
    { title: "UK Drama", items: ukDrama },
    { title: "Trending Movies", items: movies },
    { title: "Kids & Family", items: kids },
    { title: "International TV", items: international },
    { title: "News & Documentaries", items: news },
  ];
}
