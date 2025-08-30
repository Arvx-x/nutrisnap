import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-medium transition active:scale-[0.99]";
    const variants: Record<string, string> = {
      primary:
        "bg-[var(--sage)] text-[#1f3b2f] shadow-soft-lg hover:opacity-95",
      ghost:
        "bg-transparent text-[var(--foreground)] border border-black/10 hover:bg-black/5",
    };
    return (
      <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props} />
    );
  }
);
Button.displayName = "Button";


