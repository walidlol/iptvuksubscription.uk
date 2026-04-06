import type { Metadata } from "next";
import Link from "next/link";
import CinematicShapes from "@/components/ui/CinematicShapes";

const SITE_URL = "https://iptvuksubscription.uk";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for IPTV UK Subscription. How we collect, use, and protect your personal data.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    heading: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as your phone number when registering for an account or requesting a free trial. We may also collect usage data, including IP address, device type, and pages visited, to improve our service and diagnose technical issues.",
  },
  {
    heading: "How We Use Your Information",
    content:
      "We use your information to provide and maintain our IPTV UK subscription service, process payments, send account credentials and setup instructions, respond to support requests via WhatsApp, and improve the quality and reliability of our service. We do not sell your personal data to third parties.",
  },
  {
    heading: "WhatsApp Communications",
    content:
      "By contacting us on WhatsApp or providing your phone number, you consent to receiving service-related messages including account credentials, subscription confirmations, setup instructions, and support responses. We will not send unsolicited marketing messages.",
  },
  {
    heading: "Payment Data",
    content:
      "For cryptocurrency payments, we use NOWPayments to process transactions. We do not store your payment card details on our servers. For WhatsApp-based payments, no card data is transmitted to us directly. Please refer to our payment processors' privacy policies for their data handling practices.",
  },
  {
    heading: "Cookies",
    content:
      "We use a single authentication cookie (httpOnly, secure) to maintain your login session on gated pages such as the Channel Guide and Setup Guide. This cookie does not track your activity across other websites. We do not use advertising or tracking cookies.",
  },
  {
    heading: "Data Retention",
    content:
      "We retain your account information for as long as your subscription is active, and for up to 90 days after cancellation for billing and dispute purposes. You may request deletion of your data at any time by contacting us via WhatsApp or email.",
  },
  {
    heading: "Your Rights",
    content:
      "Under the UK GDPR, you have the right to access, correct, or delete your personal data, object to processing, and request data portability. To exercise any of these rights, contact us at support@iptvuksubscription.uk or via WhatsApp at +212 762 151 824.",
  },
  {
    heading: "Third-Party Services",
    content:
      "Our service uses TMDB (The Movie Database) for content metadata. TMDB is not affiliated with IPTV UK Subscription. We may use analytics tools to measure website performance. These services may collect anonymised usage data per their own privacy policies.",
  },
  {
    heading: "Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our service after changes constitutes acceptance of the updated policy.",
  },
  {
    heading: "Contact Us",
    content:
      "If you have questions about this Privacy Policy, contact us at support@iptvuksubscription.uk or via WhatsApp at +212 762 151 824.",
  },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <section className="bg-cinematic relative overflow-hidden pt-32 pb-14">
        <CinematicShapes subtle />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li><Link href="/" className="hover:text-text-secondary transition-colors">Home</Link></li>
              <li aria-hidden>/</li>
              <li className="text-text-secondary">Privacy Policy</li>
            </ol>
          </nav>
          <h1 className="font-heading text-section-h2 uppercase text-text-primary">Privacy Policy</h1>
          <p className="mt-3 text-text-secondary max-w-xl text-sm">
            Effective date: 1 April 2026. Last updated: 6 April 2026.
          </p>
        </div>
      </section>

      <section className="bg-bg-primary py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary leading-relaxed mb-10">
            IPTV UK Subscription (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data when you use our website and IPTV subscription service.
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
