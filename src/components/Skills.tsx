import type { IconType } from "react-icons";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";

type Skill = {
  name: string;
  icon: IconType;
  color: string;
  note: string;
};

const coreSkills: Skill[] = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", note: "Core language" },
  { name: "React", icon: SiReact, color: "#61DAFB", note: "Interface development" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8", note: "Responsive styling" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26", note: "Semantic markup" },
  { name: "CSS3", icon: SiCss, color: "#1572B6", note: "Layouts and UI" }, 
];

const learningSkills: Skill[] = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", note: "Currently learning" },
];

type SkillGroupProps = {
  title: string;
  description: string;
  skills: Skill[];
  accent?: boolean;
};

const SkillGroup = ({
  title,
  description,
  skills,
  accent = false,
}: SkillGroupProps) => (
  <div>
    <div className="mb-3 flex items-end justify-between gap-4">
      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-text-primary">
        {title}
      </h3>
      <p className="hidden text-xs text-text-muted sm:block">{description}</p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <article
            key={skill.name}
            className={[
              "flex min-h-32 flex-col justify-between rounded-panel border bg-surface p-4 shadow-card ",
              accent ? "border-accent/30" : "border-border",
            ].join(" ")}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background-deep">
                <Icon size={25} style={{ color: skill.color }} aria-hidden="true" />
              </div>
              <span
                className={[
                  "rounded-full px-2 py-1 font-mono text-[0.55rem] uppercase tracking-[0.1em]",
                  accent
                    ? "bg-accent/10 text-accent"
                    : "bg-background-deep text-text-muted",
                ].join(" ")}
              >
                {skill.note}
              </span>
            </div>

            <span className="mt-5 text-sm font-medium text-text-primary">
              {skill.name}
            </span>
          </article>
        );
      })}
    </div>
  </div>
);

const Skills = () => {
  return (
    <section aria-labelledby="skills-heading">
      <SectionHeading
        id="skills-heading"
        title="Skills & Learning"
        description="The tools I use today and the technologies I am actively learning."
        className="mb-6"
      />

      <div className="space-y-8">
        <SkillGroup
          title="Core toolkit"
          description="Technologies I use in my current projects"
          skills={coreSkills}
        />
        <SkillGroup
          title="Currently learning"
          description="Learning by building, not just watching tutorials"
          skills={learningSkills}
          accent
        />
      </div>
    </section>
  );
};

export default Skills;
