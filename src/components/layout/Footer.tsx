import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    title: "Plans",
    links: [
      { label: "Monthly Plan", href: "/plans" },
      { label: "Annual Plan", href: "/plans" },
      { label: "Family Plan", href: "/plans" },
      { label: "Free Trial", href: "/plans" },
    ],
  },
  {
    title: "IPTV UK",
    links: [
      { label: "Channels", href: "/channels" },
      { label: "Features", href: "/#features" },
      { label: "Devices", href: "/#devices" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Setup Guide", href: "/setup-guide" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
      { label: "WhatsApp", href: "https://wa.me/447451296412" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
] as const;

export default function Footer() {
  return (
    <footer className="bg-bg-hero border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Top: Logo + Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-9 w-9 rounded-full bg-brand-red flex items-center justify-center">
                <span className="font-heading text-lg text-text-primary leading-none">
                  TV
                </span>
              </div>
              <span className="font-heading text-xl tracking-wider text-text-primary">
                IPTV UK
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed max-w-xs">
              Premium IPTV UK subscription service with 30,000+ live channels,
              4K quality, and 99.9% uptime.
            </p>
          </div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-heading text-base tracking-wider text-text-primary mb-4">
                {column.title.toUpperCase()}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text-primary transition-colors"
                      {...(link.href.startsWith("https://")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} IPTV UK Subscription. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/refund-policy"
                className="text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                Refunds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
