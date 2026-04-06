"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { HOMEPAGE_FAQ_ITEMS } from "@/lib/schema";

// Infer type from the shared data so it stays in sync
type FAQItem = (typeof HOMEPAGE_FAQ_ITEMS)[number];

const EASE: Easing = [0.25, 0.1, 0.25, 1];

function ChevronIcon({ open }: { readonly open: boolean }) {
  return (
    <motion.svg
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="w-5 h-5 text-text-muted shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </motion.svg>
  );
}

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  readonly item: FAQItem;
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}) {
  return (
    <div className="border-b border-border-glass">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-text-primary pr-4">
          {item.question}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-text-secondary leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    // Schema injected server-side in page.tsx buildHomepageSchema() @graph
    <section id="faq" className="bg-bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-text-secondary">
            Everything you need to know about our IPTV UK subscription service.
          </p>
        </motion.div>

        <div className="border-t border-border-glass">
          {HOMEPAGE_FAQ_ITEMS.map((item, i) => (
            <FAQAccordionItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
