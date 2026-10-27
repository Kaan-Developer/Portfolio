import Ul from "./Ul";
import { ArrowUpRight } from "lucide-react";
import { useSite } from "../../hooks/useSite";

const ContactButton = ({ mobile = false }: { mobile?: boolean }) => {
  const site = useSite();
  const contactLinks = [{
    label: (
      <span className="inline-flex items-center gap-2 rounded-md">
        {site.buttons.contactBtn}
        <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
      </span>
    ),
    target: "contact",
  }];

  return (
    <Ul
      inline
      mobile={mobile}
      links={contactLinks}
      ariaLabel={site.accessibility.contactNavigation}
    />
  );
};

export default ContactButton;
