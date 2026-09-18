import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { ArrowUp } from "lucide-react";

import AIThinkingIndicator from "./AIThinkingIndicator";

import { useMessagesData } from "../store/aiMessagesStore";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface AIMessageProps {
  onSend: (message: string) => Promise<string>;
  isLarge: boolean;
}

export const AIMessage = ({ onSend, isLarge }: AIMessageProps) => {
  const [input, setInput] = useState("");
  const { messages, addMessage } = useMessagesData();

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");
const handleSubmit = async (
  event: FormEvent<HTMLFormElement>,
): Promise<void> => {
  event.preventDefault();

  const content = input.trim();

  if (!content || isLoading) {
    return;
  }

  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content,
  };

  addMessage(userMessage);

  setInput("");
  setError("");
  setIsLoading(true);

  try {
    const reply = await onSend(content);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: reply,
    };

    addMessage(assistantMessage);
  } catch (requestError) {
    setError(
      requestError instanceof Error
        ? requestError.message
        : "Mesaj gönderilemedi.",
    );
  } finally {
    setIsLoading(false);
  }
};

const messagesEndRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages, isLoading]);
  return (
    <section className="flex h-full min-h-0 flex-col">
      <div
        aria-live="polite"
        className="
          min-h-0 flex-1
          overflow-y-auto
          bg-background/30
          px-4 py-5
          [scrollbar-color:rgb(var(--c-border)/0.14)_transparent]
          [scrollbar-width:thin]
        "
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-[250px]">
              <h3 className="text-ui-lg font-medium text-text-primary">
                Nasıl yardımcı olabilirim?
              </h3>

              <p className="mt-2 text-ui-md leading-relaxed text-text-muted">
                Kaan’ın çalışmaları hakkında soru
                sorabilirsin.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {messages.map((message) => {
              const isUser =
                message.role === "user";

              return (
                <article
                  key={message.id}
                  className={
                    isUser
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >
                  <div
                    className={
                      isUser
                        ? `
                          max-w-[82%]
                          rounded-lg rounded-br-xs
                          border border-border-hover
                          bg-surface-active
                          px-3.5 py-2.5
                          text-ui-md leading-relaxed
                          text-text-primary
                        `
                        : `
                          max-w-[92%]
                          border-l-2 border-accent/60
                          py-1 pl-3.5
                          text-ui-md leading-relaxed
                          text-text-secondary
                        `
                    }
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </article>
              );
            })}

            {isLoading && (
              <AIThinkingIndicator />
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="
            border-t border-status-error/15
            bg-status-error/5
            px-4 py-2.5
            text-ui-sm text-status-error
          "
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`shrink-0 border-t border-border-subtle bg-surface-elevated ${
          isLarge ? "p-4" : "p-3"
        }`}
      >
        <div
          className={`flex items-end gap-2 rounded-lg border border-border-strong bg-surface shadow-inner transition-colors duration-150 focus-within:border-border-hover ${
            isLarge ? "p-2 pl-4" : "p-1.5 pl-3"
          }`}
        >
          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            rows={1}
            maxLength={1_000}
            disabled={isLoading}
            placeholder="Bir mesaj yaz..."
            className={`
              ${isLarge ? "max-h-40 min-h-[52px] text-ui-lg" : "max-h-32 min-h-[36px] text-ui-md"}
              min-w-0 flex-1 resize-none
              border-0 bg-transparent
              py-2
              font-sans
              leading-5 text-text-primary
              outline-none
              placeholder:text-text-disabled
              disabled:cursor-not-allowed
              disabled:opacity-60
            `}
          />

          <button
            type="submit"
            disabled={
              isLoading || !input.trim()
            }
            aria-label="Mesajı gönder"
            className={`
              inline-flex shrink-0
              ${isLarge ? "h-12 w-12" : "h-9 w-9"}
              items-center justify-center
              rounded-md
              bg-accent
              text-background
              transition-all duration-150
              hover:opacity-80
              active:scale-95
              disabled:cursor-not-allowed
              disabled:opacity-30
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent/30
            `}
          >
            <ArrowUp
              size={isLarge ? 20 : 17}
              strokeWidth={2}
            />
          </button>
        </div>
      </form>

    </section>
  );
}

export default AIMessage;
