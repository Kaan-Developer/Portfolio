import { Activity, Layers, MapPin, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "../../data/site";

const icons: Record<string, LucideIcon> = {
  status: Activity,
  stack: Layers,
  tools: Wrench,
  location: MapPin,
};

const Stats = () => {
  return (
    <section className="mx-auto mb-1 max-w-7xl px-6 md:px-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-3xl border border-border bg-white p-5 shadow-soft md:flex md:gap-0 md:divide-x md:divide-border md:rounded-full md:px-4 md:py-4">
        {site.stats.map((stat) => {
          const Icon = icons[stat.icon];

          return (
            <div
              key={stat.label}
              className="flex min-w-0 items-center gap-3 md:flex-1 md:justify-center md:px-4"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                {Icon && <Icon size={18} strokeWidth={1.8} aria-hidden="true" />}

                {stat.pulse && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                )}
              </span>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-widest text-subtle">
                  {stat.label}
                </p>
                <p className="text-sm font-semibold leading-snug text-black">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;