import { Bot } from "lucide-react";

const AIThinkingIndicator = () => {
  return (
    <article className="flex justify-start animate-fade-in">
      <div
        role="status"
        aria-live="polite"
        aria-label="Kaan yanıtı hazırlıyor"
        className="max-w-[92%] rounded-lg rounded-bl-xs border border-border-subtle bg-surface/55 px-3.5 py-3 shadow-inner"
      >
        <div className="flex items-center gap-3" aria-hidden="true">
          <span className="ai-thinking-orb relative grid h-7 w-7 shrink-0 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent">
            <Bot size={14} strokeWidth={1.9} />
          </span>

          <div className="min-w-0">
            <p className="text-ui-sm font-medium text-text-secondary">
              Yanıt hazırlanıyor
            </p>

            <span className="mt-1.5 flex h-2 items-center gap-1">
              <span className="ai-thinking-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="ai-thinking-dot h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="ai-thinking-dot h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default AIThinkingIndicator;
