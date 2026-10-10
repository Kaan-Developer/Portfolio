import { Activity, Layers, MapPin } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "../../data/site";
import type { ProfileSummaryItem } from "../../types/site";

const icons: Record<ProfileSummaryItem["icon"], LucideIcon> = {
  status: Activity,
  focus: Layers,
  location: MapPin,
};

const ProfileSummary = () => {
  return (
    <section className="mx-auto mb-1 max-w-7xl px-6 md:px-10">
      <div className="grid grid-cols-2 gap-x-4 gap-y-5 rounded-3xl border border-border bg-white p-5 shadow-soft md:flex md:gap-0 md:divide-x md:divide-border md:rounded-full md:px-4 md:py-8">
        {site.profileSummary.map((item) => {
          const Icon = icons[item.icon];

          return (
            <div
              key={item.label}
              className="flex min-w-0 items-center gap-3 md:flex-1 md:justify-center md:px-4"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white">
                <Icon size={18} strokeWidth={1.8} aria-hidden="true" />

                {item.pulse && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  </span>
                )}
              </span>

              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-widest text-subtle">
                  {item.label}
                </p>

                <p className="text-sm font-semibold leading-snug text-black">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileSummary;
