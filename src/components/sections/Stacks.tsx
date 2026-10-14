import { site } from "../../data/site";
import { techIcons } from "../../data/techIcons";

const Stacks = () => {
  const about = site.about[0];
  const groups = [
    { title: "Technologies", items: about.tech },
    { title: "Tools", items: about.tools },
  ];

  return (
    <div className="w-full max-w-xl">
      <h3 className="mb-3 text-3xl font-semibold leading-[0.95] tracking-tight text-balance md:text-5xl">
        What I work with
      </h3>

      {groups.map((group) => (
        <section
          key={group.title}
          className="py-7 first:border-b first:border-border first:pt-0 last:pb-0"
        >
          <h4 className="mb-6 text-2xl font-bold tracking-tight">
            {group.title}
          </h4>

          <ul className="grid grid-cols-2 gap-x-3 gap-y-7 md:gap-x-6 lg:grid-cols-3">
            {group.items.map((name) => {
              const Icon = techIcons[name];

              return (
                <li key={name} className="flex min-w-0 items-center gap-2 md:gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black p-2 text-white">
                    <Icon size={24} className="shrink-0" aria-hidden="true" />
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
    </div>
  );
};

export default Stacks;
