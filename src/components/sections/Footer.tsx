import Logo from "../../assets/images/Logo.svg";
import { site, socialLinks } from "../../data/site";
import { splineCredit } from "../../data/splineCredit";
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
            <h2 className="text-balance text-3xl lg:text-5xl font-semibold leading-[0.95] tracking-[0.01em]">
              {footer.name}
            </h2>
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

      <div className="mt-8 flex justify-center border-y border-border py-4">
        <Ul inline />
      </div>

      <section
        aria-labelledby="model-credit-heading"
        className="flex flex-col items-start justify-between gap-6 pt-6 text-sm leading-6 sm:flex-row"
      >
        <div className="min-w-0">
          <h2 id="model-credit-heading" className="font-semibold">
            3D model credit
          </h2>
          <p className="mt-2">
            <a
              href={splineCredit.sourceUrl}
              className="underline underline-offset-4 hover:text-primary"
            >
              {splineCredit.title}
            </a>{" "}
            by{" "}
            <a
              href={splineCredit.creatorUrl}
              className="underline underline-offset-4 hover:text-primary"
            >
              {splineCredit.creator} ({splineCredit.creatorHandle})
            </a>
            . Licensed under{" "}
            <a
              href={splineCredit.licenseUrl}
              className="underline underline-offset-4 hover:text-primary"
            >
              {splineCredit.license}
            </a>
            .
          </p>
          <p className="mt-1">{splineCredit.modifications}</p>
        </div>
        <p className="shrink-0 self-end text-right text-muted sm:self-start">
          © {new Date().getFullYear()} {footer.name}
        </p>
      </section>
    </section>
  );
};

export default Footer;
