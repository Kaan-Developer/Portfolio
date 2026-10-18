import Ul from "./Ul";
import { ArrowUpRight } from "lucide-react";

const contactLinks = [{
  label: (
    <span className="inline-flex items-center gap-2 rounded-md">
      Contact
      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
    </span>
  ),
  target: "contact",
}];

const ContactButton = ({ mobile = false }: { mobile?: boolean }) => (
  <Ul
    inline
    mobile={mobile}
    links={contactLinks}
    ariaLabel="Contact navigation"
  />
);

export default ContactButton;
