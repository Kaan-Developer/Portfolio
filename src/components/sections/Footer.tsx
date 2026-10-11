import Logo from "../../assets/images/Logo.svg";
import { site, socialLinks } from "../../data/site";
import Ul from "../ui/Ul";

const Footer = () => {
  const footer = site;

  return (
    <section className="flex flex-col w-full shadow-soft bg-white p-8">
      <div className="flex w-full flex-col items-start justify-between gap-6 xl:flex-row xl:items-center">
        <div className="flex items-center gap-3">
          <div className="shrink-0 shadow-soft rounded-full bg-white">
            <img src={Logo} alt="Logo" />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h1 className="text-balance text-3xl lg:text-5xl font-semibold leading-[0.95] tracking-[0.01em]">
              {footer.name}
            </h1>
            <span className="text-muted text-xl lg:text-2xl font-semibold">
              {footer.role}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.href}
                href={item.href}
                className="relative flex shrink-0 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-white"
              >
                <Icon size={28} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-start justify-start mt-8">
        {footer.bubbles.map((item) => {
          return (
            <ul key={item.label}>
              <a target="" className="text-balance font-medium text-lg lg:text-xl" href={`#${item.target}`}>{item.label}</a>
            </ul>
          );
        })}
      </div>
    </section>
  );
};

export default Footer;
