import { useSite } from "../../hooks/useSite";
import { techIcons } from "../../data/techIcons";
import Reveal from "../ui/Reveal";

const Stacks = () => {
  const site = useSite();
  const about = site.about[0];
  const groups = [
    { title: site.skills.technologies, items: about.tech },
    { title: site.skills.tools, items: about.tools },
  ];

  return (
    <Reveal className="w-full max-w-xl">
              <h3 className="mb-3 text-3xl font-bold leading-[0.95] tracking-tight text-balance md:text-5xl">
        {site.skills.title}
      </h3>

      {groups.map((group) => (
        <section
          key={group.title}
          className="py-7 first:border-b first:border-border first:pt-0 last:pb-0"
        >

          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-3">
            {group.items.map((name) => {
              const Icon = techIcons[name];

              return (
                <li key={name} className="flex min-w-0 items-center gap-2 md:gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center p-2 text-balance">
                       {Icon && <Icon size={24} className="shrink-0" aria-hidden="true" />}
                  </div>
                                      <span className="min-w-0 break-words text-sm font-medium text-ink">
                    {name}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </Reveal>
  );
};

export default Stacks;
