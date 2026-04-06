// ─── Football Data API — football-data.org v4 ───
// Premier League: competition id 2021, code "PL"
// Free tier: 10 req/min — 5 min revalidation is safe.

const FOOTBALL_BASE = "https://api.football-data.org/v4";

// ─── Types ───

export interface TeamInfo {
  readonly id: number;
  readonly name: string;
  readonly shortName?: string;
  readonly crest: string;
}

export interface MatchScore {
  readonly fullTime: {
    readonly home: number | null;
    readonly away: number | null;
  };
  readonly halfTime?: {
    readonly home: number | null;
    readonly away: number | null;
  };
}

export type MatchStatus =
  | "TIMED"
  | "SCHEDULED"
  | "IN_PLAY"
  | "PAUSED"
  | "FINISHED"
  | "SUSPENDED"
  | "POSTPONED"
  | "CANCELLED"
  | "AWARDED";

export interface Match {
  readonly id: number;
  readonly utcDate: string;
  readonly status: MatchStatus;
  readonly matchday: number;
  readonly homeTeam: TeamInfo;
  readonly awayTeam: TeamInfo;
  readonly score: MatchScore;
  readonly competition: { readonly id: number; readonly name: string };
}

interface FootballResponse {
  readonly matches: readonly Match[];
}

// ─── Fallback fixtures (shown when API is unavailable) ───
// Uses real team IDs so crests load from football-data.org CDN.

export const FALLBACK_MATCHES: readonly Match[] = [
  {
    id: 1001,
    utcDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "SCHEDULED",
    matchday: 36,
    homeTeam: { id: 57, name: "Arsenal", shortName: "Arsenal", crest: "https://crests.football-data.org/57.png" },
    awayTeam: { id: 61, name: "Chelsea", shortName: "Chelsea", crest: "https://crests.football-data.org/61.png" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
  {
    id: 1002,
    utcDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 + 7200000).toISOString(),
    status: "SCHEDULED",
    matchday: 36,
    homeTeam: { id: 64, name: "Liverpool", shortName: "Liverpool", crest: "https://crests.football-data.org/64.png" },
    awayTeam: { id: 65, name: "Manchester City", shortName: "Man City", crest: "https://crests.football-data.org/65.svg" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
  {
    id: 1003,
    utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "SCHEDULED",
    matchday: 36,
    homeTeam: { id: 73, name: "Tottenham Hotspur", shortName: "Spurs", crest: "https://crests.football-data.org/73.png" },
    awayTeam: { id: 66, name: "Manchester United", shortName: "Man Utd", crest: "https://crests.football-data.org/66.png" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
  {
    id: 1004,
    utcDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
    status: "SCHEDULED",
    matchday: 36,
    homeTeam: { id: 563, name: "West Ham United", shortName: "West Ham", crest: "https://crests.football-data.org/563.png" },
    awayTeam: { id: 397, name: "Brighton & Hove Albion", shortName: "Brighton", crest: "https://crests.football-data.org/397.png" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
  {
    id: 1005,
    utcDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "SCHEDULED",
    matchday: 37,
    homeTeam: { id: 338, name: "Leicester City", shortName: "Leicester", crest: "https://crests.football-data.org/338.png" },
    awayTeam: { id: 328, name: "Burnley FC", shortName: "Burnley", crest: "https://crests.football-data.org/328.png" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
  {
    id: 1006,
    utcDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
    status: "SCHEDULED",
    matchday: 37,
    homeTeam: { id: 402, name: "Brentford FC", shortName: "Brentford", crest: "https://crests.football-data.org/402.png" },
    awayTeam: { id: 354, name: "Crystal Palace", shortName: "Crystal Palace", crest: "https://crests.football-data.org/354.png" },
    score: { fullTime: { home: null, away: null } },
    competition: { id: 2021, name: "Premier League" },
  },
] as const;

// ─── Fetch Helper ───

async function footballFetch<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) throw new Error("FOOTBALL_DATA_API_KEY is not configured");

  const url = new URL(`${FOOTBALL_BASE}${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), {
    headers: {
      "X-Auth-Token": key,
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }, // 5 min — matches change frequently
  });

  if (!res.ok) {
    throw new Error(
      `football-data.org ${endpoint} failed: ${res.status} ${res.statusText}`
    );
  }

  return res.json() as Promise<T>;
}

// ─── Fetch Functions ───

/** Upcoming Premier League fixtures (max 8, scheduled only) */
export async function getUpcomingMatches(): Promise<readonly Match[]> {
  try {
    const data = await footballFetch<FootballResponse>(
      "/competitions/PL/matches",
      { status: "TIMED,SCHEDULED" }
    );
    return data.matches.slice(0, 8);
  } catch {
    return FALLBACK_MATCHES;
  }
}

/** Currently in-play Premier League matches */
export async function getLiveMatches(): Promise<readonly Match[]> {
  try {
    const data = await footballFetch<FootballResponse>(
      "/competitions/PL/matches",
      { status: "IN_PLAY,PAUSED" }
    );
    return data.matches;
  } catch {
    return [];
  }
}

/** Combined view: live matches first, then upcoming — used by homepage */
export async function getMatchesForHomepage(): Promise<readonly Match[]> {
  const [live, upcoming] = await Promise.all([
    getLiveMatches(),
    getUpcomingMatches(),
  ]);

  if (live.length === 0 && upcoming.length === 0) {
    return FALLBACK_MATCHES;
  }

  // Deduplicate: remove from upcoming any IDs already in live
  const liveIds = new Set(live.map((m) => m.id));
  const deduped = upcoming.filter((m) => !liveIds.has(m.id));

  return [...live, ...deduped].slice(0, 8);
}

// ─── Helpers ───

export function isLive(status: MatchStatus): boolean {
  return status === "IN_PLAY" || status === "PAUSED";
}

export function isFinished(status: MatchStatus): boolean {
  return status === "FINISHED" || status === "AWARDED";
}
