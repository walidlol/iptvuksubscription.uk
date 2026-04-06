"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Match, MatchStatus } from "@/lib/football";
import { isLive, isFinished } from "@/lib/football";

// ─── Channel Pills ───

const CHANNELS = ["Sky Sports", "TNT Sports", "BT Sport", "BBC Sport"] as const;

// ─── Time formatter ───

function formatKickoff(utcDate: string): string {
  const date = new Date(utcDate);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/London",
  });
}

// ─── Team Crest ───

function TeamCrest({
  crest,
  name,
  size = 40,
}: {
  crest: string;
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (!crest) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full bg-[rgba(255,255,255,0.10)] border border-[rgba(255,255,255,0.15)] flex items-center justify-center shrink-0"
      >
        <span className="font-heading text-xs text-white leading-none">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div style={{ width: size, height: size }} className="relative shrink-0">
      <Image
        src={crest}
        alt={`${name} crest`}
        fill
        className="object-contain"
        sizes={`${size}px`}
        unoptimized
      />
    </div>
  );
}

// ─── Status Badge ───

function StatusBadge({ status }: { status: MatchStatus }) {
  if (isLive(status)) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="live-dot" aria-hidden />
        <span className="text-[11px] font-semibold text-[#E8392A] uppercase tracking-widest">
          Live
        </span>
      </div>
    );
  }
  if (isFinished(status)) {
    return (
      <span className="text-[11px] font-medium text-[#6E6E7A] uppercase tracking-wider">
        Full Time
      </span>
    );
  }
  if (status === "POSTPONED") {
    return (
      <span className="text-[11px] font-medium text-[#6E6E7A] uppercase tracking-wider">
        Postponed
      </span>
    );
  }
  return null;
}

// ─── Match Card ───

function MatchCard({ match }: { match: Match }) {
  const live = isLive(match.status);
  const finished = isFinished(match.status);
  const showScore = live || finished;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={[
        "relative shrink-0 w-[260px] rounded-glass p-5",
        "bg-[rgba(255,255,255,0.06)] backdrop-blur-glass",
        "border border-[rgba(255,255,255,0.12)]",
        "shadow-glass will-change-transform",
        live ? "border-[rgba(232,57,42,0.30)]" : "",
      ].join(" ")}
    >
      {/* Matchday + competition */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] font-medium text-[#6E6E7A] uppercase tracking-wider">
          {match.competition.name} · MD{match.matchday}
        </span>
        <StatusBadge status={match.status} />
      </div>

      {/* Teams row */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <TeamCrest crest={match.homeTeam.crest} name={match.homeTeam.name} size={36} />
          <span className="text-xs font-medium text-[#F2F2F7] text-center truncate w-full leading-tight">
            {match.homeTeam.shortName ?? match.homeTeam.name}
          </span>
        </div>

        {/* Score / vs */}
        <div className="flex flex-col items-center gap-0.5 shrink-0 w-14">
          {showScore ? (
            <span className="font-heading text-2xl text-[#F2F2F7] leading-none tracking-widest">
              {match.score.fullTime.home ?? 0}
              <span className="text-[#6E6E7A] mx-1">–</span>
              {match.score.fullTime.away ?? 0}
            </span>
          ) : (
            <span className="font-heading text-lg text-[#6E6E7A] leading-none">
              vs
            </span>
          )}
        </div>

        {/* Away */}
        <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
          <TeamCrest crest={match.awayTeam.crest} name={match.awayTeam.name} size={36} />
          <span className="text-xs font-medium text-[#F2F2F7] text-center truncate w-full leading-tight">
            {match.awayTeam.shortName ?? match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Kickoff time (scheduled only) */}
      {!showScore && match.status !== "POSTPONED" && (
        <p className="mt-3 text-center text-[11px] text-[#6E6E7A]">
          {formatKickoff(match.utcDate)}
        </p>
      )}
    </motion.div>
  );
}

// ─── Main Client Component ───

interface LiveSportsClientProps {
  readonly matches: readonly Match[];
}

export default function LiveSportsClient({ matches }: LiveSportsClientProps) {
  return (
    <div>
      {/* Horizontal scroll row */}
      <div className="overflow-x-auto hide-scrollbar">
        <motion.div
          className="flex gap-4 pb-2 px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </motion.div>
      </div>

      {/* Channel pills */}
      <div className="mt-6 px-6 lg:px-8 flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#6E6E7A] mr-1">Watch on:</span>
        {CHANNELS.map((ch) => (
          <span
            key={ch}
            className="px-3 py-1 rounded-full text-xs font-medium text-[#B8B8C0] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)]"
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
