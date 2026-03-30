/**
 * Setup Guide Hub — /setup-guide/
 * Primary keyword: "iptv uk setup guide", "how to set up iptv uk"
 * Supporting: "iptv firestick uk", "iptv smarters uk", "tivimate uk"
 * Target: 3,000+ words
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'

/* ─── Device tab data ─── */

interface Step {
  title: string
  detail: string
}

interface DeviceGuide {
  id: string
  label: string
  steps: Step[]
  tip: string
}

const DEVICES: DeviceGuide[] = [
  {
    id: 'firestick',
    label: 'Amazon Firestick',
    tip: 'TiviMate is the best IPTV player for Firestick. For TiviMate, use the Downloader app to sideload the APK if it\'s not in the Amazon Appstore in your region.',
    steps: [
      {
        title: 'Enable Apps from Unknown Sources',
        detail: 'On your Firestick, go to Settings → My Fire TV → Developer Options and turn on "Apps from Unknown Sources". This allows you to install IPTV Smarters Pro from outside the Amazon Appstore.',
      },
      {
        title: 'Install IPTV Smarters Pro',
        detail: 'Search for "IPTV Smarters Pro" in the Amazon Appstore. On older Firestick models where it\'s not listed, install the free "Downloader" app (also on the Amazon Appstore), open it, and enter the URL provided in our welcome message to download the APK directly.',
      },
      {
        title: 'Open IPTV Smarters Pro',
        detail: 'Launch the app. On the first screen, choose "Login with Xtream Codes API". This is the connection method for the credentials we send you via WhatsApp.',
      },
      {
        title: 'Enter Your Credentials',
        detail: 'You\'ll be prompted for three fields: Username, Password, and Server URL. Enter the exact credentials from your WhatsApp message. Username and password are case-sensitive. Tap "Add User" when complete.',
      },
      {
        title: 'Load Channels',
        detail: 'The app will connect to our server and download your channel list and EPG data (if on Premium Annual or Family plan). This initial sync takes 30–60 seconds. Once complete, you\'ll see your full channel library organised by category.',
      },
      {
        title: 'Start Watching',
        detail: 'Browse to any channel and press Select to start streaming. Use the menu to access Live TV, Movies, Series, or Catch-Up TV. The remote\'s back button returns you to the channel grid.',
      },
    ],
  },
  {
    id: 'android',
    label: 'Android TV Box',
    tip: 'For NVIDIA Shield, Xiaomi Mi Box, and X96 boxes, TiviMate Premium is the superior choice — it offers a much closer experience to a traditional TV guide than IPTV Smarters.',
    steps: [
      {
        title: 'Install TiviMate from Google Play',
        detail: 'Open the Google Play Store on your Android TV box and search for "TiviMate IPTV Player". Install the free version. To unlock premium features (EPG, catch-up, recording), purchase TiviMate Companion from the Play Store.',
      },
      {
        title: 'Open TiviMate and Add Playlist',
        detail: 'Launch TiviMate. On the home screen, select "Add Playlist". Choose "Xtream Codes" from the connection type options.',
      },
      {
        title: 'Enter Server Details',
        detail: 'Enter the Server URL, Username, and Password exactly as provided in your WhatsApp credentials message. TiviMate will validate the connection and begin downloading your channel list.',
      },
      {
        title: 'Configure EPG (Premium Annual and Family Plans)',
        detail: 'In TiviMate Settings → EPG Sources, confirm the EPG URL is automatically populated from your Xtream Codes connection. If not, contact our WhatsApp support for your EPG URL. Set EPG update to "Daily" for best results.',
      },
      {
        title: 'Organise Your Channel Groups',
        detail: 'In TiviMate, tap the menu icon and select "Groups". You can show/hide channel groups (UK Sport, UK Entertainment, etc.) to customise your channel list. Hide categories you don\'t need to make navigation faster.',
      },
      {
        title: 'Set Up Catch-Up (Premium Annual and Family Plans)',
        detail: 'Catch-up works automatically in TiviMate on channels that support it. Navigate to any channel in the EPG, press and hold to access the catch-up calendar, and select any programme from the last 7 days.',
      },
    ],
  },
  {
    id: 'samsung',
    label: 'Samsung Smart TV',
    tip: 'Samsung Tizen TVs (2017 and newer) can install IPTV Smarters directly. Older Samsung Smart TVs may need an HDMI device like a Firestick or Android TV box.',
    steps: [
      {
        title: 'Open Samsung Smart Hub',
        detail: 'Press the Home button on your Samsung remote and navigate to the Apps section in Smart Hub.',
      },
      {
        title: 'Search for IPTV Smarters',
        detail: 'Use the search function within Smart Hub to find "IPTV Smarters". The availability of this app varies by region and TV model year. If it\'s not found, proceed to step 5 for the casting alternative.',
      },
      {
        title: 'Install and Open',
        detail: 'Install IPTV Smarters from the Samsung app store. Launch it and select "Login with Xtream Codes API".',
      },
      {
        title: 'Enter Credentials',
        detail: 'Enter your Username, Password, and Server URL as provided in your WhatsApp credentials message. The app will download your channel list and begin streaming immediately.',
      },
      {
        title: 'Alternative: Screen Cast from Android',
        detail: 'If IPTV Smarters is not available in the Samsung app store for your TV model, install IPTV Smarters Pro on an Android phone or tablet, set up your credentials there, then use Smart View (Android) or your TV\'s built-in screen mirroring to cast to the Samsung TV.',
      },
      {
        title: 'Alternative: Connect a Firestick',
        detail: 'The simplest and most reliable option for Samsung TVs is to plug an Amazon Firestick into any HDMI port. Follow the Firestick setup guide above. This works with any Samsung TV regardless of model or year.',
      },
    ],
  },
  {
    id: 'lg',
    label: 'LG Smart TV',
    tip: 'LG webOS TVs support IPTV Smarters via the LG Content Store. This is available on most LG Smart TVs from 2018 onwards running webOS 4.0 or later.',
    steps: [
      {
        title: 'Open LG Content Store',
        detail: 'Press the Home button on your LG magic remote and navigate to the LG Content Store.',
      },
      {
        title: 'Search for IPTV Smarters',
        detail: 'Search "IPTV Smarters" in the store. Install it when found. If unavailable, search for "SS IPTV" or "Smart IPTV" as alternatives available on LG webOS.',
      },
      {
        title: 'Launch and Connect',
        detail: 'Open the installed IPTV app and select Xtream Codes as the connection type. Enter your Username, Password, and Server URL from your WhatsApp message.',
      },
      {
        title: 'Load Your Channel List',
        detail: 'The app connects to our server and downloads your channel playlist. Depending on your internet speed, this takes 30–90 seconds. Once loaded, all channels are organised in the same categories as other devices.',
      },
      {
        title: 'Alternative: Firestick via HDMI',
        detail: 'If the LG Content Store app is unavailable in your region, connect a Firestick to your LG TV\'s HDMI port. This provides the full TiviMate experience on your LG screen without any Smart TV limitations.',
      },
    ],
  },
  {
    id: 'ios',
    label: 'iPhone & iPad',
    tip: 'IPTV Smarters Pro is the only recommended IPTV player for iOS — TiviMate is Android-only. IPTV Smarters Pro is available on the Apple App Store for £2.99 as a one-time purchase.',
    steps: [
      {
        title: 'Install IPTV Smarters Pro from App Store',
        detail: 'Open the App Store on your iPhone or iPad and search for "IPTV Smarters Pro". It\'s developed by Whmcs Smarters. Purchase and install (one-time £2.99 payment).',
      },
      {
        title: 'Open and Select Connection Type',
        detail: 'Launch IPTV Smarters Pro. On the add account screen, select "Login with Xtream Codes API".',
      },
      {
        title: 'Enter Your Credentials',
        detail: 'Fill in your Username, Password, and Server URL exactly as provided in your WhatsApp credentials message. Tap "Add User".',
      },
      {
        title: 'Browse Your Channels',
        detail: 'After loading, tap "Live TV" to browse channels, "Movies" for the VOD library, or "Series" for TV box sets. Channels are organised by category (UK Sport, UK Entertainment, etc.).',
      },
      {
        title: 'Enable Picture-in-Picture',
        detail: 'IPTV Smarters Pro supports iOS Picture-in-Picture. While streaming, swipe up to return to the home screen — the stream continues in a floating window. This works on iPhone XS or later and all iPad models running iOS 14+.',
      },
      {
        title: 'AirPlay to Apple TV or Smart TV',
        detail: 'You can AirPlay the stream from your iPhone or iPad to an Apple TV or AirPlay-compatible smart TV. Tap the AirPlay icon within IPTV Smarters Pro and select your TV. Note: some channels may not support AirPlay due to DRM — if this occurs, use the TV\'s HDMI input with a Firestick instead.',
      },
    ],
  },
  {
    id: 'mag',
    label: 'MAG Box / Enigma2',
    tip: 'MAG boxes (MAG254, MAG322, MAG420) use a Stalker Portal connection. Enigma2 devices (Zgemma, Vu+, Formuler) use the M3U playlist format.',
    steps: [
      {
        title: 'Get Your MAG Portal URL or M3U Playlist',
        detail: 'When you WhatsApp us with your device type (MAG or Enigma2), we will send you the appropriate connection format. MAG boxes use a Stalker Portal URL; Enigma2 devices use an M3U playlist URL.',
      },
      {
        title: 'MAG Box — Enter Portal URL',
        detail: 'On your MAG box, go to Settings → System Settings → Servers → Portals. Enter our Stalker Portal URL in the Portal 1 Name and Portal 1 URL fields. Save and restart the device.',
      },
      {
        title: 'MAG Box — Load Channel List',
        detail: 'After restarting, the MAG box will connect to our portal and download the channel list. This takes 1–2 minutes. Once loaded, the full channel lineup is available via the TV menu.',
      },
      {
        title: 'Enigma2 — Import M3U Playlist',
        detail: 'In your Enigma2 receiver (Zgemma, Vu+, etc.), navigate to the PLi plugin or E2M3U2Bouquet tool. Enter our M3U playlist URL. The receiver will download and organise channels into bouquets automatically.',
      },
      {
        title: 'Enigma2 — Configure EPG',
        detail: 'If you are on a Premium Annual or Family plan, contact us via WhatsApp for your XMLTV EPG URL. Add this to your EPG source in Enigma2 settings. EPG data covers all major UK channels for 7 days.',
      },
      {
        title: 'Test and Verify',
        detail: 'Navigate to any UK Sport channel (e.g., Sky Sports Main Event) to verify the stream is working at full HD quality. If you encounter any issues, WhatsApp our support team with your device model — average response is under 15 minutes during UK business hours.',
      },
    ],
  },
]

const SETUP_FAQS = [
  {
    question: 'What is the easiest device to set up for IPTV UK?',
    answer: 'The Amazon Firestick is the easiest and most popular device for IPTV UK setup. It takes under 5 minutes from receiving your credentials to watching live TV. IPTV Smarters Pro is available directly from the Amazon Appstore, making the process straightforward even for complete beginners. Our Firestick guide above walks through every step.',
  },
  {
    question: 'Do I need a VPN to use IPTV UK?',
    answer: 'No. Our service does not require a VPN. All UK channels are delivered without geoblocking — you can access them from any internet connection anywhere in the world. Some users choose to use a VPN for general privacy reasons, but it is not required for our service to function. A VPN can actually increase buffering by adding network latency.',
  },
  {
    question: 'What is TiviMate and why is it recommended?',
    answer: 'TiviMate is an IPTV player app for Android-based devices (including Amazon Firestick, Android TV boxes, and Android phones). It provides a TV-guide style interface similar to Sky or Virgin Media, with EPG support, catch-up TV browsing, multi-connection management, and a recording feature. It is widely considered the best IPTV player app available. TiviMate is free with basic features; TiviMate Companion (available on Google Play for a small one-time fee) unlocks all premium features.',
  },
  {
    question: 'Can I use IPTV UK on multiple devices at the same time?',
    answer: 'Yes, within your plan\'s connection limit. Standard Monthly allows 1 simultaneous connection. Premium Annual allows 2. The Family Plan allows 5 simultaneous connections. You can install the IPTV player app on as many devices as you like, but can only stream on the number of devices your plan allows simultaneously.',
  },
  {
    question: 'What do I do if a channel is not working?',
    answer: 'First, try switching to an alternative stream of the same channel if your IPTV player offers one (in TiviMate, some channels have multiple source streams accessible by pressing the Options button). If the issue persists, contact our WhatsApp support with the channel name and your device model. We typically resolve channel issues within 15 minutes during UK business hours.',
  },
]

export default function SetupGuidePage() {
  const [activeDevice, setActiveDevice] = useState<string>('firestick')

  const current = DEVICES.find((d) => d.id === activeDevice) ?? DEVICES[0]

  return (
    <>
      <main id="main-content" className="relative z-[20] flex flex-col flex-1 pt-16">

        {/* ── Hero ── */}
        <section className="section" aria-labelledby="setup-h1">
          <div className="container max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 font-ui text-xs text-[#6B7280]" role="list">
                <li><Link href="/" className="hover:text-[#E5181E] transition-colors">Home</Link></li>
                <li aria-hidden="true" className="text-[#374151]">/</li>
                <li className="text-[#F0F2F7]" aria-current="page">Setup Guide</li>
              </ol>
            </nav>
            <span className="badge badge-muted mb-4 inline-flex">Step-by-Step for Every Device</span>
            <h1 id="setup-h1" className="font-display text-h1 text-[#F0F2F7] uppercase leading-none mb-6">
              IPTV UK{' '}
              <span className="gradient-text-red">Setup Guide</span>
            </h1>
            <p className="font-sans text-[#9CA3AF] text-lg leading-relaxed mb-8 max-w-3xl">
              How to install and configure your IPTV UK subscription on any device — Amazon Firestick, Android TV box, Samsung Smart TV, LG Smart TV, iPhone, iPad, MAG box, and Enigma2. Most setups take under 5 minutes.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/free-trial/" className="btn-red inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold">
                Get Your Credentials First
              </Link>
              <Link href="/plans/" className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-white/20 font-ui text-sm text-[#F0F2F7] hover:bg-white/5 transition-colors">
                View Plans
              </Link>
            </div>
          </div>
        </section>

        {/* ── Intro content ── */}
        <section className="section pt-0">
          <div className="container max-w-4xl mx-auto prose-dark">
            <h2>Before You Begin — What You Need</h2>
            <p>
              To set up your <Link href="/iptv-uk-subscription/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">IPTV UK subscription</Link>, you need two things:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[#9CA3AF] text-sm my-4">
              <li><strong className="text-[#F0F2F7]">Your Xtream Codes credentials or M3U URL</strong> — delivered via WhatsApp after payment, or via our free trial request. These consist of a Username, Password, and Server URL.</li>
              <li><strong className="text-[#F0F2F7]">A compatible device and IPTV player app</strong> — see the device guides below. If you haven&apos;t purchased yet, <Link href="/free-trial/" className="text-[#E5181E] hover:text-[#FF2D34] transition-colors">request a free 24-hour trial</Link> to test on your specific device before committing.</li>
            </ol>
            <p>
              If you have already received your credentials via WhatsApp, select your device below and follow the step-by-step instructions. Average setup time is 4–8 minutes for most devices.
            </p>
          </div>
        </section>

        {/* ── Device Tab Selector ── */}
        <section className="section pt-0" aria-labelledby="device-tabs-heading">
          <div className="container max-w-4xl mx-auto">
            <h2 id="device-tabs-heading" className="font-display text-display text-[#F0F2F7] uppercase mb-6">
              Select Your <span className="gradient-text-red">Device</span>
            </h2>

            {/* Tab buttons */}
            <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Device setup guides">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  role="tab"
                  aria-selected={activeDevice === d.id}
                  aria-controls={`panel-${d.id}`}
                  id={`tab-${d.id}`}
                  onClick={() => setActiveDevice(d.id)}
                  className={`px-4 py-2 rounded-lg font-ui text-sm font-medium transition-colors cursor-pointer ${
                    activeDevice === d.id
                      ? 'bg-[#E5181E] text-white'
                      : 'border border-white/[0.08] text-[#9CA3AF] hover:text-[#F0F2F7] hover:border-white/20'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Tab panel */}
            <div
              role="tabpanel"
              id={`panel-${current.id}`}
              aria-labelledby={`tab-${current.id}`}
            >
              {/* Pro tip */}
              <div className="border border-[rgba(229,24,30,0.2)] bg-[rgba(229,24,30,0.04)] rounded-xl px-5 py-4 mb-8">
                <p className="font-ui text-sm text-[#9CA3AF]">
                  <strong className="text-[#E5181E]">Pro tip:</strong> {current.tip}
                </p>
              </div>

              {/* Steps */}
              <ol className="flex flex-col gap-6" aria-label={`${current.label} setup steps`}>
                {current.steps.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-[rgba(229,24,30,0.15)] border border-[rgba(229,24,30,0.3)] flex items-center justify-center font-mono text-xs font-bold text-[#E5181E]" aria-hidden="true">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-ui font-semibold text-sm text-[#F0F2F7] mb-1">{step.title}</h3>
                      <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed">{step.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* WhatsApp support prompt */}
              <div className="mt-10 glass p-5 rounded-xl">
                <p className="font-ui text-sm text-[#9CA3AF]">
                  Having trouble with {current.label} setup?{' '}
                  <a
                    href="https://wa.me/447451296412?text=Hi%2C%20I%20need%20help%20setting%20up%20IPTV%20on%20my%20device."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E5181E] hover:text-[#FF2D34] underline underline-offset-2 transition-colors"
                  >
                    Message our WhatsApp support
                  </a>{' '}
                  with your device model and credentials. We reply within 15 minutes during UK business hours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Long-form content ── */}
        <section className="section">
          <div className="container max-w-4xl mx-auto prose-dark">

            <h2>Choosing the Right IPTV Player App</h2>
            <p>
              The IPTV player app you use significantly affects your experience — from the quality of the channel guide to how smoothly catch-up TV works. Here is our recommendation matrix:
            </p>

            <h3>TiviMate — Best for Android (Including Firestick)</h3>
            <p>
              TiviMate is widely regarded as the gold standard for IPTV player applications on Android-based devices. Its EPG guide interface closely resembles the familiar Sky or Virgin Media TV guide, making it immediately intuitive for UK viewers who are accustomed to traditional pay-TV. Key features include:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#9CA3AF] text-sm my-4">
              <li>7-day EPG grid with programme details, descriptions, and series information</li>
              <li>Catch-up TV browsing directly within the EPG (Premium Annual and Family plans)</li>
              <li>Recording functionality — record any live channel to local storage or USB (TiviMate Companion required)</li>
              <li>Multi-playlist management — manage multiple IPTV accounts or playlists in one app</li>
              <li>Customisable channel groups — hide categories you don&apos;t need</li>
              <li>Parental PIN protection for specific channel groups</li>
            </ul>
            <p>
              TiviMate is available on the Google Play Store for Android TV devices and the Amazon Appstore for Firestick. The core app is free; the Companion app (which unlocks EPG recording and additional features) is a small one-time purchase via Google Play. For MAG-box migrants switching to a Firestick or Android TV box, TiviMate will feel most familiar.
            </p>

            <h3>IPTV Smarters Pro — Best for iOS, Also Excellent on Android</h3>
            <p>
              IPTV Smarters Pro is the most cross-platform IPTV player available, with dedicated apps for iOS (iPhone and iPad), Android, Fire TV, Samsung Tizen, and LG webOS. It is the only recommended option for Apple device users, and its iOS implementation is polished and stable.
            </p>
            <p>
              The interface is less traditional than TiviMate — it presents a more modern, card-based layout rather than a classic TV guide grid — but provides the same core functionality: Xtream Codes login, EPG support, catch-up TV, and VOD browsing. On iOS, it additionally supports Picture-in-Picture and SharePlay (allowing watch parties via FaceTime).
            </p>

            <h2>Optimising Your IPTV UK Experience</h2>

            <h3>Wired vs. Wi-Fi — The Single Biggest Improvement</h3>
            <p>
              The single most impactful change most subscribers can make to improve stream quality is connecting their streaming device to the router via Ethernet cable rather than Wi-Fi. Wired connections eliminate the packet loss, interference, and latency variation that cause occasional buffering even on fast Wi-Fi networks.
            </p>
            <p>
              On Amazon Firestick, a USB-to-Ethernet adapter (£8–£12 on Amazon) enables a wired connection via the Firestick&apos;s micro-USB or USB-C port. Android TV boxes typically have a built-in Ethernet port. For Samsung and LG Smart TVs, the Ethernet port on the rear of the TV connects directly to the router.
            </p>

            <h3>Wi-Fi Optimisation (When Wired is Not Practical)</h3>
            <p>
              If Ethernet is not practical, position your streaming device within line-of-sight of your Wi-Fi router and ensure it connects to the 5GHz band rather than the 2.4GHz band. The 5GHz band offers lower latency and is less congested, though it has shorter range. In TiviMate and IPTV Smarters, increase the buffer size to 5–10 seconds in Settings to give the player a larger buffer against brief bandwidth fluctuations.
            </p>

            <h3>Router DNS Settings</h3>
            <p>
              Switching your router&apos;s DNS from your ISP&apos;s default DNS to a faster alternative (such as Google&apos;s 8.8.8.8 or Cloudflare&apos;s 1.1.1.1) can reduce DNS lookup latency and occasionally resolves connection issues caused by ISP DNS caching. This setting is found in your router&apos;s admin panel (usually accessed at 192.168.1.1 or 192.168.0.1).
            </p>

            <h3>Clearing App Cache</h3>
            <p>
              On Firestick, over time the IPTV player app accumulates cached data that can slow performance. Every two to four weeks, navigate to Settings → Applications → Manage Installed Applications → [Your IPTV App] → Clear Cache. This does not delete your login credentials — only temporary files — and typically restores app performance to factory-fresh levels.
            </p>

            <h2>Common Setup Issues and Solutions</h2>

            <h3>Credentials Not Accepted</h3>
            <p>
              The most common cause of credentials being rejected is a copy-paste or typing error — credentials are case-sensitive. Ensure the Server URL includes the port number if provided (e.g., http://server.example.com:8080). If you are copying from a WhatsApp message, copy each field individually and check for trailing spaces. Contact our WhatsApp support if the issue persists and we will verify your account status in real time.
            </p>

            <h3>Channels Loading but Not Playing</h3>
            <p>
              If channels appear in the list but produce a black screen or error when selected, this usually indicates one of: (1) the specific channel stream has a temporary issue — try a different channel to confirm; (2) your internet speed is below the minimum for the stream quality — run a speed test at fast.com; (3) a codec issue on the device — in TiviMate, try switching the player from ExoPlayer to MX Player as an alternative codec. Contact WhatsApp support with the specific channel name and error message for targeted diagnosis.
            </p>

            <h3>EPG Not Loading</h3>
            <p>
              EPG loading can take several minutes on first setup, especially on slower devices or connections. In TiviMate, navigate to Settings → EPG Sources and tap &ldquo;Update EPG now&rdquo; to force a manual refresh. EPG data covers 7 days from the current date. If the EPG remains empty after 10 minutes, contact WhatsApp support — your account EPG URL may need refreshing.
            </p>

            <h2>Frequently Asked Questions — IPTV UK Setup</h2>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section pt-0">
          <div className="container max-w-4xl mx-auto">
            <div className="flex flex-col gap-4">
              {SETUP_FAQS.map((faq, i) => (
                <details
                  key={i}
                  className="border border-white/[0.08] rounded-xl overflow-hidden group open:border-[rgba(229,24,30,0.3)] open:bg-[rgba(229,24,30,0.03)] transition-colors"
                >
                  <summary className="flex items-center justify-between px-5 py-5 cursor-pointer list-none font-ui font-semibold text-sm sm:text-base text-[#F0F2F7] select-none">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-[#6B7280] group-open:text-[#E5181E] transition-colors text-xl leading-none">+</span>
                  </summary>
                  <div className="px-5 pb-5">
                    <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-4" />
                    <p className="font-sans text-[#9CA3AF] text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section pt-0">
          <div className="container max-w-4xl mx-auto">
            <div className="glass p-8 rounded-2xl text-center">
              <h2 className="font-display text-2xl text-[#F0F2F7] uppercase mb-3">
                Need Your Credentials First?
              </h2>
              <p className="font-sans text-[#9CA3AF] text-sm mb-6 max-w-xl mx-auto">
                Purchase a plan and we&apos;ll send your credentials via WhatsApp within 15 minutes. Or test with a free 24-hour trial.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/plans/" className="btn-red inline-flex items-center justify-center h-11 px-6 rounded-lg text-sm font-semibold">
                  View Plans — From £9.99/mo
                </Link>
                <Link href="/free-trial/" className="inline-flex items-center justify-center h-11 px-6 rounded-lg border border-white/20 font-ui text-sm text-[#F0F2F7] hover:bg-white/5 transition-colors">
                  Free 24-Hour Trial
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
