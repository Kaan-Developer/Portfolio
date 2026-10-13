import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  id: string;
  name: string;
  placeholder: string;
  options: SelectOption[];
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
}

const Select = ({
  id,
  name,
  placeholder,
  options,
  defaultValue = "",
  className,
  onChange,
}: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selected = options.find((item) => item.value === value);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Reset together with the surrounding form (form.reset())
  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;

    const handleReset = () => setValue("");
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, []);

  const handleSelect = (optionValue: string) => {
    setValue(optionValue);
    onChange?.(optionValue);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className={clsx("relative", className)}>
      <input type="hidden" name={name} value={value} readOnly />

      <button
        ref={triggerRef}
        id={id}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-controls={open ? `${id}-options` : undefined}
        aria-expanded={open}
        className={clsx(
          "flex h-12 w-full items-center justify-between gap-3 rounded-md border bg-white px-4 text-left outline-none transition duration-200",
          open ? "border-black" : "border-border hover:border-border-strong",
          "focus:border-primary focus:ring-4 focus:ring-primary-light",
          selected ? "text-ink" : "text-muted",
        )}
      >
        <span className="truncate">{selected ? selected.label : placeholder}</span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className={clsx(
            "shrink-0 transition-transform duration-200",
            open ? "rotate-180 text-black" : "text-muted",
          )}
        />
      </button>

      {open && (
        <ul
          id={`${id}-options`}
          className="animate-select-pop absolute inset-x-0 top-[calc(100%+8px)] z-50 max-h-64 overflow-y-auto rounded-xl border border-border bg-white p-1.5 shadow-medium"
        >
          {options.map((item) => {
            const isSelected = item.value === value;

            return (
              <li key={item.value}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => handleSelect(item.value)}
                className={clsx(
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3.5 py-3 text-left text-sm font-medium transition-colors duration-150",
                  isSelected
                    ? "bg-primary-light text-primary-strong"
                    : "text-ink hover:bg-primary-light hover:text-primary-strong",
                )}
              >
                <span>{item.label}</span>
                {isSelected && (
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
                )}
              </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Select;
