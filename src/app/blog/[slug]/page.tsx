import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { blogPosts, getBlogPost, getAllSlugs } from '@/lib/blogPosts'
import { getTrending, backdropUrl } from '@/lib/tmdb'
import { buildPageMetadata } from '@/lib/seo'
import AnimatedBackground from '@/components/AnimatedBackground'

export const revalidate = 3600

/* ── Static params for build-time generation ── */
export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return buildPageMetadata({
    title:       post.title,
    description: post.description,
    path:        `/blog/${slug}/`,
    keywords:    ['iptv uk', 'iptv subscription uk', post.category.toLowerCase()],
    type:        'article',
  })
}

/* ── Page ── */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  /* TMDB backdrop for hero */
  const trending = await getTrending()
  const heroBackdrop = backdropUrl(trending[0]?.backdrop_path ?? null)

  /* Related posts — up to 3 from same category, else any */
  const sameCategory = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3)
  const others       = blogPosts.filter(p => p.slug !== slug && p.category !== post.category).slice(0, 3 - sameCategory.length)
  const related      = [...sameCategory, ...others].slice(0, 3)

  /* Article JSON-LD */
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'IPTV UK Subscription',
      url: 'https://iptvuksubscription.uk',
    },
    publisher: {
      '@type': 'Organization',
      name: 'IPTV UK Subscription',
      url: 'https://iptvuksubscription.uk',
      logo: {
        '@type': 'ImageObject',
        url: 'https://iptvuksubscription.uk/icon.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://iptvuksubscription.uk/blog/${slug}/`,
    },
  }

  const faqSchema = post.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <main id="main-content" className="relative min-h-screen bg-[#0A0A0A]">
        <AnimatedBackground variant="default" />

        {/* Hero */}
        <section className="relative pt-28 pb-16">
          {heroBackdrop && (
            <div className="absolute inset-0 z-0">
              <Image
                src={heroBackdrop}
                alt={post.title}
                fill
                className="object-cover opacity-15"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-[#0A0A0A]/80 to-[#0A0A0A]" />
            </div>
          )}

          <div className="container relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-ui text-xs text-[#9CA3AF] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#E8392A] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog/" className="hover:text-[#E8392A] transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-[#F5F5F5]">{post.category}</span>
            </nav>

            <span className="badge badge-red mb-4 inline-block">{post.category}</span>

            <h1
              className="font-display uppercase text-[#F5F5F5] mb-6 max-w-4xl"
              style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', lineHeight: 0.95, letterSpacing: '0.02em' }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 font-ui text-sm text-[#9CA3AF]">
              <span>Published: {post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <span>By <strong className="text-[#F5F5F5]">IPTV UK Subscription</strong></span>
            </div>
          </div>
        </section>

        <div className="h-[2px] bg-[#E8392A]" aria-hidden="true" />

        {/* Content + Sidebar */}
        <section className="section bg-[#0A0A0A]">
          <div className="container">
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">

              {/* Article body */}
              <article>
                <p className="font-ui text-lg text-[#9CA3AF] leading-relaxed mb-10 border-l-4 border-[#E8392A] pl-5">
                  {post.excerpt}
                </p>

                <div
                  className="prose-iptv"
                  dangerouslySetInnerHTML={{ __html: post.body }}
                />

                {/* FAQs */}
                {post.faqs.length > 0 && (
                  <div className="mt-16">
                    <h2
                      className="font-display uppercase text-[#F5F5F5] mb-8"
                      style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '0.02em' }}
                    >
                      Frequently Asked Questions
                    </h2>
                    <div className="flex flex-col gap-4">
                      {post.faqs.map((faq, i) => (
                        <details
                          key={i}
                          className="group border border-white/[0.08] rounded-xl overflow-hidden"
                        >
                          <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer font-ui font-semibold text-[#F5F5F5] hover:text-[#E8392A] transition-colors list-none">
                            {faq.question}
                            <span className="text-[#E8392A] text-xl font-light flex-none">+</span>
                          </summary>
                          <div className="px-6 pb-5 pt-0 font-ui text-[#9CA3AF] leading-relaxed border-t border-white/[0.06]">
                            {faq.answer}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                )}

                {/* Internal links */}
                <div className="mt-12 p-6 rounded-xl border border-[rgba(232,57,42,0.25)] bg-[rgba(232,57,42,0.04)]">
                  <p className="font-ui text-sm text-[#9CA3AF] mb-4">
                    Looking for the best <Link href="/" className="text-[#E8392A] hover:underline">IPTV UK subscription</Link>?
                    View our <Link href="/plans/" className="text-[#E8392A] hover:underline">IPTV subscription UK plans</Link> starting
                    from £9.99/month, or browse the full <Link href="/channels/" className="text-[#E8392A] hover:underline">IPTV UK channel list</Link>.
                  </p>
                  <Link href="/plans/" className="btn-red inline-flex items-center h-10 px-6 text-sm font-semibold">
                    View Plans →
                  </Link>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
                {/* CTA card */}
                <div className="rounded-xl border border-[rgba(232,57,42,0.3)] bg-[#111111] p-6">
                  <p className="font-display uppercase text-[#F5F5F5] mb-2 text-xl" style={{ letterSpacing: '0.02em' }}>
                    Try IPTV UK Free
                  </p>
                  <p className="font-ui text-sm text-[#9CA3AF] mb-5 leading-relaxed">
                    24-hour free trial. All channels. No credit card.
                  </p>
                  <Link href="/free-trial/" className="btn-red flex items-center justify-center h-10 px-4 text-sm font-semibold w-full mb-3">
                    Get Free Trial
                  </Link>
                  <Link href="/plans/" className="flex items-center justify-center h-10 px-4 text-sm font-ui text-[#9CA3AF] border border-white/[0.12] rounded hover:border-[#E8392A] hover:text-[#F5F5F5] transition-colors w-full">
                    View Plans — From £9.99
                  </Link>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="rounded-xl border border-white/[0.08] bg-[#111111] p-6">
                    <p className="font-ui text-xs uppercase tracking-widest text-[#9CA3AF] mb-4">
                      Related Articles
                    </p>
                    <div className="flex flex-col gap-4">
                      {related.map(p => (
                        <Link
                          key={p.slug}
                          href={`/blog/${p.slug}/`}
                          className="group flex flex-col gap-1"
                        >
                          <span className="font-ui text-xs text-[#9CA3AF]">{p.category}</span>
                          <span className="font-ui text-sm text-[#F5F5F5] group-hover:text-[#E8392A] transition-colors leading-snug">
                            {p.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="bg-[#111111] py-12">
          <div className="container flex items-center justify-between flex-wrap gap-4">
            <Link href="/blog/" className="font-ui text-sm text-[#9CA3AF] hover:text-[#E8392A] transition-colors">
              ← Back to Blog
            </Link>
            <Link href="/plans/" className="btn-red inline-flex items-center h-10 px-6 text-sm font-semibold">
              Get IPTV UK Subscription
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
