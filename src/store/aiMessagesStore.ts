import { create } from "zustand";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

interface MessagesData {
  messages: Message[];
  addMessage: (message: Message) => void;
}

export const useMessagesData = create<MessagesData>((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
}));