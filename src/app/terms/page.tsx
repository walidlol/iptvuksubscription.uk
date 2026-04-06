import type { Metadata } from "next";
import Link from "next/link";
import CinematicShapes from "@/components/ui/CinematicShapes";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for IPTV UK Subscription. Read our terms before subscribing.",
  alternates: { canonical: `${SITE_URL}/terms` },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    heading: "Acceptance of Terms",
    content:
      "By accessing or using the IPTV UK Subscription service, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our service. These terms apply to all users, including visitors, subscribers, and those accessing gated content.",
  },
  {
    heading: "Service Description",
    content:
      "IPTV UK Subscription provides access to live television channels and on-demand video content delivered over the internet. The service is intended for personal, non-commercial use by the subscriber and members of their immediate household.",
  },
  {
    heading: "Account Registration",
    content:
      "To access gated features, you must register with a valid UK phone number and complete our WhatsApp verification process. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
  },
  {
    heading: "Subscription Plans and Billing",
    content:
      "We offer Monthly (£9.99), Annual (£59), and Family (£129.99) subscription plans. Pricing is in GBP and subject to change with 30 days' notice. Subscriptions are activated upon confirmed payment. Renewals are not automatic — you will be contacted before your subscription expires.",
  },
  {
    heading: "Acceptable Use",
    content:
      "You may not resell, redistribute, or share your subscription credentials outside your household. You may not use the service for commercial purposes, in public venues, or to circumvent geographic restrictions beyond your authorised region. Violation of acceptable use may result in immediate termination without refund.",
  },
  {
    heading: "Free Trials",
    content:
      "Free trials are offered at our discretion for a limited period. Only one free trial per person or household is permitted. We reserve the right to discontinue or modify trial terms at any time. No payment details are required for free trials.",
  },
  {
    heading: "Content and Availability",
    content:
      "We strive to maintain 99.9% uptime and provide access to the advertised channel lineup. However, we do not guarantee uninterrupted access to any specific channel or content. Channel availability may change due to broadcaster restrictions, licensing changes, or technical issues beyond our control.",
  },
  {
    heading: "Intellectual Property",
    content:
      "All content delivered through our service remains the intellectual property of the respective broadcasters and content owners. IPTV UK Subscription does not claim ownership of any broadcast content. The website design, branding, and software are the property of IPTV UK Subscription.",
  },
  {
    heading: "Limitation of Liability",
    content:
      "To the maximum extent permitted by law, IPTV UK Subscription shall not be liable for any indirect, incidental, or consequential damages arising from use of the service. Our total liability for any claim shall not exceed the amount paid by you in the preceding 30 days.",
  },
  {
    heading: "Termination",
    content:
      "We may terminate or suspend your account at any time for breach of these terms. You may cancel your subscription at any time by contacting us via WhatsApp. Upon termination, access to gated content will cease immediately.",
  },
  {
    heading: "Governing Law",
    content:
      "These Terms of Service are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    heading: "Contact",
    content:
      "For questions regarding these terms, contact us at support@iptvuksubscription.uk or via WhatsApp at +212 762 151 824.",
  },
] as const;

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary">Terms of Service</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">Terms of Service</h1>
          <p className="mt-3 text-text-secondary max-w-xl text-sm">
            Effective date: 1 April 2026. Last updated: 6 April 2026.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary leading-relaxed mb-10">
            Please read these Terms of Service carefully before subscribing to or using IPTV UK Subscription. These terms constitute a legally binding agreement between you and IPTV UK Subscription.
          </p>
          {SECTIONS.map((section) => (
            <div key={section.heading} className="mb-8">
              <h2 className="font-heading text-xl tracking-wider uppercase text-text-primary mb-3">
                {section.heading}
              </h2>
              <p className="text-text-secondary leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
