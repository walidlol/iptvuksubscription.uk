import { getMatchesForHomepage } from "@/lib/football";
import LiveSportsClient from "./LiveSportsClient";

export default async function LiveSports() {
  const matches = await getMatchesForHomepage();

  return (
    <section
      id="live-sports"
      aria-label="Live sports and Premier League fixtures"
      className="bg-bg-primary py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="px-6 lg:px-8 mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-section-h2 text-[#F2F2F7] uppercase leading-none">
              Live Sports
            </h2>
            <p className="mt-2 text-sm text-[#6E6E7A]">
              Premier League fixtures — live scores &amp; upcoming matches
            </p>
          </div>
          <span className="hidden sm:block text-xs text-[#6E6E7A] border border-[rgba(255,255,255,0.08)] rounded-full px-3 py-1">
            Premier League
          </span>
        </div>

        {/* Match cards + channel pills (client) */}
        <LiveSportsClient matches={matches} />
      </div>
    </section>
  );
}
