import type { Metadata } from "next";
import OTPForm from "@/components/auth/OTPForm";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your IPTV UK Subscription account to access channels, setup guides, and premium features.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-red mb-4">
            <span className="font-heading text-2xl text-text-primary leading-none">
              TV
            </span>
          </div>
          <h1 className="font-heading text-3xl tracking-wider text-text-primary uppercase">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-text-muted">
            Verify your phone number to access premium content
          </p>
        </div>

        {/* Card */}
        <div className="bg-bg-surface border border-border rounded-xl p-6 sm:p-8">
          <OTPForm />
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
