import type { MouseEventHandler } from "react";
import { ArrowUpRight } from "lucide-react";

type ContactBtnProps = {
  name: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

import { useToggleStore } from "../store/contactStore";

const ContactBtn = ({ name }: ContactBtnProps) => {
      const toggleContactModal = useToggleStore((state) => state.toggle);

  return (
    <>
      <button
        type="button"
        onClick={toggleContactModal}
        className="
                          inline-flex
                          h-12
                          w-full
                          items-center
                          justify-center
                          gap-3.5
                          rounded-button
                          bg-accent
                           px-6 
                          text-sm
                          font-medium
                          text-primary
                          shadow-button
                          transition-all
                          duration-200
                          ease-smooth
                          hover:bg-accent-hover
                          hover:shadow-accent
                          active:bg-accent-active
                          active:scale-[0.98]
                          sm:w-auto
                        "
      >
        <span className="text-text-primary">{name}</span>
        <ArrowUpRight size={15} strokeWidth={1.7} />
      </button>
    </>
  );
};

export default ContactBtn;
