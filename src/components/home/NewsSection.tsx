import { getUKNews } from "@/lib/news";
import NewsSectionClient from "./NewsSectionClient";

export default async function NewsSection() {
  const articles = await getUKNews();

  return (
    <section
      id="uk-news"
      aria-label="UK and world news"
      className="bg-bg-primary py-14 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="px-6 lg:px-8 mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-section-h2 text-[#F2F2F7] uppercase leading-none">
              UK &amp; World News
            </h2>
            <p className="mt-2 text-sm text-[#6E6E7A]">
              Latest headlines — BBC News, Sky News, ITV News &amp; more
            </p>
          </div>
          <span className="hidden sm:flex items-center gap-2 text-xs text-[#6E6E7A] border border-[rgba(255,255,255,0.08)] rounded-full px-3 py-1">
            Live Updates
          </span>
        </div>

        {/* News cards grid (client) */}
        <NewsSectionClient articles={articles} />
      </div>
    </section>
  );
}
