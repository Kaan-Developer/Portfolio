import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";

interface Props extends ComponentPropsWithoutRef<"a"> {
  variant?: "primary" | "secondary" | "outline";
  arrow?: boolean;
  children: ReactNode;
  link: string;
  target?: string;
}

const variants = {
  primary: "bg-black text-white hover:bg-ink",
  secondary:
    "border border-primary/20 bg-primary-light text-primary-strong shadow-soft hover:border-primary/40 hover:bg-primary-light/60",
  outline:
    "border border-black/20 bg-transparent text-black hover:border-black hover:bg-black hover:text-white",
};

const Button = ({
  variant = "primary",
  arrow = false,
  className,
  children,
  link,
  target,
  ...props
}: Props) => {
  return (
    <a
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={clsx(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 cursor-pointer whitespace-nowrap",
        "text-sm font-medium tracking-tight",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        "active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}

      {arrow && (
        <ArrowUpRight
          size={16}
          strokeWidth={2}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </a>
  );
};

export default Button;