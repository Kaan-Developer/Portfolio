import { useState } from "react";
import { Bot, Maximize2, Minimize2, X } from "lucide-react";

import AIMessage from "./AIMessage";

import { useAIStore } from "../store/aiToggleStore";
import { sendChatMessage } from "../features/ai/api/chat";

type ChatbotSize = "medium" | "large";

const AIBot = () => {
  const { toggleAI } = useAIStore();

  const sizeClass = {
    medium:
      "h-[600px] w-[420px] max-h-[calc(100dvh-112px)] max-w-[calc(100vw-24px)]",
    large:
      "h-[760px] w-[560px] max-h-[calc(100dvh-80px)] max-w-[calc(100vw-24px)]",
  } satisfies Record<ChatbotSize, string>;

  const [isLarge, setIsLarge] = useState(true);

  return (
    <aside
      aria-label="Site Chat"
      className={`
            fixed bottom-24 right-3 z-chatbot
    flex origin-bottom-right flex-col
    overflow-hidden
    rounded-panel
    border border-border-strong
    bg-surface-elevated
    text-text-primary
    shadow-panel-lg
    animate-scale-in
    transition-[width,height] duration-200 ease-out
    sm:bottom-28 sm:right-7
        ${isLarge ? sizeClass.large : sizeClass.medium}
      `}
    >
      <header
        className="
          flex h-14 shrink-0
          items-center justify-between gap-4
          border-b border-border-subtle
          bg-surface-elevated
          px-3
        "
      >
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={toggleAI}
              aria-label="Close chat"
              className="
              inline-flex h-6 w-6 shrink-0
              items-center justify-center
              rounded-md
              text-text-muted
              transition-colors duration-150
              hover:bg-surface-hover
              hover:text-text-primary
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent/30
            "
            >
              <X size={17} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              onClick={() => setIsLarge((value) => !value)}
              aria-label={isLarge ? "Küçült" : "Büyüt"}
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30"
            >
              {isLarge ? (
                <Minimize2 size={16} strokeWidth={1.8} />
              ) : (
                <Maximize2 size={16} strokeWidth={1.8} />
              )}
            </button>
        </div>

        <div className="flex min-w-0 items-center gap-2">
          <Bot
            size={18}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0 text-accent"
          />

          <h2 className="min-w-0 truncate text-ui-lg font-medium text-text-primary">
            Ask Kaan
          </h2>
        </div>

      </header>

      <div className="min-h-0 flex-1">
        <AIMessage onSend={sendChatMessage} isLarge={isLarge} />
      </div>
    </aside>
  );
};

export default AIBot;
