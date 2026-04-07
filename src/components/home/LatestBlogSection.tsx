import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";

// Server component — rendered statically, no client JS needed

export default function LatestBlogSection() {
  const posts = BLOG_POSTS.slice(0, 6);

  return (
    <section className="bg-bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-text-muted mb-2">
              IPTV UK Guides &amp; News
            </p>
            <h2 className="font-heading text-section-h2 uppercase text-text-primary leading-none">
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="shrink-0 flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
          >
            View all articles
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Horizontal scroll row */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar">
          {posts.map((post) => {
            const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group shrink-0 snap-start w-[300px] sm:w-[340px] flex flex-col rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.14)] transition-all duration-300 overflow-hidden"
              >
                {/* Gradient placeholder header */}
                <div className="h-[140px] bg-gradient-to-br from-[rgba(24,57,73,0.35)] to-[rgba(8,9,12,0.8)] flex items-end p-4 relative overflow-hidden">
                  {/* Decorative background word */}
                  <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading text-[5rem] leading-none text-white/[0.04] select-none whitespace-nowrap"
                    aria-hidden
                  >
                    IPTV
                  </span>
                  <span className="relative z-10 inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-widest uppercase text-text-muted bg-[rgba(0,0,0,0.4)] px-2.5 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
                    <Clock size={9} /> {post.readTime}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-xs text-text-muted mb-2">{formattedDate}</p>
                  <h3 className="text-sm font-semibold text-text-primary leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-text-muted group-hover:text-text-secondary transition-colors">
                    Read article
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
