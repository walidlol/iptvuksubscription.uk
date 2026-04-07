import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blogPosts";

interface RelatedPostsProps {
  readonly currentSlug: string;
  readonly posts: readonly BlogPost[];
}

export default function RelatedPosts({ currentSlug, posts }: RelatedPostsProps) {
  const related = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);
  if (related.length === 0) return null;

  return (
    <div className="mt-14 pt-10 border-t border-[rgba(255,255,255,0.07)]">
      <h2 className="font-heading text-xl uppercase tracking-wider text-text-primary mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col p-5 rounded-xl border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] transition-all duration-300"
          >
            <p className="text-sm text-text-primary font-medium leading-snug mb-3 group-hover:text-white transition-colors line-clamp-3">
              {post.title}
            </p>
            <div className="flex items-center gap-3 mt-auto text-xs text-text-muted">
              <span className="flex items-center gap-1">
                <Clock size={10} /> {post.readTime}
              </span>
              <span className="ml-auto flex items-center gap-1 text-text-muted group-hover:text-text-secondary transition-colors">
                Read <ArrowRight size={10} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
