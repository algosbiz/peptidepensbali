import type { ReactNode } from "react";

// One place for button colours, so every button on the site looks consistent.
// "light" is for buttons that sit on the black call-to-action section.
// Exported so the few real <button> elements (like "Add to cart") can reuse them.
export const buttonVariants = {
  primary:
    "bg-linear-to-b from-button to-button-dark text-white shadow-button hover:from-button-dark hover:to-button-dark",
  dark: "bg-secondary text-white hover:bg-button-dark",
  outline:
    "border border-secondary/20 text-secondary hover:border-secondary hover:bg-secondary hover:text-white",
  light: "border border-white/30 text-white hover:border-white hover:bg-white hover:text-secondary",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  newTab?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
};

// Buttons are real links (<a>), because every button on this site takes the
// visitor somewhere: a section of the page, a WhatsApp chat or the full catalogue.
export default function Button({
  href,
  children,
  variant = "primary",
  newTab = false,
  className = "",
  ariaLabel,
  onClick,
}: ButtonProps) {
  return (
    <a
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold whitespace-nowrap transition duration-200 active:scale-[0.98] ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
