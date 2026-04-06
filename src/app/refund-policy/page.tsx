import type { Metadata } from "next";
import Link from "next/link";
import CinematicShapes from "@/components/ui/CinematicShapes";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for IPTV UK Subscription. Understand our refund and cancellation terms.",
  alternates: { canonical: `${SITE_URL}/refund-policy` },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    heading: "Free Trial First",
    content:
      "We strongly encourage all new users to take advantage of our free trial before subscribing. The trial gives you full access to the service so you can verify stream quality, channel availability, and device compatibility before committing to a paid plan. Simply message us on WhatsApp at +212 762 151 824 to request a trial — no payment details required.",
  },
  {
    heading: "Eligibility for Refunds",
    content:
      "We offer refunds within 24 hours of purchase if you experience a technical issue that our support team is unable to resolve. Because we provide a free trial before purchase, refunds are generally not issued for change-of-mind cancellations after subscription activation.",
  },
  {
    heading: "Technical Issue Refunds",
    content:
      "If you experience persistent technical issues — such as streams not loading, EPG not functioning, or login credentials not working — contact us via WhatsApp immediately. Our team will make every effort to resolve the issue within a reasonable timeframe. If we are unable to resolve the issue within 24 hours of your initial report, a full refund will be issued.",
  },
  {
    heading: "Non-Refundable Circumstances",
    content:
      "Refunds will not be issued for the following: slow internet connection on your end (minimum 10 Mbps required for HD, 25 Mbps for 4K); incompatible devices not listed in our supported device list; failure to follow setup instructions; subscription purchased beyond the 24-hour refund window; account suspension due to terms of service violation; or dissatisfaction with specific channels where the channel was listed as part of our service at the time of purchase.",
  },
  {
    heading: "Annual and Family Plans",
    content:
      "Annual and Family plan purchases are eligible for a pro-rata refund within 24 hours of purchase under the technical issue policy above. After 24 hours, no refund is available for unused subscription time, except in exceptional circumstances at our sole discretion.",
  },
  {
    heading: "Crypto Payments",
    content:
      "For subscriptions paid via cryptocurrency (Bitcoin, USDT, Ethereum), refunds eligible under this policy will be issued in the equivalent GBP value in cryptocurrency at the current exchange rate at the time of the refund. Refunds cannot be issued in a different cryptocurrency than the one used for payment.",
  },
  {
    heading: "How to Request a Refund",
    content:
      "To request a refund, contact us via WhatsApp at +212 762 151 824 or email support@iptvuksubscription.uk within 24 hours of purchase. Include your account phone number and a description of the technical issue you experienced. Refunds are typically processed within 3–5 business days.",
  },
  {
    heading: "Cancellation",
    content:
      "You may cancel your subscription at any time by contacting us. Cancellation stops future renewals. Monthly subscriptions can be cancelled at any time with no penalty — you retain access until the end of your current paid period. Cancellation does not automatically trigger a refund.",
  },
  {
    heading: "Contact",
    content:
      "If you have questions about this Refund Policy, contact us at support@iptvuksubscription.uk or via WhatsApp at +212 762 151 824. We aim to respond to all refund requests within 2 hours during business hours.",
  },
] as const;

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary">Refund Policy</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">Refund Policy</h1>
          <p className="mt-3 text-text-secondary max-w-xl text-sm">
            Effective date: 1 April 2026. Last updated: 6 April 2026.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary leading-relaxed mb-10">
            At IPTV UK Subscription, we stand behind our service. This Refund Policy explains when and how we issue refunds for subscription purchases.
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
