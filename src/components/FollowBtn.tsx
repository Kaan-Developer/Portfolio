import { ArrowUpRight } from "lucide-react";

import { useToggleStore } from "../store/followStore";

type FollowBtnProps = {
  name: string;
};

const FollowBtn = ({ name }: FollowBtnProps) => {
      const toggleFollowModal = useToggleStore((state) => state.toggle);

  return (
    <>
      <button
        type="button"
        onClick={toggleFollowModal}
        className="
                          inline-flex
                          cursor-pointer
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

export default FollowBtn;
