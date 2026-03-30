import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts } from '@/lib/blogPosts'
import { getTrending, backdropUrlMedium } from '@/lib/tmdb'
import { buildPageMetadata } from '@/lib/seo'
import AnimatedBackground from '@/components/AnimatedBackground'

export const revalidate = 3600

export const metadata: Metadata = buildPageMetadata({
  title: 'IPTV UK Blog — Guides, News & Reviews 2026',
  description:
    'The IPTV UK Subscription blog — setup guides, channel news, device reviews, and tips for getting the most from your UK IPTV service.',
  path: '/blog/',
  keywords: ['iptv uk blog', 'iptv uk guides', 'iptv subscription uk news'],
})

export default async function BlogIndexPage() {
  /* Fetch TMDB backdrops for post thumbnails */
  const trending = await getTrending()

  /* Pair each post with a TMDB backdrop by index */
  const postsWithImages = blogPosts.map((post, i) => ({
    ...post,
    backdropUrl: backdropUrlMedium(trending[i % trending.length]?.backdrop_path ?? null),
  }))

  const [featured, ...rest] = postsWithImages

  return (
    <main id="main-content" className="relative min-h-screen bg-[#0A0A0A]">
      <AnimatedBackground variant="default" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 text-center">
        <div className="container">
          <p className="font-ui text-xs uppercase tracking-[0.2em] text-[#E8392A] mb-4">
            IPTV UK Subscription Blog
          </p>
          <h1
            className="font-display uppercase text-[#F5F5F5] mb-6"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}
          >
            Guides, News<br />
            <span style={{ color: '#E8392A' }}>&amp; Reviews</span>
          </h1>
          <p className="font-ui text-[#9CA3AF] max-w-xl mx-auto text-lg leading-relaxed">
            Everything you need to know about IPTV UK subscriptions, device setup, sports coverage, and getting the most from your service.
          </p>
        </div>
      </section>

      <div className="h-[2px] bg-[#E8392A]" aria-hidden="true" />

      {/* Featured post */}
      {featured && (
        <section className="bg-[#111111] py-16">
          <div className="container">
            <p className="font-ui text-xs uppercase tracking-widest text-[#E8392A] mb-8">
              Featured Article
            </p>
            <Link
              href={`/blog/${featured.slug}/`}
              className="group grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Thumbnail */}
              <div
                className="relative rounded-xl overflow-hidden aspect-video"
                style={{ background: 'linear-gradient(135deg, #1A1A1A, #2A1010)' }}
              >
                {featured.backdropUrl && (
                  <Image
                    src={featured.backdropUrl}
                    alt={featured.title}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 to-transparent" />
                <span className="absolute top-4 left-4 badge badge-red">{featured.category}</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 text-[#9CA3AF] font-ui text-sm">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2
                  className="font-display uppercase text-[#F5F5F5] group-hover:text-[#E8392A] transition-colors"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', lineHeight: 1, letterSpacing: '0.02em' }}
                >
                  {featured.title}
                </h2>
                <p className="font-ui text-[#9CA3AF] leading-relaxed">{featured.excerpt}</p>
                <span className="font-ui text-sm font-semibold text-[#E8392A] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Read article →
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Post grid */}
      <section className="section bg-[#0A0A0A]">
        <div className="container">
          <h2
            className="font-display uppercase text-[#F5F5F5] mb-12"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '0.02em' }}
          >
            All Articles
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group card-lift flex flex-col rounded-xl overflow-hidden border border-white/[0.08] hover:border-[rgba(232,57,42,0.35)] bg-[#111111] transition-all duration-300"
              >
                {/* Thumbnail */}
                <div
                  className="relative aspect-video"
                  style={{ background: 'linear-gradient(135deg, #1A1A1A, #2A1010)' }}
                >
                  {post.backdropUrl && (
                    <Image
                      src={post.backdropUrl}
                      alt={post.title}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 to-transparent" />
                  <span className="absolute top-3 left-3 badge badge-muted">{post.category}</span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3 p-5 flex-1">
                  <div className="flex items-center gap-2 text-[#9CA3AF] font-ui text-xs">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display uppercase text-[#F5F5F5] group-hover:text-[#E8392A] transition-colors leading-tight"
                    style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', letterSpacing: '0.02em' }}>
                    {post.title}
                  </h3>
                  <p className="font-ui text-sm text-[#9CA3AF] leading-relaxed line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="font-ui text-xs font-semibold text-[#E8392A] mt-auto">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#111111] py-16">
        <div className="container text-center">
          <h2 className="font-display uppercase text-[#F5F5F5] mb-4"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '0.02em' }}>
            Ready to Try IPTV UK?
          </h2>
          <p className="font-ui text-[#9CA3AF] mb-8 max-w-md mx-auto">
            Start with a free 24-hour trial — no credit card required.
          </p>
          <Link href="/plans/" className="btn-red inline-flex items-center h-12 px-8 font-semibold">
            View Plans — From £9.99/mo
          </Link>
        </div>
      </section>
    </main>
  )
}
