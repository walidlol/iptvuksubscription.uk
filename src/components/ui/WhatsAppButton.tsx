import Link from "next/link";
import { waLink } from "@/lib/wa";

type ButtonVariant = "primary" | "secondary" | "white";
type ButtonSize = "sm" | "md" | "lg";

interface WhatsAppButtonProps {
  readonly message: string;
  readonly children: React.ReactNode;
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-red hover:bg-brand-red-hover text-text-primary shadow-brand-glow hover:shadow-lg",
  secondary:
    "border border-border text-text-primary hover:bg-bg-elevated/50 backdrop-blur-sm",
  white:
    "bg-text-primary hover:bg-text-secondary text-bg-primary font-semibold",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export default function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: WhatsAppButtonProps) {
  return (
    <Link
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
