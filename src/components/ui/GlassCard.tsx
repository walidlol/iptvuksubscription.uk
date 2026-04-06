"use client";

import { motion } from "framer-motion";

type CardPadding = "sm" | "md" | "lg";

interface GlassCardProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** Enable hover lift: translateY(-4px) + scale(1.03) + brighter glass */
  readonly hover?: boolean;
  readonly padding?: CardPadding;
  readonly onClick?: () => void;
}

const PADDING_CLASSES: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const BASE_CLASSES = [
  "relative",
  "bg-[rgba(255,255,255,0.06)]",
  "backdrop-blur-glass",
  "border border-[rgba(255,255,255,0.12)]",
  "rounded-glass",
  "shadow-glass",
  "will-change-transform",
].join(" ");

const HOVER_MOTION = {
  whileHover: { y: -4, scale: 1.03 },
  transition: { type: "spring" as const, stiffness: 300, damping: 25 },
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  padding = "md",
  onClick,
}: GlassCardProps) {
  const classes = [BASE_CLASSES, PADDING_CLASSES[padding], className].join(" ");

  if (hover) {
    return (
      <motion.div
        className={classes}
        onClick={onClick}
        whileHover={HOVER_MOTION.whileHover}
        transition={HOVER_MOTION.transition}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        {/* Brighten inner highlight on hover via CSS */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-glass opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
          }}
        />
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={classes}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
}
