import { NavLink } from "react-router-dom";

const Links = [
  { text: "Work", link: "/" },
  { text: "Skills", link: "/skills" },
  { text: "Projects", link: "/projects" },
  { text: "About", link: "/about" },
];

interface UlProps {
  variant?: "topnav" | "sidebar";
}

const Ul = ({ variant = "topnav" }: UlProps) => {
  const isSidebar = variant === "sidebar";

  return (
    <ul
      className={
        isSidebar
          ? "flex w-full flex-col items-start gap-1"
          : "hidden items-center gap-1 lg:flex"
      }
    >
      {Links.map((linkItem) => (
        <li key={linkItem.link} className={isSidebar ? "w-full" : ""}>
          <NavLink
            to={linkItem.link}
            end={linkItem.link === "/"}
            className={({ isActive }) => {
              if (isSidebar) {
                return `group relative inline-flex h-10 w-full min-w-0 items-center justify-start gap-3 overflow-hidden rounded-pill border px-4 py-2.5 text-sm font-medium tracking-[0.08em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background-deep ${
                  isActive
                    ? "border-accent/20 bg-accent/8 text-text-primary shadow-inner"
                    : "border-transparent text-text-secondary hover:translate-x-0.5 hover:border-border-hover hover:bg-surface-hover/80 hover:text-text-primary hover:shadow-inner"
                }`;
              }

              return `group relative inline-flex h-10 min-w-[88px] items-center justify-center overflow-hidden rounded-pill border px-5 py-2.5 text-[13px] font-medium tracking-[0.08em] transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background-deep ${
                isActive
                  ? "border-border-strong bg-surface/60 text-text-primary shadow-inner"
                  : "border-transparent text-text-secondary hover:-translate-y-0.5 hover:border-border-hover hover:bg-surface-hover/80 hover:text-text-primary hover:shadow-button"
              } after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:-translate-x-1/2 after:rounded-pill after:bg-accent after:shadow-accent after:transition-[width,opacity] after:duration-250 after:ease-smooth ${
                isActive
                  ? "after:w-8 after:opacity-100"
                  : "after:opacity-0 hover:after:w-8 hover:after:opacity-100"
              }`;
            }}
          >
            {({ isActive }) => (
              <>
                {isSidebar && (
                  <span
                    className={`h-1 w-1 shrink-0 rounded-full bg-accent shadow-[0_0_0_3px_rgb(var(--c-accent)/0.10)] transition-[opacity,transform] duration-200 ease-smooth ${
                      isActive
                        ? "scale-100 opacity-100"
                        : "scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    }`}
                  />
                )}

                <span>{linkItem.text}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Ul;
