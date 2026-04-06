"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Easing } from "framer-motion";

export const FAQ_ITEMS = [
  {
    question: "What is IPTV UK Subscription?",
    answer: "IPTV UK Subscription is a premium Internet Protocol Television service designed for UK viewers. We stream over 30,000 live TV channels — including BBC, ITV, Sky Sports, TNT Sports, and hundreds of international channels — plus 100,000+ on-demand VODs directly to your device over the internet in Full HD and 4K quality.",
  },
  {
    question: "How many channels and VODs do you offer?",
    answer: "We offer 30,000+ live TV channels from the UK and around the world, plus a library of 100,000+ on-demand movies, TV shows, documentaries, and special events including classic football matches, UFC fights, and boxing. New content is added regularly.",
  },
  {
    question: "What devices are compatible?",
    answer: "Our IPTV UK subscription works on virtually any internet-connected device: Amazon Firestick and Fire TV, Smart TVs (Samsung, LG, Sony, Hisense), Android phones, tablets and TV boxes, iPhones and iPads, Windows and Mac computers, MAG boxes, Formuler devices, Apple TV, Roku, Chromecast, and more.",
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! We offer a free trial so you can experience the service before committing. Simply message us on WhatsApp at +212 762 151 824 and we'll set you up with a trial within minutes. No payment details required.",
  },
  {
    question: "What internet speed do I need?",
    answer: "For HD streaming we recommend at least 10 Mbps. For 4K Ultra HD, 25 Mbps or more ensures a smooth experience. Most UK broadband connections easily exceed these requirements. A wired ethernet connection is always preferred over Wi-Fi for maximum stability.",
  },
  {
    question: "How do I subscribe?",
    answer: "Choose your plan (Monthly £9.99, Annual £59, or Family £129.99), then message us on WhatsApp. We process your subscription immediately and send your login credentials. You can be watching live TV within 5 minutes. We also accept Bitcoin, USDT, and Ethereum for privacy-focused payments.",
  },
  {
    question: "Can I watch Premier League on IPTV?",
    answer: "Yes — our subscription includes every channel broadcasting Premier League football in the UK: Sky Sports Premier League, Sky Sports Main Event, Sky Sports Football, TNT Sports 1–4, and BBC Sport. You'll never miss a match. We also carry Champions League, Europa League, FA Cup, and international tournaments.",
  },
  {
    question: "What sports channels are included?",
    answer: "We include Sky Sports (all channels), TNT Sports 1–4, BT Sport, Eurosport 1 & 2, Premier Sports, BBC Sport, ITV Sport, Channel 4 Sport, DAZN, and more. That covers Premier League, Championship, Champions League, UFC, Formula 1, cricket, golf, tennis, boxing, rugby, and much more — all in one subscription.",
  },
  {
    question: "Do you provide an EPG (Electronic Programme Guide)?",
    answer: "Yes. Our IPTV UK subscription includes a full EPG so you can see what's on now and what's coming up across all channels, just like a traditional TV guide. EPG coverage varies by channel but is available for all major UK and international channels.",
  },
  {
    question: "Can I use it on multiple devices at the same time?",
    answer: "Yes, depending on your plan. The Monthly plan supports 1 device, the Annual plan supports 2 simultaneous devices, and the Family plan supports 4 simultaneous device connections. If you need more connections, contact us and we'll find the right solution.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payment via WhatsApp for all major methods. For added privacy, we also accept cryptocurrency including Bitcoin (BTC), USDT (Tether), and Ethereum (ETH) through our NOWPayments integration. Contact us to arrange crypto payment for any plan.",
  },
  {
    question: "Is there a contract or minimum term?",
    answer: "No. There are no contracts and no minimum terms on any of our plans. The Monthly plan is renewed each month and can be cancelled at any time. Annual and Family plans are billed once per year with no lock-in. We believe in earning your loyalty, not locking you in.",
  },
  {
    question: "What happens if I experience technical issues?",
    answer: "Our support team is available 24/7 via WhatsApp. Most issues — buffering, channel not loading, app configuration — are resolved within minutes. We also have a comprehensive Setup Guide available once you subscribe, covering Firestick, Smart TV, Android, iOS, and MAG Box setup in detail.",
  },
  {
    question: "Do you have channels in languages other than English?",
    answer: "Yes. Our 30,000+ channel lineup includes extensive international content: Arabic, French, Spanish, German, Italian, Polish, Hindi, Urdu, Tamil, Malayalam, Portuguese, Turkish, Chinese, and many more languages. We carry major international networks alongside all UK channels.",
  },
  {
    question: "What is included in the VOD library?",
    answer: "Our 100,000+ VOD library includes Hollywood blockbusters, UK drama series, international films, documentaries, kids shows, classic TV, and sporting events. Special highlights include legendary football matches (World Cup finals, Champions League finals, iconic Premier League seasons), UFC fight nights, boxing world championships, and more.",
  },
  {
    question: "How quickly is my account activated?",
    answer: "For WhatsApp payments, activation is typically within 5–15 minutes once payment is confirmed, any time of day or night. For crypto payments, activation follows after 1–2 blockchain confirmations, usually within 10–30 minutes. We send your login credentials directly to your WhatsApp.",
  },
  {
    question: "How is IPTV different from Netflix or Disney+?",
    answer: "Netflix and Disney+ are on-demand only — no live TV. Our IPTV UK subscription gives you live TV (30,000+ channels) plus on-demand content (100,000+ VODs) in one package. You get live Premier League, live news, live sports events, and on-demand movies and series — all for less than Netflix Premium costs alone.",
  },
  {
    question: "Can I get a refund?",
    answer: "We offer refunds within 24 hours of purchase if you experience a technical issue we cannot resolve. Because we offer a free trial before purchase, we generally do not offer refunds after subscription activation. Please read our full Refund Policy for details.",
  },
] as const;

const EASE: Easing = [0.25, 0.1, 0.25, 1];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  readonly item: (typeof FAQ_ITEMS)[number];
  readonly isOpen: boolean;
  readonly onToggle: () => void;
}) {
  return (
    <div className="border-b border-border-glass">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-base font-medium text-text-primary">{item.question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="w-5 h-5 text-text-muted shrink-0"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
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
            <p className="pb-5 text-sm text-text-secondary leading-relaxed">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-text-muted">
          <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
          <li aria-hidden>/</li>
          <li className="text-text-secondary">FAQ</li>
        </ol>
      </nav>

      <h1 className="font-heading text-section-h2 uppercase text-text-primary mb-3">
        Frequently Asked Questions
      </h1>
      <p className="text-text-secondary mb-12">
        Everything you need to know about our IPTV UK subscription service. Can&apos;t find your answer?{" "}
        <a
          href="https://wa.me/212762151824"
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
        >
          Ask us on WhatsApp
        </a>
        .
      </p>

      <div className="border-t border-border-glass">
        {FAQ_ITEMS.map((item, i) => (
          <FAQItem
            key={item.question}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </div>
  );
}
