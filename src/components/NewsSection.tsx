import Link from 'next/link'
import Image from 'next/image'
import { getIPTVNews, type NewsArticle } from '@/lib/news'
import { ExternalLink } from 'lucide-react'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group flex flex-col rounded-xl overflow-hidden border border-white/[0.06] hover:border-[rgba(232,57,42,0.25)] bg-[#111111] transition-colors card-lift">
      {/* Thumbnail */}
      <div className="relative h-40 bg-[#1A1A1A]">
        {article.urlToImage && (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            className="object-cover opacity-70 group-hover:opacity-90 transition-opacity"
            sizes="(max-width: 768px) 100vw, 33vw"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 to-transparent" />
        <span className="absolute bottom-2 left-3 font-ui text-[9px] text-[#9CA3AF] uppercase tracking-widest">
          {article.source.name}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <h3 className="font-ui text-sm font-semibold text-[#F5F5F5] leading-snug line-clamp-2 group-hover:text-[#E8392A] transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="font-ui text-xs text-[#9CA3AF] leading-relaxed line-clamp-2 flex-1">
            {article.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.06]">
          <span className="font-ui text-[10px] text-[#9CA3AF]">{formatDate(article.publishedAt)}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 font-ui text-[10px] text-[#E8392A] hover:underline"
            aria-label={`Read full article: ${article.title}`}
          >
            Read <ExternalLink size={9} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default async function NewsSection() {
  const articles = await getIPTVNews()
  if (articles.length === 0) return null

  return (
    <section className="section bg-[#111111]" aria-labelledby="news-heading">
      <div className="container">
        <div className="mb-10" data-reveal>
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#E8392A] mb-2">Latest News</p>
          <h2
            id="news-heading"
            className="font-display uppercase text-[#F5F5F5]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '0.02em', lineHeight: 1 }}
          >
            UK Streaming News
          </h2>
          <p className="font-ui text-[#9CA3AF] mt-2 text-sm">
            The latest news on UK IPTV, streaming, and television.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((a, i) => (
            <NewsCard key={i} article={a} />
          ))}
        </div>
      </div>
    </section>
  )
}
