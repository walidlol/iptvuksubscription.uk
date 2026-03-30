export interface NewsArticle {
  source:      { name: string }
  title:       string
  description: string | null
  url:         string
  urlToImage:  string | null
  publishedAt: string
}

export async function getIPTVNews(): Promise<NewsArticle[]> {
  if (!process.env.NEWS_API_KEY) return []
  try {
    const res = await fetch(
      'https://newsapi.org/v2/everything?q=IPTV+UK+streaming+television&language=en&sortBy=publishedAt&pageSize=6',
      {
        headers: { 'X-Api-Key': process.env.NEWS_API_KEY },
        next:    { revalidate: 21600 },
      },
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.articles as NewsArticle[]) ?? []
  } catch {
    return []
  }
}
