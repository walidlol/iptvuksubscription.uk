import GlassButton from "@/components/ui/GlassButton";
import { waLink } from "@/lib/wa";

interface WhatsAppButtonProps {
  readonly message: string;
  readonly children: React.ReactNode;
  readonly variant?: "primary" | "secondary" | "ghost";
  readonly size?: "sm" | "md" | "lg";
  readonly className?: string;
}

export default function WhatsAppButton({
  message,
  children,
  variant = "primary",
  size = "md",
  className,
}: WhatsAppButtonProps) {
  return (
    <GlassButton
      href={waLink(message)}
      variant={variant}
      size={size}
      className={className}
    >
      {children}
    </GlassButton>
  );
}
