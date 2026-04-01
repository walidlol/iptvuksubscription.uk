"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { waLink } from "@/lib/wa";

type Step = "phone" | "code";

interface ApiResponse {
  success: boolean;
  step?: string;
  code?: string;
  message?: string;
  error?: string;
}

export default function OTPForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [displayCode, setDisplayCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Auto-focus first OTP input when switching to code step
  useEffect(() => {
    if (step === "code") {
      inputRefs.current[0]?.focus();
    }
  }, [step]);

  // ─── Step 1: Request Code ───
  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Something went wrong");
        return;
      }

      // MVP: API returns the code to display on screen
      setDisplayCode(data.code ?? "");
      setStep("code");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─── Step 2: Verify Code ───
  async function handleCodeSubmit(code: string) {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success) {
        setError(data.error ?? "Invalid code");
        setOtpDigits(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        return;
      }

      // Session cookie is set by the API — redirect to home or previous page
      router.push("/");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ─── OTP Input Handlers ───
  function handleOTPChange(index: number, value: string) {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...otpDigits];
    updated[index] = digit;
    setOtpDigits(updated);

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are entered
    const fullCode = updated.join("");
    if (fullCode.length === 6) {
      handleCodeSubmit(fullCode);
    }
  }

  function handleOTPKeyDown(index: number, key: string) {
    if (key === "Backspace" && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handleOTPPaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const digits = pasted.split("");
      setOtpDigits(digits);
      handleCodeSubmit(pasted);
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      {step === "phone" ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-text-secondary mb-2"
            >
              UK Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07451 296 412"
              required
              autoFocus
              className="w-full px-4 py-3 bg-bg-elevated border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-sm text-brand-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !phone.trim()}
            className="w-full py-3 bg-brand-red hover:bg-brand-red-hover disabled:opacity-50 disabled:cursor-not-allowed text-text-primary font-semibold rounded-lg transition-colors"
          >
            {loading ? "Sending..." : "Get Verification Code"}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* MVP: Show the code on screen */}
          {displayCode && (
            <div className="p-4 rounded-lg bg-bg-elevated border border-border text-center">
              <p className="text-sm text-text-muted mb-2">
                Send this code to our WhatsApp to verify:
              </p>
              <p className="font-heading text-3xl tracking-widest text-text-primary">
                {displayCode}
              </p>
              <a
                href={waLink(`My verification code is: ${displayCode}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-sm text-brand-red hover:text-brand-red-hover transition-colors underline underline-offset-2"
              >
                Open WhatsApp
              </a>
            </div>
          )}

          {/* OTP Input */}
          <div>
            <p className="text-sm text-text-secondary mb-3 text-center">
              Enter your 6-digit verification code
            </p>
            <div
              className="flex gap-2 justify-center"
              onPaste={handleOTPPaste}
            >
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOTPChange(i, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(i, e.key)}
                  className="w-12 h-14 text-center text-xl font-bold bg-bg-elevated border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {error && (
            <p className="text-sm text-brand-red text-center">{error}</p>
          )}

          {loading && (
            <p className="text-sm text-text-muted text-center">Verifying...</p>
          )}

          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              setStep("phone");
              setOtpDigits(["", "", "", "", "", ""]);
              setDisplayCode("");
              setError("");
            }}
            className="w-full text-sm text-text-muted hover:text-text-primary transition-colors text-center"
          >
            Use a different number
          </button>
        </div>
      )}
    </div>
  );
}
