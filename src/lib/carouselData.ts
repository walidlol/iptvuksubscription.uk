/**
 * Shared data types and default rows for ContentCarousel.
 * Imported by both the client component and the server wrapper —
 * must NOT have 'use client' or any browser APIs.
 */

export interface ContentCard {
  id:        string
  label:     string
  gradient:  string
  posterUrl?: string | null
}

export interface ContentRow {
  id:    string
  title: string
  emoji: string
  cards: ContentCard[]
}

export const DEFAULT_ROWS: ContentRow[] = [
  {
    id:    'sports',
    title: 'UK Sports',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    cards: [
      { id: 'premier-league', label: 'Premier League',   gradient: 'from-blue-900 via-blue-950 to-black'    },
      { id: 'sky-sports',     label: 'Sky Sports',       gradient: 'from-sky-900 via-sky-950 to-black'      },
      { id: 'tnt-sports',     label: 'TNT Sports',       gradient: 'from-indigo-900 via-indigo-950 to-black' },
      { id: 'f1',             label: 'Formula 1',        gradient: 'from-red-900 via-red-950 to-black'      },
      { id: 'cricket',        label: 'Cricket',          gradient: 'from-stone-900 via-stone-950 to-black'  },
      { id: 'boxing',         label: 'Boxing',           gradient: 'from-gray-900 via-gray-950 to-black'    },
      { id: 'golf',           label: 'Golf',             gradient: 'from-emerald-900 via-emerald-950 to-black' },
      { id: 'rugby',          label: 'Rugby',            gradient: 'from-stone-900 via-stone-950 to-black'  },
    ],
  },
  {
    id:    'movies',
    title: 'Movies & Film',
    emoji: '🎬',
    cards: [
      { id: 'movies',      label: '100K+ Movies', gradient: 'from-purple-900 via-purple-950 to-black' },
      { id: 'action',      label: 'Action',       gradient: 'from-orange-900 via-orange-950 to-black' },
      { id: 'thriller',    label: 'Thriller',     gradient: 'from-zinc-900 via-zinc-950 to-black'    },
      { id: 'comedy',      label: 'Comedy',       gradient: 'from-yellow-900 via-yellow-950 to-black' },
      { id: 'horror',      label: 'Horror',       gradient: 'from-red-950 via-red-950 to-black'      },
      { id: 'romance',     label: 'Romance',      gradient: 'from-pink-900 via-pink-950 to-black'    },
      { id: 'documentary', label: 'Documentary',  gradient: 'from-teal-900 via-teal-950 to-black'    },
      { id: 'animation',   label: 'Animation',    gradient: 'from-violet-900 via-violet-950 to-black' },
    ],
  },
  {
    id:    'drama',
    title: 'UK Drama',
    emoji: '📺',
    cards: [
      { id: 'bbc-drama',    label: 'BBC Drama',    gradient: 'from-red-900 via-red-950 to-black'      },
      { id: 'itv',          label: 'ITV',          gradient: 'from-blue-800 via-blue-950 to-black'    },
      { id: 'sky-atlantic', label: 'Sky Atlantic',  gradient: 'from-slate-800 via-slate-950 to-black'  },
      { id: 'channel-4',    label: 'Channel 4',    gradient: 'from-gray-800 via-gray-950 to-black'    },
      { id: 'soaps',        label: 'Soaps',        gradient: 'from-amber-900 via-amber-950 to-black'  },
      { id: 'crime',        label: 'Crime',        gradient: 'from-stone-800 via-stone-950 to-black'  },
      { id: 'sci-fi',       label: 'Sci-Fi',       gradient: 'from-cyan-900 via-cyan-950 to-black'    },
      { id: 'reality',      label: 'Reality TV',   gradient: 'from-fuchsia-900 via-fuchsia-950 to-black' },
    ],
  },
  {
    id:    'international',
    title: 'International',
    emoji: '🌍',
    cards: [
      { id: 'arabic',    label: 'Arabic Channels',      gradient: 'from-stone-900 via-stone-950 to-black'  },
      { id: 'indian',    label: 'Indian & South Asian', gradient: 'from-orange-900 via-orange-950 to-black' },
      { id: 'french',    label: 'French',               gradient: 'from-blue-900 via-blue-950 to-black'    },
      { id: 'spanish',   label: 'Spanish',              gradient: 'from-red-900 via-red-950 to-black'      },
      { id: 'german',    label: 'German',               gradient: 'from-yellow-900 via-yellow-950 to-black' },
      { id: 'turkish',   label: 'Turkish',              gradient: 'from-red-800 via-red-950 to-black'      },
      { id: 'polish',    label: 'Polish',               gradient: 'from-rose-900 via-rose-950 to-black'    },
      { id: 'usa',       label: 'USA Channels',         gradient: 'from-sky-900 via-sky-950 to-black'      },
    ],
  },
]
