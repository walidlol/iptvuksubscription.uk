// ─── WhatsApp Link Builder ───

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "212762151824";

/** Build a wa.me link with pre-filled message */
export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Pre-built messages for common CTAs */
export const WA_MESSAGES = {
  getStarted:
    "Hi, I'd like to get started with the IPTV UK subscription at £9.99/mo.",
  freeTrial:
    "Hi, I'd like to try a free trial of your IPTV UK service.",
  monthly:
    "Hi, I'd like to subscribe to the Monthly IPTV plan at £9.99/mo.",
  annual:
    "Hi, I'd like to subscribe to the Annual IPTV plan at £59/yr. (Most Popular)",
  family:
    "Hi, I'd like to subscribe to the Family IPTV plan at £129.99/yr.",
  general:
    "Hi, I'm interested in your IPTV UK subscription service.",
} as const;
