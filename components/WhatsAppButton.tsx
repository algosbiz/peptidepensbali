import type { ReactNode } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/ssr";
import Button, { buttonVariants } from "./Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  ariaLabel?: string;
};

// A button that opens WhatsApp in a new tab with `message` already typed in.
export default function WhatsAppButton({
  message,
  children,
  variant = "primary",
  className,
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <Button
      href={getWhatsAppUrl(message)}
      variant={variant}
      newTab
      className={className}
      ariaLabel={ariaLabel}
    >
      <WhatsappLogo size={20} weight="fill" aria-hidden="true" />
      {children}
    </Button>
  );
}
