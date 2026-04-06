"use client";

import { motion } from "framer-motion";
import type { NewsArticle } from "@/lib/news";

// ─── Relative time formatter ───

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

// ─── News Card ───

function NewsCard({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  const isExternal = article.url !== "#";

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.07, 0.35),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ y: -3 }}
      className={[
        "group flex flex-col overflow-hidden rounded-glass",
        "bg-[rgba(255,255,255,0.05)] backdrop-blur-glass",
        "border border-[rgba(255,255,255,0.10)]",
        "shadow-glass will-change-transform",
        "transition-colors duration-200",
        "hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)]",
      ].join(" ")}
    >
      {/* Thumbnail — raw <img> because NewsAPI images are from unpredictable domains */}
      <div className="relative w-full aspect-video overflow-hidden bg-[rgba(255,255,255,0.04)]">
        {article.urlToImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.urlToImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(0,0,0,0.1)] flex items-center justify-center">
            <span className="font-heading text-xs text-[#6E6E7A] uppercase tracking-widest">
              {article.source.name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <p className="text-sm font-medium text-[#F2F2F7] leading-snug line-clamp-3 flex-1">
          {article.title}
        </p>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-[#6E6E7A] font-medium">
            {article.source.name}
          </span>
          <span className="text-xs text-[#6E6E7A]">
            {timeAgo(article.publishedAt)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={article.title}
      >
        {content}
      </a>
    );
  }

  return <div>{content}</div>;
}

// ─── Main Client Component ───

interface NewsSectionClientProps {
  readonly articles: readonly NewsArticle[];
}

export default function NewsSectionClient({ articles }: NewsSectionClientProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 lg:px-8">
      {articles.map((article, i) => (
        <NewsCard key={article.url + i} article={article} index={i} />
      ))}
    </div>
  );
}
