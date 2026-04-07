"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Tv2, Smartphone, Monitor, Wifi } from "lucide-react";
import Link from "next/link";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Generic Firestick IPTV setup tutorial (YouTube search-friendly, no specific channel needed)
// Using a well-known public tutorial video ID — replace with your own if you produce one
const YOUTUBE_VIDEO_ID = "dQw4w9WgXcQ"; // placeholder — swap for a real Firestick IPTV tutorial

const QUICK_STEPS = [
  {
    Icon: Tv2,
    step: "1",
    title: "Choose Your Plan",
    desc: "Pick Monthly, Annual, or Family — message us on WhatsApp to activate instantly.",
  },
  {
    Icon: Wifi,
    step: "2",
    title: "Receive Your Credentials",
    desc: "We send your M3U playlist URL and login details within 5 minutes.",
  },
  {
    Icon: Smartphone,
    step: "3",
    title: "Install an IPTV Player",
    desc: "Download IPTV Smarters, TiviMate, or GSE Player on your device — free from the app store.",
  },
  {
    Icon: Monitor,
    step: "4",
    title: "Enter Your Details & Watch",
    desc: "Paste your URL, log in, and you're live. Full HD sports in under 5 minutes.",
  },
] as const;

export default function SetupVideoSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="setup" className="bg-bg-primary py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <h2 className="font-heading text-section-h2 uppercase text-text-primary">
            Set Up in Under 5 Minutes
          </h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Watch our step-by-step setup guide below — compatible with Firestick,
            Smart TV, Android Box, iPhone, and more. No technical knowledge required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.4)] group">
              {!playing ? (
                <>
                  {/* Thumbnail overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0C1820] to-[#080C10] flex items-center justify-center">
                    {/* Decorative background text */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                      <span className="font-heading text-[120px] text-white leading-none select-none">IPTV</span>
                    </div>
                    <div className="text-center relative z-10">
                      <button
                        onClick={() => setPlaying(true)}
                        aria-label="Play IPTV setup tutorial"
                        className="w-20 h-20 rounded-full bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.20)] flex items-center justify-center mx-auto mb-4 hover:bg-[rgba(255,255,255,0.18)] hover:scale-105 transition-all duration-300"
                      >
                        <Play className="w-8 h-8 text-white fill-white ml-1" />
                      </button>
                      <p className="text-text-secondary text-sm font-medium">
                        IPTV UK Setup Guide — Firestick &amp; Smart TV
                      </p>
                      <p className="text-text-muted text-xs mt-1">5 min · Step-by-step walkthrough</p>
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                  title="How to set up IPTV UK on Firestick and Smart TV"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                />
              )}
            </div>
            <p className="mt-3 text-xs text-text-muted text-center">
              Need more help?{" "}
              <Link href="/setup-guide" className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors">
                Read our full device-by-device setup guide →
              </Link>
            </p>
          </motion.div>

          {/* 4-step quick guide */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="space-y-5"
          >
            {QUICK_STEPS.map(({ Icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08, ease: EASE }}
                className="flex gap-4 p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-[rgba(24,57,73,0.25)] border border-[rgba(24,57,73,0.35)] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-text-secondary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs text-text-muted uppercase tracking-widest mb-1 font-medium">
                    Step {step}
                  </p>
                  <h3 className="text-text-primary font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-2">
              <Link
                href="/setup-guide"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors underline underline-offset-4"
              >
                Full setup guide for all devices →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
