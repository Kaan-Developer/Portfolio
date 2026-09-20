import { Link } from "react-router-dom";

import { ArrowUpRight } from "lucide-react";

interface ContactBtnProps {
  to: string;
  title: string;
}

const ContactBtn = ({ title, to }: ContactBtnProps) => {
  return (
    <>
      <Link
      to={to}
        type="button"
        className=" 
               inline-flex
               cursor-pointer
        h-12
        w-full
        items-center
        justify-center
        gap-3.5
        rounded-button
        border
        border-border-hover
        bg-transparent
        px-8
        text-sm
        font-medium
        text-primary
        shadow-none
        transition-all
        duration-200
        ease-smooth
        hover:bg-accent
        hover:border-accent
        hover:shadow-button
        active:bg-accent-active
        active:scale-[0.98]
        sm:w-auto"
      >
        <span>{title}</span>
        <ArrowUpRight size={15} strokeWidth={1.7} />
      </Link>
    </>
  );
};

export default ContactBtn;
