import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface MessagesData {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useMessagesData = create<MessagesData>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
        clearMessages: () => set({ messages: [] }),
    }),

    {
      name: "chat-messages",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);