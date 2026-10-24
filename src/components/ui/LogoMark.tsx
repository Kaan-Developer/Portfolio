import Logo from "../../assets/images/Logo.svg";

const LogoMark = ({ className }: { className?: string }) => (
  <img src={Logo} alt="" width={116} height={116} className={className} />
);

export default LogoMark;
