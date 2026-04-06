"use client";

import { useState, useMemo } from "react";
import { Search, Tv, Newspaper, Film, Baby, Globe, Trophy } from "lucide-react";

// ─── Channel data ─────────────────────────────────────────────────────────────

interface Channel {
  readonly name: string;
  readonly live?: boolean;
}

interface Category {
  readonly id: string;
  readonly label: string;
  readonly Icon: React.ElementType;
  readonly channels: readonly Channel[];
}

const CATEGORIES: readonly Category[] = [
  {
    id: "sports",
    label: "UK Sports",
    Icon: Trophy,
    channels: [
      { name: "Sky Sports Main Event", live: true },
      { name: "Sky Sports Premier League", live: true },
      { name: "Sky Sports Football", live: true },
      { name: "Sky Sports F1", live: true },
      { name: "Sky Sports Cricket" },
      { name: "Sky Sports Golf" },
      { name: "Sky Sports News" },
      { name: "TNT Sports 1", live: true },
      { name: "TNT Sports 2", live: true },
      { name: "TNT Sports 3" },
      { name: "TNT Sports 4" },
      { name: "BT Sport 1" },
      { name: "BT Sport 2" },
      { name: "BT Sport 3" },
      { name: "BBC Sport" },
      { name: "ITV Sport" },
      { name: "Channel 4 Sport" },
      { name: "Eurosport 1" },
      { name: "Eurosport 2" },
      { name: "DAZN" },
      { name: "Premier Sports 1" },
      { name: "Premier Sports 2" },
    ],
  },
  {
    id: "entertainment",
    label: "UK Entertainment",
    Icon: Tv,
    channels: [
      { name: "BBC One" },
      { name: "BBC Two" },
      { name: "BBC Three" },
      { name: "BBC Four" },
      { name: "ITV" },
      { name: "ITV2" },
      { name: "ITV3" },
      { name: "ITV4" },
      { name: "Channel 4" },
      { name: "Channel 5" },
      { name: "5Star" },
      { name: "5USA" },
      { name: "E4" },
      { name: "More4" },
      { name: "Sky One" },
      { name: "Sky Atlantic" },
      { name: "Sky Max" },
      { name: "Sky Comedy" },
      { name: "Comedy Central" },
      { name: "Dave" },
      { name: "Really" },
      { name: "Gold" },
      { name: "Alibi" },
      { name: "W" },
      { name: "Drama" },
      { name: "Crime & Investigation" },
      { name: "Discovery Channel" },
      { name: "History Channel" },
    ],
  },
  {
    id: "news",
    label: "UK & World News",
    Icon: Newspaper,
    channels: [
      { name: "BBC News", live: true },
      { name: "Sky News", live: true },
      { name: "GB News", live: true },
      { name: "ITV News" },
      { name: "TalkTV" },
      { name: "CNN International", live: true },
      { name: "Al Jazeera English", live: true },
      { name: "BBC World News" },
      { name: "France 24 English" },
      { name: "DW English" },
      { name: "Bloomberg TV", live: true },
      { name: "CNBC" },
      { name: "Euronews" },
      { name: "RT News" },
      { name: "Times Radio" },
    ],
  },
  {
    id: "movies",
    label: "Movies",
    Icon: Film,
    channels: [
      { name: "Sky Cinema Premiere" },
      { name: "Sky Cinema Action" },
      { name: "Sky Cinema Sci-Fi/Horror" },
      { name: "Sky Cinema Select" },
      { name: "Sky Cinema Family" },
      { name: "Sky Cinema Comedy" },
      { name: "Sky Cinema Thriller" },
      { name: "Film4" },
      { name: "TCM" },
      { name: "Paramount Network" },
      { name: "Sony Movies" },
      { name: "Sony Movies Classic" },
      { name: "MGM HD" },
      { name: "Horror Channel" },
      { name: "True Movies" },
      { name: "Great! Movies" },
    ],
  },
  {
    id: "kids",
    label: "Kids",
    Icon: Baby,
    channels: [
      { name: "CBeebies" },
      { name: "CBBC" },
      { name: "Cartoon Network" },
      { name: "Nickelodeon" },
      { name: "Nick Jr" },
      { name: "Nicktoons" },
      { name: "Disney Channel" },
      { name: "Disney Junior" },
      { name: "Disney XD" },
      { name: "Boomerang" },
      { name: "Tiny Pop" },
      { name: "Baby TV" },
      { name: "POP" },
      { name: "Milkshake!" },
      { name: "CITV" },
    ],
  },
  {
    id: "international",
    label: "International",
    Icon: Globe,
    channels: [
      { name: "TV5Monde (French)" },
      { name: "France 2" },
      { name: "TF1 (French)" },
      { name: "RAI 1 (Italian)" },
      { name: "RAI 2 (Italian)" },
      { name: "TVE (Spanish)" },
      { name: "Antena 3 (Spanish)" },
      { name: "ZDF (German)" },
      { name: "Das Erste (German)" },
      { name: "TVP (Polish)" },
      { name: "NHK World (Japanese)" },
      { name: "CCTV News (Chinese)" },
      { name: "Al Arabiya (Arabic)" },
      { name: "MBC (Arabic)" },
      { name: "Zee TV (Hindi)" },
      { name: "Star Plus (Hindi)" },
      { name: "Colors TV (Hindi)" },
      { name: "Sun TV (Tamil)" },
      { name: "Asianet (Malayalam)" },
      { name: "beIN Sports (Arabic)" },
    ],
  },
];

// Total channel count across all categories
const TOTAL_CHANNELS = CATEGORIES.reduce(
  (sum, cat) => sum + cat.channels.length,
  0
);

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChannelPill({ channel }: { readonly channel: Channel }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] text-sm text-text-secondary hover:bg-[rgba(255,255,255,0.10)] hover:text-text-primary transition-colors">
      {channel.live && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-live animate-pulse-live shrink-0"
          aria-label="Live"
        />
      )}
      {channel.name}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChannelsContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return CATEGORIES.map((cat) => ({
      ...cat,
      channels: cat.channels.filter((ch) =>
        ch.name.toLowerCase().includes(q)
      ),
    })).filter(
      (cat) =>
        (!activeCategory || cat.id === activeCategory) &&
        cat.channels.length > 0
    );
  }, [query, activeCategory]);

  const totalFiltered = filtered.reduce(
    (sum, cat) => sum + cat.channels.length,
    0
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* ── Search + category filter bar ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        {/* Search input */}
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${TOTAL_CHANNELS}+ channels...`}
            className={[
              "w-full pl-10 pr-4 py-3",
              "bg-[rgba(255,255,255,0.06)]",
              "border border-[rgba(255,255,255,0.12)]",
              "rounded-xl",
              "text-text-primary placeholder:text-text-muted",
              "backdrop-blur-sm",
              "focus:outline-none focus:border-[rgba(255,255,255,0.30)] focus:bg-[rgba(255,255,255,0.09)]",
              "transition-colors duration-200",
            ].join(" ")}
          />
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors border ${
              activeCategory === null
                ? "bg-[rgba(255,255,255,0.14)] border-[rgba(255,255,255,0.30)] text-text-primary"
                : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-muted hover:text-text-secondary"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setActiveCategory(activeCategory === cat.id ? null : cat.id)
              }
              className={`px-4 py-2 rounded-full text-sm transition-colors border ${
                activeCategory === cat.id
                  ? "bg-[rgba(255,255,255,0.14)] border-[rgba(255,255,255,0.30)] text-text-primary"
                  : "bg-[rgba(255,255,255,0.04)] border-[rgba(255,255,255,0.08)] text-text-muted hover:text-text-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count when searching ── */}
      {query && (
        <p className="text-sm text-text-muted mb-6">
          {totalFiltered} channel{totalFiltered !== 1 ? "s" : ""} found for &ldquo;{query}&rdquo;
        </p>
      )}

      {/* ── Channel categories ── */}
      {filtered.length === 0 ? (
        <p className="text-text-muted text-center py-16">
          No channels found matching &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="space-y-12">
          {filtered.map((cat) => (
            <section key={cat.id}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)]">
                  <cat.Icon size={18} className="text-text-secondary" />
                </div>
                <h2 className="font-heading text-xl tracking-widest text-text-primary uppercase">
                  {cat.label}
                </h2>
                <span className="text-xs text-text-muted">
                  {cat.channels.length} channels
                </span>
              </div>

              {/* Channel pills */}
              <div className="flex flex-wrap gap-2">
                {cat.channels.map((ch) => (
                  <ChannelPill key={ch.name} channel={ch} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
