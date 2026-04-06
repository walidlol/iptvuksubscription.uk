"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { MediaItem } from "@/lib/tmdb";

type CardSize = "poster" | "backdrop";

interface PosterCardProps {
  readonly item: MediaItem;
  readonly size?: CardSize;
  readonly priority?: boolean;
  readonly index: number;
}

const SIZE_CONFIG = {
  poster: {
    width: 150,
    height: 225,
    imgSizes: "150px",
    containerClass: "w-[150px] min-w-[150px] aspect-[2/3]",
  },
  backdrop: {
    width: 280,
    height: 158,
    imgSizes: "280px",
    containerClass: "w-[280px] min-w-[280px] aspect-video",
  },
} as const;

export default function PosterCard({
  item,
  size = "poster",
  priority = false,
  index,
}: PosterCardProps) {
  const config = SIZE_CONFIG[size];
  const imageUrl =
    size === "poster" ? item.posterUrl : (item.backdropUrl ?? item.posterUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      className={`${config.containerClass} relative rounded-xl overflow-hidden cursor-pointer group shrink-0`}
      style={{ willChange: "transform" }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={item.title}
          width={config.width}
          height={config.height}
          sizes={config.imgSizes}
          priority={priority}
          className="object-cover w-full h-full"
          quality={75}
        />
      ) : (
        /* Gradient fallback — never show broken images */
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,255,255,0.08)] via-[rgba(255,255,255,0.04)] to-[rgba(0,0,0,0.2)] flex items-end p-3">
          <span className="text-xs text-[#B8B8C0] font-medium leading-tight line-clamp-2">
            {item.title}
          </span>
        </div>
      )}

      {/* Hover overlay — title + year */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,9,12,0.92)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
        <div>
          <p className="text-sm font-medium text-[#F2F2F7] leading-tight line-clamp-2">
            {item.title}
          </p>
          {item.year && (
            <p className="text-xs text-[#6E6E7A] mt-0.5">{item.year}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
