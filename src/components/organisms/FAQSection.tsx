'use client'

import { useRef, useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { homepageFAQs } from '@/lib/schema'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

/* ============================================================
   AccordionItem — red left indicator bar when open
   ============================================================ */

interface AccordionItemProps {
  question: string
  answer:   string
  index:    number
  open:     boolean
  onToggle: () => void
}

function AccordionItem({ question, answer, index, open, onToggle }: AccordionItemProps) {
  const headingId = `faq-heading-${index}`
  const panelId   = `faq-panel-${index}`

  return (
    <div
      className={[
        'relative border rounded-xl overflow-hidden transition-all duration-200',
        open
          ? 'border-[rgba(232,57,42,0.35)] bg-[rgba(232,57,42,0.04)]'
          : 'border-white/[0.08] hover:border-white/[0.14]',
      ].join(' ')}
    >
      {/* Red left indicator bar — visible when open */}
      <div
        className={[
          'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl transition-opacity duration-200',
          open ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{ background: '#E8392A' }}
        aria-hidden="true"
      />

      {/* Trigger */}
      <h3 id={headingId}>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className={[
            'flex items-center justify-between w-full',
            'px-5 py-5 text-left cursor-pointer',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#E8392A]',
          ].join(' ')}
        >
          <span className="font-ui font-semibold text-sm sm:text-base text-[#F5F5F5] pr-4 leading-snug">
            {question}
          </span>
          <span
            className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-[#9CA3AF]"
            aria-hidden="true"
          >
            {open
              ? <Minus size={14} className="text-[#E8392A]" />
              : <Plus  size={14} />
            }
          </span>
        </button>
      </h3>

      {/* Panel — Framer Motion height animation */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={headingId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-5">
              <div className="divider mb-4" />
              <p className="font-sans text-[#9CA3AF] text-sm leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================================================
   FAQSection
   ============================================================ */

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listRef    = useRef<HTMLDivElement>(null)

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const reduced   = useReducedMotion()
  const triggered = useScrollAnimation(sectionRef, { threshold: 0.08 })

  /* Heading slide-left — dynamic import */
  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    if (reduced) { el.style.opacity = '1'; el.style.transform = 'none'; return }
    if (!triggered) return
    ;(async () => {
      const { animate } = await import('animejs')
      animate(el, { opacity: [0, 1], translateX: [-52, 0], duration: 750, ease: 'outExpo' })
    })()
  }, [triggered, reduced])

  /* List items stagger up — dynamic import */
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (reduced) {
      Array.from(list.children).forEach(el => {
        ;(el as HTMLElement).style.opacity = '1'
        ;(el as HTMLElement).style.transform = 'none'
      })
      return
    }
    if (!triggered) return
    const items = Array.from(list.children) as HTMLElement[]
    ;(async () => {
      const { animate } = await import('animejs')
      animate(items, {
        opacity:    [0, 1],
        translateY: [30, 0],
        duration:   600,
        delay:      (_, i) => 80 + i * 60,
        ease:       'outExpo',
      })
    })()
  }, [triggered, reduced])

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i))
  }

  return (
    <section ref={sectionRef} className="section" id="faq" aria-labelledby="faq-heading">
      <div className="container">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div ref={headingRef} className="anime-slide-left text-center mb-12">
            <h2
              id="faq-heading"
              className="font-display text-display text-[#F5F5F5] uppercase mb-4"
            >
              Frequently Asked <span className="gradient-text-red">Questions</span>
            </h2>
            <p className="font-sans text-[#9CA3AF] text-lg">
              Everything you need to know about IPTV UK subscription.
            </p>
          </div>

          {/* Accordion */}
          <div ref={listRef} className="flex flex-col gap-3">
            {homepageFAQs.map((faq, i) => (
              <AccordionItem
                key={i}
                index={i}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* More questions nudge */}
          <div className="text-center mt-10">
            <p className="font-sans text-[#9CA3AF] text-sm">
              Have another question?{' '}
              <a
                href="https://wa.me/447451296412?text=Hi%2C%20I%20have%20a%20question%20about%20IPTV%20UK%20subscription."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8392A] underline underline-offset-2 hover:text-[#FF4433] transition-colors"
              >
                Ask us on WhatsApp
              </a>{' '}
              — we reply within 15 minutes.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
