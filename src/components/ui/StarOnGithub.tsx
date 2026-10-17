import Ul from "./Ul";
import { ArrowUpRight } from "lucide-react";

const contactLinks = [{
  label: (
    <span className="inline-flex items-center gap-2">
      Contact
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </span>
  ),
  target: "contact",
}];

const StarOnGitHub = ({ mobile = false }: { mobile?: boolean }) => (
  <Ul
    inline
    mobile={mobile}
    links={contactLinks}
    ariaLabel="Contact navigation"
  />
);

export default StarOnGitHub;
