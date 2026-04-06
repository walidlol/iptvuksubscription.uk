// ─── NewsAPI Data Layer ───
// Free tier: 100 requests/day — 30 min revalidation = ~48 req/day. Safe.
// Images are external URLs from unknown domains → use raw <img> on the client.

const NEWS_BASE = "https://newsapi.org/v2";

// ─── Types ───

export interface NewsArticle {
  readonly title: string;
  readonly description: string | null;
  readonly url: string;
  readonly urlToImage: string | null;
  readonly source: { readonly name: string };
  readonly publishedAt: string;
}

interface NewsAPIResponse {
  readonly status: string;
  readonly totalResults: number;
  readonly articles: readonly NewsArticle[];
}

// ─── Fallback articles (shown when API unavailable or key missing) ───

export const FALLBACK_ARTICLES: readonly NewsArticle[] = [
  {
    title: "Premier League Title Race Heats Up With Three Games Remaining",
    description: "Manchester City and Arsenal are separated by just two points as the Premier League season reaches its climax with three matches left to play.",
    url: "#",
    urlToImage: null,
    source: { name: "BBC Sport" },
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "UK Government Announces New Cost of Living Support Measures",
    description: "Millions of households across the United Kingdom are set to receive additional financial support as the government unveils a new package of cost of living measures.",
    url: "#",
    urlToImage: null,
    source: { name: "BBC News" },
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "Bank of England Holds Interest Rates Amid Inflation Concerns",
    description: "The Bank of England's Monetary Policy Committee has voted to hold the base interest rate, citing ongoing uncertainty in global markets and domestic inflation pressures.",
    url: "#",
    urlToImage: null,
    source: { name: "Sky News" },
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "UK Tech Sector Sees Record Investment as London Maintains AI Hub Status",
    description: "British technology companies attracted record levels of investment in the first quarter, with artificial intelligence and fintech sectors leading the charge.",
    url: "#",
    urlToImage: null,
    source: { name: "ITV News" },
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "NHS Waiting Times Improve as New Treatment Centres Open Across England",
    description: "NHS England has reported a significant reduction in waiting times for elective procedures following the opening of new surgical hubs across the country.",
    url: "#",
    urlToImage: null,
    source: { name: "Channel 4 News" },
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
  {
    title: "England Cricket Team Named for Summer Test Series Against India",
    description: "The England and Wales Cricket Board has announced a 15-man squad for the upcoming Test series against India, with several uncapped players earning their first call-up.",
    url: "#",
    urlToImage: null,
    source: { name: "Sky Sports" },
    publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
] as const;

// ─── Fetch Helper ───

async function newsFetch(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<NewsAPIResponse> {
  const key = process.env.NEWS_API_KEY;
  if (!key) throw new Error("NEWS_API_KEY is not configured");

  const url = new URL(`${NEWS_BASE}${endpoint}`);
  url.searchParams.set("apiKey", key);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 1800 }, // 30 min
  });

  if (!res.ok) {
    throw new Error(`NewsAPI ${endpoint} failed: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<NewsAPIResponse>;
}

// ─── Fetch Functions ───

/** UK top headlines — general category, 6 articles */
export async function getUKNews(): Promise<readonly NewsArticle[]> {
  try {
    const data = await newsFetch("/top-headlines", {
      country: "gb",
      category: "general",
      pageSize: "6",
    });

    // Filter out articles with [Removed] title or null content
    const clean = data.articles.filter(
      (a) => a.title && a.title !== "[Removed]" && a.url !== "https://removed.com"
    );

    return clean.length > 0 ? clean : FALLBACK_ARTICLES;
  } catch {
    return FALLBACK_ARTICLES;
  }
}
