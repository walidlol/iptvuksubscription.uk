"use client";

import { useRef, useState, useCallback } from "react";
import type { MediaItem } from "@/lib/tmdb";
import PosterCard from "@/components/ui/PosterCard";

type RowSize = "poster" | "backdrop";

interface ContentRowProps {
  readonly title: string;
  readonly items: readonly MediaItem[];
  readonly size?: RowSize;
  readonly priority?: boolean;
}

export default function ContentRow({
  title,
  items,
  size = "poster",
  priority = false,
}: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    });
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="relative group/row">
      {/* Row Title */}
      <h2 className="font-heading text-section-h2 text-text-primary px-4 sm:px-6 lg:px-8 mb-4">
        {title}
      </h2>

      {/* Scroll Container */}
      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-r from-[rgba(12,13,18,0.85)] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            aria-label="Scroll left"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-20 w-12 bg-gradient-to-l from-[rgba(12,13,18,0.85)] to-transparent flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
            aria-label="Scroll right"
          >
            <svg
              className="w-6 h-6 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-4"
        >
          {items.map((item, i) => (
            <div key={item.id} className="snap-start">
              <PosterCard
                item={item}
                size={size}
                priority={priority && i < 6}
                index={i}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
