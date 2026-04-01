"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";

interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

const FAQ_ITEMS: readonly FAQItem[] = [
  {
    question: "What is IPTV UK Subscription?",
    answer:
      "IPTV UK Subscription is a premium Internet Protocol Television service designed specifically for UK viewers. We deliver over 30,000 live TV channels, including all major UK channels like BBC, ITV, Sky Sports, BT Sport, and Premier League coverage, streamed directly to your device over the internet in stunning Full HD and 4K quality.",
  },
  {
    question: "How many channels do you offer?",
    answer:
      "We provide access to over 30,000 live TV channels from the UK and around the world, plus a library of 50,000+ movies and TV shows on demand. This includes all UK sports channels, entertainment, news, kids channels, and international content from Europe, Asia, the Americas, and more.",
  },
  {
    question: "What devices are compatible with your IPTV service?",
    answer:
      "Our IPTV UK subscription works on virtually any device. This includes Smart TVs (Samsung, LG, Sony), Amazon Firestick, Android TV boxes, MAG devices, computers (Windows and Mac), smartphones and tablets (iOS and Android), Roku, Apple TV, and Chromecast. If it connects to the internet, it likely works with our service.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a free trial so you can test our IPTV UK service before committing to a subscription. Simply contact us via WhatsApp to request your free trial, and we will set you up within minutes. No payment details required for the trial.",
  },
  {
    question: "What internet speed do I need?",
    answer:
      "For optimal streaming quality, we recommend a minimum of 10 Mbps for HD content and 25 Mbps for 4K Ultra HD content. Most standard UK broadband connections will handle our service without any issues. We also recommend using a wired ethernet connection for the most stable experience, though WiFi works well too.",
  },
  {
    question: "How do I subscribe to your IPTV UK service?",
    answer:
      "Subscribing is simple and takes just a few minutes. Choose your preferred plan (Monthly at £9.99, Annual at £59, or Family at £129.99), then contact us via WhatsApp. We will process your subscription and send you your login credentials and setup instructions. You can be watching live TV within 5 minutes of subscribing.",
  },
];

/** FAQPage JSON-LD schema for search engines */
function faqSchema(items: readonly FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

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
    <div className="border-b border-border">
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
    <section id="faq" className="bg-bg-surface py-16 sm:py-24">
      {/* FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQ_ITEMS)),
        }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-text-secondary">
            Everything you need to know about our IPTV UK subscription service.
          </p>
        </div>

        {/* Accordion */}
        <div className="border-t border-border">
          {FAQ_ITEMS.map((item, i) => (
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
