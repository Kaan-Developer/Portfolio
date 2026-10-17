import Ul from "./Ul";

const contactLinks = [{ label: "Contact", target: "contact" }];

const StarOnGitHub = ({ mobile = false }: { mobile?: boolean }) => (
  <Ul
    inline
    mobile={mobile}
    links={contactLinks}
    ariaLabel="Contact navigation"
  />
);

export default StarOnGitHub;
