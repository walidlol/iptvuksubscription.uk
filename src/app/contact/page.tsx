import { Metadata } from 'next'
import { MessageCircle, Mail, Zap, Key, Tv, CreditCard, Settings } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact IPTV UK Support | WhatsApp & Email | iptvuksubscription.uk',
  description:
    'Get support for your IPTV UK subscription. WhatsApp response in under 5 minutes, 24/7. Email support also available. We help with setup, channels, billing and more.',
  alternates: { canonical: 'https://iptvuksubscription.uk/contact/' },
  openGraph: {
    title: 'Contact IPTV UK Support | WhatsApp & Email',
    description:
      'Get support for your IPTV UK subscription. WhatsApp response in under 5 minutes, 24/7.',
    url: 'https://iptvuksubscription.uk/contact/',
  },
}

const supportTopics = [
  {
    icon: Zap,
    label: "Won't load / buffering",
    message: "Hi! I'm having buffering/loading issues with my IPTV subscription. Can you help?",
  },
  {
    icon: Key,
    label: 'Login issues',
    message: "Hi! I'm having trouble logging in to my IPTV subscription. Can you help?",
  },
  {
    icon: Tv,
    label: 'Channel problems',
    message: "Hi! I'm having issues with specific channels on my IPTV subscription. Can you help?",
  },
  {
    icon: CreditCard,
    label: 'Billing questions',
    message: "Hi! I have a question about billing for my IPTV subscription.",
  },
  {
    icon: Settings,
    label: 'Setup assistance',
    message: "Hi! I need help setting up my IPTV subscription on my device.",
  },
]

const setupLinks = [
  { label: 'Firestick Setup Guide', href: '/setup-guide/' },
  { label: 'Smart TV Setup Guide', href: '/setup-guide/' },
  { label: 'Android / Phone Setup', href: '/setup-guide/' },
  { label: 'PC / Mac Setup', href: '/setup-guide/' },
  { label: 'Full FAQ', href: '/faq/' },
]

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] min-h-screen">

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center bg-[#0A0A0A]">
        <p className="text-[#E8392A] text-xs uppercase tracking-widest mb-4 font-medium">
          SUPPORT · 24/7
        </p>
        <h1
          className="font-bebas text-white mb-6"
          style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1 }}
        >
          GET IN TOUCH
        </h1>
        <p className="text-[#9CA3AF] text-lg max-w-xl mx-auto">
          We respond to WhatsApp messages in under 5 minutes. Every day, every hour.
        </p>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Contact cards */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* WhatsApp — primary */}
          <div
            data-reveal
            className="rounded-2xl border-2 border-[#E8392A] bg-[#0A0A0A] p-10 text-center
                       shadow-[0_0_60px_rgba(232,57,42,0.2)] flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#E8392A]/10 flex items-center justify-center">
              <MessageCircle size={48} color="#E8392A" />
            </div>
            <div>
              <h2 className="font-bebas text-white text-3xl mb-2">WhatsApp Support</h2>
              <p className="text-[#E8392A] text-sm font-semibold mb-1">
                Average response: under 5 minutes
              </p>
              <p className="text-[#9CA3AF] text-sm">Available 24/7 for all subscribers</p>
            </div>
            <WhatsAppButton
              message="Hi! I need help with my IPTV subscription"
              variant="primary"
              className="w-full py-4 font-bebas text-lg tracking-wider"
            >
              CHAT ON WHATSAPP
            </WhatsAppButton>
          </div>

          {/* Email — secondary */}
          <div
            data-reveal
            className="rounded-2xl border border-[#1A1A1A] bg-[#0A0A0A] p-10 text-center
                       flex flex-col items-center gap-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center">
              <Mail size={48} color="#6B7280" />
            </div>
            <div>
              <h2 className="font-bebas text-white text-3xl mb-2">Email Support</h2>
              <p className="text-[#9CA3AF] text-sm mb-1">support@iptvuksubscription.uk</p>
              <p className="text-[#6B7280] text-sm">Response within 24 hours</p>
            </div>
            <a
              href="mailto:support@iptvuksubscription.uk"
              className="w-full py-4 font-bebas text-lg tracking-wider text-center
                         rounded-lg border border-[#E8392A]/40 text-[#E8392A]
                         hover:bg-[#E8392A] hover:text-white transition-colors block"
            >
              SEND AN EMAIL
            </a>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-[#E8392A] opacity-20" />

      {/* Support topics */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bebas text-white mb-4 text-center"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            WHAT CAN WE <span style={{ color: '#E8392A' }}>HELP WITH?</span>
          </h2>
          <p className="text-[#9CA3AF] text-center mb-12">
            Tap any topic to start a WhatsApp conversation with your issue pre-filled.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportTopics.map((topic) => {
              const Icon = topic.icon
              return (
                <a
                  key={topic.label}
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '447451296412'}?text=${encodeURIComponent(topic.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-xl border border-[#1A1A1A] bg-[#111111]
                             hover:border-[#E8392A]/60 hover:bg-[#1A0A0A] transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#1A1A1A] flex items-center justify-center
                                  group-hover:bg-[#E8392A]/10 transition-colors shrink-0">
                    <Icon size={24} color="#E8392A" />
                  </div>
                  <span className="text-[#D1D5DB] font-medium text-sm group-hover:text-white transition-colors">
                    {topic.label}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Setup guides */}
      <section className="py-20 px-6 bg-[#111111]">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-bebas text-white mb-12"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}
          >
            QUICK <span style={{ color: '#E8392A' }}>SETUP GUIDES</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {setupLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-3 p-5 rounded-xl border border-[#1A1A1A] bg-[#0A0A0A]
                           hover:border-[#E8392A]/50 transition-colors group"
              >
                <span className="text-[#E8392A]">→</span>
                <span className="text-[#9CA3AF] group-hover:text-white transition-colors text-sm">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'IPTV UK Subscription Support',
            description: 'Contact IPTV UK Subscription support via WhatsApp or email.',
            url: 'https://iptvuksubscription.uk/contact/',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              availableLanguage: 'English',
              contactOption: 'TollFree',
            },
          }),
        }}
      />
    </main>
  )
}
