import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<"a"> {
  variant?: "primary" | "secondary";
  arrow?: boolean;
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  arrow = false,
  className,
  children,
  ...props
}: Props) => {
  return (
    <a
      className={clsx(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full px-6",
        "text-sm font-medium tracking-tight",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        variant === "primary"
          ? "bg-linear-to-b from-primary-soft to-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_14px_color-mix(in_srgb,var(--color-primary)_30%,transparent)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_24px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
          : "border border-primary/20 bg-linear-to-b from-white to-primary-light text-primary hover:border-primary-soft hover:shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      )}
    </a>
  );
};

export default Button;