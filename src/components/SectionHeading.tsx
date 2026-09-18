import type { ReactNode } from "react";
import clsx from "clsx";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  as?: HeadingTag;
  layout?: "row" | "column";
  className?: string;
  children?: ReactNode;
};

const SectionHeading = ({
  title,
  description,
  id,
  as: Heading = "h2",
  layout = "column",
  className,
  children,
}: SectionHeadingProps) => {
  return (
    <div
      className={clsx(
        "flex gap-4",
        layout === "row"
          ? "items-end justify-between"
          : "flex-col items-start",
        className,
      )}
    >
      <Heading
        id={id}
        className="max-w-xs text-3xl font-semibold tracking-[-0.04em] text-text-primary sm:max-w-none sm:text-4xl"
      >
        {title}
      </Heading>

      {description ? (
        <p
          className={clsx(
            "text-text-muted",
            layout === "row"
              ? "max-w-36 text-right text-sm leading-5 sm:max-w-none"
              : "text-base",
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </div>
  );
};

export default SectionHeading;
