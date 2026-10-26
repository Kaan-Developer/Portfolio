import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SiGithub } from "react-icons/si";


interface Props extends ComponentPropsWithoutRef<"a"> {
  variant?: "primary" | "blue" | "secondary" | "outline";
  arrow?: boolean;
  arrowDirection?: "up-right" | "right";
  github?: boolean;
  iconSize?: number;
  children?: ReactNode;
  link: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const variants = {
  primary: "bg-black text-white hover:bg-ink",
  blue: "bg-primary-soft text-white hover:bg-primary-soft-hover hover:text-white",
  secondary:
    "border border-primary/20 bg-primary-light shadow-soft hover:border-primary/40 hover:bg-primary-light/60",
  outline:
    "border border-black/15 bg-transparent text-black hover:border-black/30 hover:bg-black hover:text-white",
};

const Button = ({
  variant = "primary",
  arrow = false,
  arrowDirection = "up-right",
  github = false,
  iconSize = 18,
  className,
  children,
  link,
  target,
  onClick,
  ...props
}: Props) => {
  return (
    <a
      onClick={onClick}
      href={link}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={clsx(
        "group inline-flex h-12 items-center justify-center gap-2 rounded-md cursor-pointer whitespace-nowrap",
        github ? "px-5" : "px-7",
        "text-sm font-medium tracking-tight",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        "active:scale-[0.98]",
        "motion-reduce:transition-none motion-reduce:active:scale-100",
        variants[variant],
        className,
      )}
      {...props}
    >
      {github ? (
        <span className="inline-flex items-center gap-2 text-sm font-semibold leading-none">
          <SiGithub size={iconSize} className="shrink-0" aria-hidden="true" />
          <span>{children}</span>
        </span>
      ) : (
        children
      )}

      {arrow &&
        (arrowDirection === "right" ? (
          <ArrowRight
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        ) : (
          <ArrowUpRight
            size={16}
            strokeWidth={2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        ))}
    </a>
  );
};

export default Button;
