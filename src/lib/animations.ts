/**
 * Framer Motion Variant Library
 * IPTV UK Subscription — Dark Signal Design System
 *
 * Import what you need:
 *   import { fadeUp, scaleIn, staggerContainer } from '@/lib/animations'
 */

import type { Variants, Transition } from 'framer-motion'

/* ============================================================
   Shared Transitions
   ============================================================ */

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
}

export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
}

export const fastTransition: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1],
}

/* ============================================================
   Section Entrance — whileInView patterns
   ============================================================ */

/** Standard fade up — use on most section entries */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothTransition,
  },
}

/** Fade down — use on navbar, dropdowns */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
}

/** Fade in only — flat elements that don't need motion */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

/** Slide in from left — sidebars, feature lists */
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

/** Slide in from right — CTA columns, media */
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smoothTransition,
  },
}

/** Scale + fade — cards, badges, pricing tiers */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: smoothTransition,
  },
}

/* ============================================================
   Stagger Container — wraps a list of children
   ============================================================ */

/** Wrap a list: <motion.ul variants={staggerContainer}> */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

/** Use as child inside staggerContainer */
export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fastTransition,
  },
}

/** Faster stagger — icon grids, badges */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
}

/* ============================================================
   Interactive Element Props (spread directly onto motion.*)
   ============================================================ */

/** Required on EVERY interactive card — per CLAUDE.md Commandment #1 */
export const cardHover = {
  whileHover: { scale: 1.02, y: -4 },
  whileTap:   { scale: 0.98 },
  transition: springTransition,
}

/** Pricing card hover — slightly larger lift */
export const pricingCardHover = {
  whileHover: { scale: 1.03, y: -6 },
  whileTap:   { scale: 0.97 },
  transition: springTransition,
}

/** Button press — all CTA buttons */
export const buttonPress = {
  whileHover: { scale: 1.04 },
  whileTap:   { scale: 0.96 },
  transition: springTransition,
}

/** Nav link hover */
export const navLinkHover = {
  whileHover: { y: -1 },
  whileTap:   { y: 0 },
  transition: { duration: 0.15 },
}

/* ============================================================
   Hero — complex entrance sequence
   ============================================================ */

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const heroBadge: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

export const heroHeadline: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export const heroSub: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const heroCta: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ============================================================
   Stat Counter — triggered on scroll
   ============================================================ */

export const statItem: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ...smoothTransition, duration: 0.5 },
  },
}

/* ============================================================
   Accordion / FAQ
   ============================================================ */

export const accordionContent: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

export const accordionIcon: Variants = {
  collapsed: { rotate: 0 },
  expanded:  { rotate: 180, transition: { duration: 0.25 } },
}

/* ============================================================
   Navbar — blur/background on scroll
   Use with useScroll + useTransform in component
   ============================================================ */

export const navbarVariants: Variants = {
  top: {
    backgroundColor: 'rgba(8, 9, 13, 0)',
    backdropFilter: 'blur(0px)',
    borderBottomColor: 'rgba(255,255,255,0)',
  },
  scrolled: {
    backgroundColor: 'rgba(22, 24, 32, 0.9)',
    backdropFilter: 'blur(20px)',
    borderBottomColor: 'rgba(255,255,255,0.08)',
    transition: { duration: 0.3 },
  },
}

/* ============================================================
   Parallax Blob — use with useScroll + useTransform
   ============================================================ */

/** Config for Framer Motion useTransform input/output */
export const blobParallaxConfig = {
  scrollRange: [0, 1],
  blobOneOutput: [0, -200],
  blobTwoOutput: [0, -120],
  blobThreeOutput: [0, -80],
} as const

/* ============================================================
   Viewport config — used with whileInView
   ============================================================ */

/** Standard once-only trigger with margin so it fires early */
export const viewport = { once: true, margin: '-100px' } as const

/** Repeat trigger — for sections that should re-animate on scroll back */
export const viewportRepeat = { once: false, margin: '-100px' } as const
