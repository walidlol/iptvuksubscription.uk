import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock } from "lucide-react";
import CinematicShapes from "@/components/ui/CinematicShapes";
import { BLOG_POSTS, getPostBySlug, SITE_URL } from "@/data/blogPosts";
import { buildArticleSchema, buildBreadcrumbSchema } from "@/lib/schema";

interface Props {
  readonly params: { slug: string };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/opengraph-image"],
    },
  };
}

function buildPostSchema(slug: string) {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbSchema([
        { name: "Home", url: SITE_URL },
        { name: "Blog", url: `${SITE_URL}/blog` },
        { name: post.title, url },
      ]),
      buildArticleSchema({
        title: post.title,
        description: post.description,
        url,
        datePublished: post.date,
        dateModified: post.date,
      }),
    ],
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const schema = buildPostSchema(params.slug);

  return (
    <main className="min-h-screen bg-bg-primary">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      {/* Hero */}
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted flex-wrap">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li><Link href="/blog" className="hover:text-text-secondary transition-colors">Blog</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary truncate max-w-[200px]">{post.title}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 text-xs text-text-muted mb-4">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock size={11} /> {post.readTime}
            </span>
          </div>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article className="prose-custom">
            {post.sections.map((section, i) => (
              <div key={i} className="mb-8">
                {section.heading && (
                  <h2 className="font-heading text-2xl tracking-wider uppercase text-text-primary mb-3">
                    {section.heading}
                  </h2>
                )}
                <p className="text-text-secondary leading-relaxed text-base">
                  {section.content}
                </p>
              </div>
            ))}
          </article>

          {/* CTA at end */}
          <div className="mt-12 p-6 glass text-center">
            <p className="text-text-secondary mb-4">
              Ready to start streaming? Get your IPTV UK subscription today from just{" "}
              <strong className="text-text-primary">£9.99/mo</strong>.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[rgba(255,255,255,0.08)] border border-border-glass text-text-primary text-sm font-medium hover:bg-[rgba(255,255,255,0.12)] transition-colors"
            >
              View Plans →
            </Link>
          </div>

          {/* Back to blog */}
          <div className="mt-8">
            <Link
              href="/blog"
              className="text-sm text-text-muted hover:text-text-secondary transition-colors inline-flex items-center gap-2"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
