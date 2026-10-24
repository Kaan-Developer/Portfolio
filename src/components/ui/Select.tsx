import clsx from "clsx";
import { Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  id: string;
  name: string;
  options: SelectOption[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const Select = ({
  id,
  name,
  options,
  value,
  className,
  onChange,
}: Props) => {
  return (
    <div id={id} className={clsx("flex flex-wrap gap-2", className)}>
      {options.map((item) => (
        <label key={item.value} className="cursor-pointer">
          <input
            type="radio"
            name={name}
            value={item.value}
            checked={value === item.value}
            onChange={() => onChange(item.value)}
            className="peer sr-only"
          />
          <span className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-md border border-border bg-white px-3.5 py-2 text-xs text-black transition-colors hover:border-primary/50 peer-checked:border-primary peer-checked:bg-primary-light peer-checked:text-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-primary motion-reduce:transition-none">
            {value === item.value && (
              <Check size={14} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
            )}
            {item.label}
          </span>
        </label>
      ))}
    </div>
  );
};

export default Select;
