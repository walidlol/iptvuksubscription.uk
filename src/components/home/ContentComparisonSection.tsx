// Server component — static content, no interactivity needed

import Link from "next/link";

const ROWS = [
  {
    feature: "Live Channels",
    legacy: "~300",
    ours: "30,000+",
  },
  {
    feature: "4K VOD Library",
    legacy: "~5,000 titles",
    ours: "100,000+ titles",
  },
  {
    feature: "4K UHD Streams",
    legacy: "Limited",
    ours: "Included — all plans",
  },
  {
    feature: "Sports Coverage",
    legacy: "Add-on required",
    ours: "All sports included",
  },
  {
    feature: "Monthly Cost",
    legacy: "£50–£120+",
    ours: "From £9.99/month",
  },
  {
    feature: "Contracts",
    legacy: "12–24 months",
    ours: "No contract. Cancel anytime.",
  },
] as const;

const STATS = [
  { value: "30K+", label: "Live Channels from 50+ Countries" },
  { value: "100K+", label: "On-Demand Films and Series" },
  { value: "4K UHD", label: "Crystal-Clear Live Sports" },
  { value: "99.9%", label: "Network Uptime Guarantee" },
] as const;

const CHANNELS = [
  "Sky Sports 1–9, Sky Sports Main Event, Sky Sports F1",
  "TNT Sports 1–4, Premier Sports 1 & 2",
  "BBC One, BBC Two, ITV1, ITV2, Channel 4, Channel 5",
  "Sky Cinema, Sky Atlantic, Disney+, Netflix originals mirrored",
  "beIN Sports, ESPN, DAZN, Eurosport 1 & 2",
] as const;

export default function ContentComparisonSection() {
  return (
    <section className="bg-bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <p className="text-center text-xs font-semibold tracking-[0.25em] uppercase text-text-muted mb-5">
          Content Library &mdash; Premium UK Streaming
        </p>

        {/* Big heading */}
        <h2
          className="font-heading text-center leading-none uppercase text-text-primary mb-2"
          style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", letterSpacing: "0.02em" }}
        >
          Like &hellip; A Lot of Content.
        </h2>

        {/* Sub-heading */}
        <p
          className="font-heading text-center uppercase leading-none mb-6"
          style={{
            fontSize: "clamp(1.6rem, 4vw, 3rem)",
            letterSpacing: "0.02em",
            background: "linear-gradient(90deg, #B8B8C0 0%, #F2F2F7 50%, #B8B8C0 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          One Subscription. Total Coverage.
        </p>

        {/* Description */}
        <p className="text-center text-text-secondary text-sm max-w-xl mx-auto mb-12 leading-relaxed">
          The most complete <strong className="text-text-primary">Best British IPTV Service</strong> available
          in 2026. Sky Sports, TNT Sports, BBC, ITV, Channel 4 — all in flawless 4K UHD, every day.{" "}
          <Link
            href="/pricing"
            className="text-text-primary underline underline-offset-2 hover:text-white transition-colors"
          >
            Explore the full content library →
          </Link>
        </p>

        {/* Comparison Table */}
        <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] mb-12">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-[rgba(255,255,255,0.08)]">
            <div className="px-5 py-3 bg-[rgba(255,255,255,0.02)]">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted">Feature</span>
            </div>
            <div className="px-5 py-3 bg-[rgba(255,255,255,0.02)] border-l border-[rgba(255,255,255,0.06)]">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-muted">Standard Fibre TV</span>
            </div>
            <div className="px-5 py-3 bg-[rgba(255,255,255,0.05)] border-l border-[rgba(255,255,255,0.12)]">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-text-primary">Our 2026 Digital Service</span>
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[rgba(255,255,255,0.05)] last:border-b-0 ${
                i % 2 === 0 ? "bg-[rgba(255,255,255,0.01)]" : ""
              }`}
            >
              <div className="px-5 py-4">
                <span className="text-sm text-text-secondary font-medium">{row.feature}</span>
              </div>
              <div className="px-5 py-4 border-l border-[rgba(255,255,255,0.04)]">
                <span className="text-sm text-text-muted">{row.legacy}</span>
              </div>
              <div className="px-5 py-4 border-l border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.03)]">
                <span className="text-sm text-text-primary font-semibold">{row.ours}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {STATS.map(({ value, label }) => (
            <div
              key={value}
              className="flex flex-col items-center justify-center text-center p-5 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]"
            >
              <span className="font-heading text-2xl sm:text-3xl text-text-primary leading-none tracking-wide mb-1">
                {value}
              </span>
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-text-muted leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Channels included */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-6 sm:p-8">
          <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted mb-5 text-center">
            Channels Included From Day One
          </p>
          <ol className="space-y-3">
            {CHANNELS.map((ch, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="shrink-0 w-5 h-5 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.10)] flex items-center justify-center text-[10px] text-text-muted font-semibold mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-text-secondary leading-relaxed">{ch}</span>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
