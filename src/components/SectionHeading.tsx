import type { ReactNode } from "react";
import clsx from "clsx";

type SectionHeadingProps = {
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

const SectionHeading = ({
  title,
  description,
  id,
  className,
}: SectionHeadingProps) => {
  return (
    <div className={clsx("flex flex-col items-start gap-4", className)}>
      <h2
        id={id}
        className="max-w-xs text-3xl font-semibold tracking-[-0.04em] text-text-primary sm:max-w-none sm:text-4xl"
      >
        {title}
      </h2>

      {description ? (
        <p className="text-base text-text-muted">{description}</p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
