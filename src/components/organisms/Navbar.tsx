'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { fadeDown } from '@/lib/animations'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const NAV_LINKS = [
  { label: 'Plans',       href: '/plans/' },
  { label: 'Channels',    href: '/channels/' },
  { label: 'Setup Guide', href: '/setup-guide/' },
  { label: 'FAQ',         href: '/faq/' },
  { label: 'Reviews',     href: '/reviews/' },
] as const

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const reduced  = useReducedMotion()
  const linksRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Stagger animate mobile links in */
  useEffect(() => {
    if (!open || reduced) return
    const ul = linksRef.current
    if (!ul) return
    const items = Array.from(ul.children) as HTMLElement[]
    ;(async () => {
      const { animate } = await import('animejs')
      animate(items, {
        opacity:    [0, 1],
        translateY: [40, 0],
        duration:   500,
        delay:      (_, i) => 100 + i * 70,
        ease:       'outExpo',
      })
    })()
  }, [open, reduced])

  return (
    <>
      <motion.header
        variants={fadeDown}
        initial="hidden"
        animate="visible"
        className={[
          'fixed top-0 left-0 right-0 z-[40]',
          'transition-all duration-300',
          scrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/40'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="container">
          <nav
            className="flex items-center justify-between h-16"
            role="navigation"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8392A] rounded"
              aria-label="IPTV UK Subscription — Home"
            >
              <Image
                src="/icon.png"
                alt="IPTV UK Subscription logo"
                width={40}
                height={40}
                priority
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'px-3 py-2 rounded',
                      'font-ui text-sm text-[#9CA3AF]',
                      'hover:text-[#F5F5F5] hover:bg-white/5',
                      'transition-colors duration-200',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8392A]',
                    ].join(' ')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/free-trial/"
                className="font-ui text-sm text-[#9CA3AF] hover:text-[#F5F5F5] transition-colors duration-200"
              >
                Free Trial
              </Link>
              <Link
                href="/plans/"
                className="btn-red inline-flex items-center justify-center h-9 px-5 text-sm font-semibold"
              >
                Get IPTV UK
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className={[
                'md:hidden flex items-center justify-center w-10 h-10 rounded',
                'text-[#F5F5F5] hover:bg-white/10',
                'transition-colors duration-200 cursor-pointer',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8392A]',
              ].join(' ')}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25 }}
            className="fixed inset-0 z-[39] bg-[#0A0A0A] flex flex-col md:hidden"
          >
            {/* Red accent line at top */}
            <div className="h-[2px] bg-[#E8392A] flex-none" aria-hidden="true" />

            {/* Overlay header */}
            <div className="flex items-center justify-between px-6 h-16 flex-none border-b border-white/[0.06]">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center"
                aria-label="Home"
              >
                <Image
                  src="/icon.png"
                  alt="IPTV UK Subscription logo"
                  width={36}
                  height={36}
                />
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded text-[#9CA3AF] hover:text-[#F5F5F5] hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* Centered nav links — Bebas Neue 56px */}
            <div className="flex-1 flex items-center justify-center px-6">
              <ul
                ref={linksRef}
                className="flex flex-col items-center gap-2 w-full"
                role="list"
              >
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href} style={{ opacity: 0 }}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className={[
                        'block text-center py-2',
                        'font-display text-[#F5F5F5] uppercase tracking-wider',
                        'hover:text-[#E8392A] transition-colors duration-200',
                      ].join(' ')}
                      style={{ fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', lineHeight: 1.1 }}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTAs */}
            <div className="flex flex-col gap-3 px-6 pb-10 pt-6 border-t border-white/[0.06] flex-none">
              <a
                href="https://wa.me/447451296412?text=Hi%2C+I%27d+like+to+request+a+free+24-hour+IPTV+trial."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center h-12 px-6 rounded border border-white/20 font-ui text-sm text-[#F5F5F5] hover:bg-white/5 transition-colors duration-200"
              >
                Free 24-Hour Trial
              </a>
              <Link
                href="/plans/"
                onClick={() => setOpen(false)}
                className="btn-red flex items-center justify-center h-12 px-6 text-sm font-semibold"
              >
                Get IPTV UK — From £9.99
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
