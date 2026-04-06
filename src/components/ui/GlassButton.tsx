"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps {
  readonly children: React.ReactNode;
  /** Renders as <a> via Next.js Link when provided, otherwise <button> */
  readonly href?: string;
  readonly onClick?: () => void;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly type?: "button" | "submit" | "reset";
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-[rgba(255,255,255,0.12)] border-[rgba(255,255,255,0.25)] text-white font-semibold",
  secondary:
    "bg-[rgba(255,255,255,0.06)] border-[rgba(255,255,255,0.12)] text-[#F2F2F7] font-medium",
  ghost:
    "bg-transparent border-[rgba(255,255,255,0.10)] text-[#B8B8C0] font-medium",
};

const BASE_CLASSES = [
  "inline-flex items-center justify-center gap-2",
  "backdrop-blur-glass",
  "border",
  "rounded-full",
  "shadow-glass",
  "transition-colors duration-200",
  "cursor-pointer",
  "select-none",
  "whitespace-nowrap",
  "disabled:opacity-40 disabled:cursor-not-allowed",
].join(" ");

const HOVER_BRIGHTNESS =
  "hover:bg-[rgba(255,255,255,0.18)] hover:border-[rgba(255,255,255,0.35)] hover:shadow-glass-hover";

export default function GlassButton({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  type = "button",
}: GlassButtonProps) {
  const classes = [
    BASE_CLASSES,
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    HOVER_BRIGHTNESS,
    className,
  ].join(" ");

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="inline-block"
      >
        <Link href={href} className={classes} aria-disabled={disabled}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
