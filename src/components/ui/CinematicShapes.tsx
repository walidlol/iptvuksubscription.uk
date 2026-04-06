"use client";

/**
 * CinematicShapes — Abstract animated background elements.
 * Soft glowing orbs (from the #040405 → #183949 cinematic palette) + geometric rings.
 * Uses Framer Motion infinite float animations. Respects prefers-reduced-motion.
 * Usage: place as a direct child of a `relative overflow-hidden` section.
 */

import { motion, useReducedMotion } from "framer-motion";

// ─── Soft glowing orbs ───────────────────────────────────────────────────────

interface Orb {
  readonly size: number;
  readonly color: string;
  readonly top?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly right?: string;
  readonly blur: number;
  readonly opacity: number;
  readonly delay: number;
  readonly duration: number;
  readonly floatX: number;
  readonly floatY: number;
}

const ORBS: readonly Orb[] = [
  // Large teal bloom — top-left quadrant
  {
    size: 720,
    color: "#183949",
    top: "-18%",
    left: "-12%",
    blur: 130,
    opacity: 0.5,
    delay: 0,
    duration: 14,
    floatX: 35,
    floatY: 40,
  },
  // Medium accent — bottom-right
  {
    size: 480,
    color: "#0f5064",
    bottom: "-8%",
    right: "-8%",
    blur: 110,
    opacity: 0.35,
    delay: 3,
    duration: 11,
    floatX: -28,
    floatY: -32,
  },
  // Small mid-page drift
  {
    size: 280,
    color: "#183949",
    top: "42%",
    left: "38%",
    blur: 90,
    opacity: 0.22,
    delay: 6,
    duration: 16,
    floatX: 18,
    floatY: -22,
  },
];

// ─── Geometric ring accents ───────────────────────────────────────────────────

interface Ring {
  readonly size: number;
  readonly top?: string;
  readonly bottom?: string;
  readonly left?: string;
  readonly right?: string;
  readonly delay: number;
  readonly rotateDuration: number;
  readonly opacity: number;
}

const RINGS: readonly Ring[] = [
  {
    size: 340,
    top: "8%",
    right: "12%",
    delay: 0,
    rotateDuration: 22,
    opacity: 0.18,
  },
  {
    size: 180,
    bottom: "18%",
    left: "8%",
    delay: 4,
    rotateDuration: 18,
    opacity: 0.14,
  },
  {
    size: 520,
    top: "35%",
    right: "-8%",
    delay: 8,
    rotateDuration: 30,
    opacity: 0.08,
  },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface CinematicShapesProps {
  /** Scale down intensity for sections that already have a backdrop image */
  readonly subtle?: boolean;
}

export default function CinematicShapes({ subtle = false }: CinematicShapesProps) {
  const prefersReduced = useReducedMotion();
  const scale = subtle ? 0.55 : 1;

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* ── Soft orbs ── */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: "absolute",
            width: orb.size,
            height: orb.size,
            borderRadius: "50%",
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: orb.opacity * scale,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            translateX: "-50%",
          }}
          animate={
            prefersReduced
              ? {}
              : {
                  x: [0, orb.floatX, 0, -orb.floatX * 0.6, 0],
                  y: [0, orb.floatY * 0.7, orb.floatY, orb.floatY * 0.3, 0],
                }
          }
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── Geometric rings ── */}
      {RINGS.map((ring, i) => (
        <motion.div
          key={`ring-${i}`}
          style={{
            position: "absolute",
            width: ring.size,
            height: ring.size,
            borderRadius: "50%",
            border: `1px solid rgba(24, 57, 73, ${ring.opacity * scale})`,
            top: ring.top,
            bottom: ring.bottom,
            left: ring.left,
            right: ring.right,
          }}
          animate={prefersReduced ? {} : { rotate: 360 }}
          transition={{
            duration: ring.rotateDuration,
            delay: ring.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* ── Diagonal hairline accent ── */}
      <div
        style={{
          position: "absolute",
          top: "28%",
          right: "22%",
          width: "1px",
          height: "180px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(24,57,73,0.5) 50%, transparent 100%)",
          transform: "rotate(28deg)",
          opacity: subtle ? 0.5 : 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          left: "18%",
          width: "1px",
          height: "120px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(24,57,73,0.35) 50%, transparent 100%)",
          transform: "rotate(-20deg)",
          opacity: subtle ? 0.5 : 1,
        }}
      />
    </div>
  );
}
