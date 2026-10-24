import { FaGithub, FaXTwitter } from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface SocialLink {
  name: string;
  username: string;
  href: string;
  icon: IconType;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    username: "@Kaan-Developer",
    href: "https://github.com/Kaan-Developer",
    icon: FaGithub,
  },
  {
    name: "X",
    username: "@KHamitler78641",
    href: "https://x.com/KHamitler78641",
    icon: FaXTwitter,
  },
];
