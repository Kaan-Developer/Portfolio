import { Bot } from "lucide-react";

import { useAIStore } from "../store/aiToggleStore";

const AIButton = () => {
    const { isOpen, toggleAI } = useAIStore();

    return (
        <button
      onClick={toggleAI}
        type="button"
        aria-label="Open AI Assistant"
        className={`${isOpen ? "hidden" : "flex"}
    group
    fixed bottom-7 right-7 z-chatbot
    h-16 w-16 items-center justify-center
    rounded-full
    bg-accent
    text-white
        `}
      >
        {/* AI outer pulse */}
        <span
          className="
      pointer-events-none
      absolute inset-0
      rounded-full
      border border-accent/40
      opacity-0
      transition-all duration-500
      group-hover:scale-[1.32]
      group-hover:opacity-100
    "
        />

        <Bot
          size={30}
          strokeWidth={1.9}
          className="relative"
        />
      </button>
      );
    };

    export default AIButton;
