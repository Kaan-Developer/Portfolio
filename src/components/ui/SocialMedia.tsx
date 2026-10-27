import { socialLinks } from "../../data/socialLinks";
import { useSite } from "../../hooks/useSite";

const SocialMedia = () => {
  const site = useSite();

  return (
    <nav
      aria-label={site.accessibility.contactNavigation}
      className="mt-6 flex flex-wrap gap-3"
    >
      {socialLinks.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-border bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-border-strong hover:bg-primary-light hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <Icon size={18} aria-hidden="true" />
          {name}
          <span className="sr-only"> {site.accessibility.opensInNewTab}</span>
        </a>
      ))}
    </nav>
  );
};

export default SocialMedia;
