import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Mail } from 'lucide-react'

const FOOTER_COLUMNS = [
  {
    heading: 'Plans',
    links: [
      { label: 'View All Plans',         href: '/plans/'                },
      { label: 'Standard Monthly',       href: '/plans/#standard'       },
      { label: 'Premium Annual',         href: '/plans/#premium'        },
      { label: 'Family Plan',            href: '/plans/#family'         },
      { label: 'Pay with Crypto',        href: '/plans/#crypto'         },
      { label: 'Free 24-Hour Trial',     href: '/free-trial/'           },
    ],
  },
  {
    heading: 'IPTV UK',
    links: [
      { label: 'IPTV UK Subscription',   href: '/iptv-uk-subscription/' },
      { label: 'IPTV Subscription UK',   href: '/iptv-subscription-uk/' },
      { label: 'Channel List',           href: '/channels/'             },
      { label: 'Setup Guide',            href: '/setup-guide/'          },
      { label: 'Compatible Devices',     href: '/setup-guide/#devices'  },
      { label: 'Reviews',                href: '/reviews/'              },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'FAQ',                    href: '/faq/'                  },
      { label: 'WhatsApp Support',       href: 'https://wa.me/447451296412' },
      { label: 'Email Us',               href: 'mailto:support@iptvuksubscription.uk' },
      { label: 'Setup Firestick',        href: '/setup-guide/#firestick' },
      { label: 'Setup Smart TV',         href: '/setup-guide/#smart-tv' },
      { label: 'Blog',                   href: '/blog/'                 },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms & Conditions',     href: '/terms/'                },
      { label: 'Privacy Policy',         href: '/privacy/'              },
      { label: 'Refund Policy',          href: '/refund-policy/'        },
      { label: 'Cookie Policy',          href: '/cookies/'              },
    ],
  },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="relative z-[20] bg-[#0A0A0A]"
      aria-label="Site footer"
    >
      {/* Red divider at top of footer */}
      <div className="h-[2px] bg-[#E8392A]" aria-hidden="true" />

      <div className="container">

        {/* Top block */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 py-16">

          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            {/* PNG logo */}
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8392A] rounded"
              aria-label="IPTV UK Subscription — Home"
            >
              <Image
                src="/icon.png"
                alt="IPTV UK Subscription logo"
                width={40}
                height={40}
              />
            </Link>

            <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">
              The UK&apos;s best IPTV subscription service. 35,000+ channels,
              100,000+ VODs, 99.9% uptime. Starting from £9.99/month.
            </p>

            {/* Contact */}
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/447451296412?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20IPTV%20UK%20subscription."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-ui text-sm text-[#9CA3AF] hover:text-[#25D366] transition-colors"
              >
                <MessageCircle size={14} aria-hidden="true" />
                WhatsApp Support
              </a>
              <a
                href="mailto:support@iptvuksubscription.uk"
                className="flex items-center gap-2 font-ui text-sm text-[#9CA3AF] hover:text-[#E8392A] transition-colors"
              >
                <Mail size={14} aria-hidden="true" />
                support@iptvuksubscription.uk
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav
              key={col.heading}
              aria-label={`${col.heading} links`}
              className="flex flex-col gap-4"
            >
              <h3 className="font-ui text-xs font-semibold text-[#F5F5F5] uppercase tracking-widest">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {col.links.map(({ label, href }) => {
                  const isExternal = href.startsWith('http') || href.startsWith('mailto')
                  return (
                    <li key={href}>
                      {isExternal ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-ui text-sm text-[#9CA3AF] hover:text-[#F5F5F5] hover:translate-x-1 transition-all duration-150 inline-block"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="font-ui text-sm text-[#9CA3AF] hover:text-[#F5F5F5] hover:translate-x-1 transition-all duration-150 inline-block"
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="font-ui text-xs text-[#374151] text-center sm:text-left">
            © {year} iptvuksubscription.uk — All rights reserved.
          </p>
          <p className="font-ui text-xs text-[#374151] text-center sm:text-right max-w-sm">
            IPTV UK Subscription is operated by a registered LLC.
            All content is delivered via third-party IPTV providers.
          </p>
        </div>

      </div>
    </footer>
  )
}
