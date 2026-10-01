import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";

interface Props extends ComponentPropsWithoutRef<"a"> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

const Button = ({ variant = "primary", className, children, ...props }: Props) => {
  return (
    <a
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5",
        variant === "primary"
          ? "bg-primary text-white shadow-soft hover:bg-primary-soft hover:shadow-medium"
          : "border border-border-strong bg-white text-black hover:border-primary-soft hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export default Button;