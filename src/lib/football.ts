const BASE    = 'https://api.football-data.org/v4'
const headers = { 'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY ?? '' }

export interface FootballMatch {
  id:          number
  utcDate:     string
  status:      string  // SCHEDULED | LIVE | IN_PLAY | PAUSED | FINISHED | POSTPONED
  homeTeam:    { id: number; name: string; crest: string }
  awayTeam:    { id: number; name: string; crest: string }
  score:       { fullTime: { home: number | null; away: number | null } }
  competition: { id: number; name: string }
}

export async function getTodaysMatches(): Promise<FootballMatch[]> {
  if (!process.env.FOOTBALL_DATA_API_KEY) return []
  const today = new Date().toISOString().split('T')[0]
  try {
    const res = await fetch(
      `${BASE}/competitions/2021/matches?dateFrom=${today}&dateTo=${today}`,
      { headers, next: { revalidate: 3600 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.matches as FootballMatch[]) ?? []
  } catch {
    return []
  }
}

export async function getUpcomingMatches(): Promise<FootballMatch[]> {
  if (!process.env.FOOTBALL_DATA_API_KEY) return []
  const today    = new Date().toISOString().split('T')[0]
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  try {
    const res = await fetch(
      `${BASE}/competitions/2021/matches?dateFrom=${today}&dateTo=${nextWeek}&status=SCHEDULED`,
      { headers, next: { revalidate: 3600 } },
    )
    if (!res.ok) return []
    const data = await res.json()
    return ((data.matches as FootballMatch[]) ?? []).slice(0, 5)
  } catch {
    return []
  }
}
