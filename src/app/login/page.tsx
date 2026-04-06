import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your IPTV UK Subscription account to access channels, setup guides, and premium features.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Full-screen video background ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      >
        <source src="/login-bg.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay ── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(0, 0, 0, 0.6)" }}
      />

      {/* ── Subtle cinematic gradient on top ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(24,57,73,0.25) 0%, transparent 70%)",
        }}
      />

      {/* ── Centered glass card ── */}
      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo + tagline */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Image
              src="/icon.png"
              width={56}
              height={56}
              alt="IPTV UK Subscription"
              className="rounded-full"
              priority
            />
          </div>
          <h1 className="font-heading text-3xl tracking-wider text-text-primary uppercase">
            IPTV UK
          </h1>
          <p className="mt-2 text-text-secondary text-sm">
            Your streaming universe awaits
          </p>
        </div>

        {/* LiquidGlass form card */}
        <div className="glass p-6 sm:p-8">
          <LoginForm />
        </div>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs text-text-muted">
          By signing in, you agree to our{" "}
          <a
            href="/terms"
            className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy-policy"
            className="text-text-secondary hover:text-text-primary underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
