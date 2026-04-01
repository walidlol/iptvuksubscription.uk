"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Plans", href: "/plans" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
] as const;

const WHATSAPP_NUMBER = "447451296412";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg-primary/80 backdrop-blur-lg border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="relative h-9 w-9 rounded-full bg-brand-red flex items-center justify-center">
                <span className="font-heading text-lg text-text-primary leading-none">
                  TV
                </span>
              </div>
              <span className="font-heading text-xl tracking-wider text-text-primary hidden sm:block">
                IPTV UK
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your IPTV UK subscription service.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 bg-brand-red hover:bg-brand-red-hover text-text-primary text-sm font-semibold rounded-lg transition-colors"
              >
                Get IPTV UK
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 6, width: 24 }
                    : { rotate: 0, y: 0, width: 24 }
                }
                transition={{ duration: 0.2 }}
                className="block h-0.5 bg-text-primary rounded-full origin-center"
                style={{ width: 24 }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="block h-0.5 w-6 bg-text-primary rounded-full"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -6, width: 24 }
                    : { rotate: 0, y: 0, width: 24 }
                }
                transition={{ duration: 0.2 }}
                className="block h-0.5 bg-text-primary rounded-full origin-center"
                style={{ width: 24 }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-bg-hero/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 z-40 h-full w-72 bg-bg-surface border-l border-border md:hidden"
            >
              <div className="flex flex-col pt-24 px-6 gap-2">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 px-4 text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * NAV_LINKS.length + 0.1 }}
                  className="mt-4"
                >
                  <Link
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your IPTV UK subscription service.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center py-3 px-4 bg-brand-red hover:bg-brand-red-hover text-text-primary font-semibold rounded-lg transition-colors"
                  >
                    Get IPTV UK
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
