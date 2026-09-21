import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaGithub, FaTelegram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { ExternalLink } from "lucide-react";

interface FollowItem {
    icon: IconType;
    title: string;
    p: string;
    connectIcon: LucideIcon;
    href?: string;
}

const followCardClassName =
  "group flex min-h-[72px] w-full cursor-pointer items-center gap-4 rounded-xl border border-border-strong bg-surface/45 px-4 py-3.5 transition-all duration-200 hover:border-accent/70 hover:bg-accent/5 hover:shadow-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40";

const followLinks: FollowItem[] = [
  {
    icon: FaGithub,
    title: "GitHub",
    p: "Explore my repositories and open-source projects",
    connectIcon: ExternalLink,
    href: "https://github.com/Kaan-Developer",
  },
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    p: "Reach out to me directly via WhatsApp",
    connectIcon: ExternalLink,
  },
  {
    icon: FaTelegram,
    title: "Telegram",
    p: "Get in touch with me on Telegram",
    connectIcon: ExternalLink,
  },
  {
    icon: FaXTwitter,
    title: "X",
    p: "Follow me and stay updated with my posts",
    connectIcon: ExternalLink,
  },
];

const SocialMedias = () => {
  return (
    <>
      {followLinks.map((item) => {
        const Icon = item.icon;
        const ConnectIcon = item.connectIcon;
        const content = (
          <>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border bg-background-deep text-text-primary transition-colors duration-200 group-hover:border-accent/30 group-hover:bg-accent group-hover:text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-text-primary">
                {item.title}
              </h3>
              <p className="mt-1 text-xs text-text-muted">{item.p}</p>
            </div>

            <ConnectIcon
              className="h-[18px] w-[18px] shrink-0 text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              strokeWidth={1.7}
              aria-hidden="true"
            />
          </>
        );

        if (item.href) {
          return (
            <a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${item.title} in a new tab`}
              className={followCardClassName}
            >
              {content}
            </a>
          );
        }

        return (
          <div
            key={item.title}
            className={followCardClassName}
          >
            {content}
          </div>
        );
      })}
    </>
  );
};

export default SocialMedias;