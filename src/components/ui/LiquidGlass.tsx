"use client";

import { useId } from "react";
import { motion, type TargetAndTransition, type Transition } from "framer-motion";

type Intensity = "subtle" | "medium" | "strong";

interface FilterConfig {
  baseFrequency: string;
  scale: number;
}

const FILTER_CONFIGS: Record<Intensity, FilterConfig> = {
  subtle: { baseFrequency: "0.01", scale: 2 },
  medium: { baseFrequency: "0.015", scale: 3 },
  strong: { baseFrequency: "0.02", scale: 5 },
};

interface LiquidGlassProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  /** Renders as this element — defaults to 'div' */
  readonly as?: "div" | "button" | "section" | "nav" | "article";
  readonly intensity?: Intensity;
  /** Enable hover background brighten */
  readonly hover?: boolean;
  /** Skip SVG distortion — use backdrop-blur only (mobile perf fallback) */
  readonly disableFilter?: boolean;
}

export default function LiquidGlass({
  children,
  className = "",
  as: Tag = "div",
  intensity = "medium",
  hover = false,
  disableFilter = false,
}: LiquidGlassProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `liquid-glass-${uid}`;
  const { baseFrequency, scale } = FILTER_CONFIGS[intensity];

  const filterStyle = disableFilter ? undefined : { filter: `url(#${filterId})` };

  const hoverClass = hover
    ? "transition-colors duration-200 hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.20)]"
    : "";

  return (
    <>
      {/* SVG filter — zero-size, GPU-accelerated distortion */}
      {!disableFilter && (
        <svg
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter
              id={filterId}
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves={3}
                seed={1}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Glass surface */}
      <Tag
        className={[
          "relative",
          "bg-[rgba(255,255,255,0.06)]",
          "backdrop-blur-glass",
          "border border-[rgba(255,255,255,0.12)]",
          "rounded-glass",
          "shadow-glass",
          "will-change-transform",
          hoverClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={filterStyle}
      >
        {children}
      </Tag>
    </>
  );
}

/**
 * Motion-wrapped variant of LiquidGlass for animated usage.
 * Accepts all LiquidGlassProps plus Framer Motion props via spread.
 */
interface LiquidGlassMotionProps extends LiquidGlassProps {
  readonly whileHover?: TargetAndTransition;
  readonly initial?: TargetAndTransition;
  readonly animate?: TargetAndTransition;
  readonly transition?: Transition;
  readonly onClick?: () => void;
}

export function LiquidGlassMotion({
  children,
  className = "",
  intensity = "medium",
  hover = false,
  disableFilter = false,
  whileHover,
  initial,
  animate,
  transition,
  onClick,
}: LiquidGlassMotionProps) {
  const uid = useId().replace(/:/g, "");
  const filterId = `liquid-glass-m-${uid}`;
  const { baseFrequency, scale } = FILTER_CONFIGS[intensity];

  const filterStyle = disableFilter ? undefined : { filter: `url(#${filterId})` };

  const hoverClass = hover
    ? "transition-colors duration-200 hover:bg-[rgba(255,255,255,0.10)] hover:border-[rgba(255,255,255,0.20)]"
    : "";

  return (
    <>
      {!disableFilter && (
        <svg
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter
              id={filterId}
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency={baseFrequency}
                numOctaves={3}
                seed={1}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={scale}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      )}

      <motion.div
        className={[
          "relative",
          "bg-[rgba(255,255,255,0.06)]",
          "backdrop-blur-glass",
          "border border-[rgba(255,255,255,0.12)]",
          "rounded-glass",
          "shadow-glass",
          "will-change-transform",
          hoverClass,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={filterStyle}
        whileHover={whileHover}
        initial={initial}
        animate={animate}
        transition={transition}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </>
  );
}
