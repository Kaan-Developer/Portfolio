import { create } from "zustand";

interface AIStore {
  isOpen: boolean;
  toggleAI: () => void;
}

export const useAIStore = create<AIStore>((set) => ({
  isOpen: false,

  toggleAI: () =>
    set((state) => ({
      isOpen: !state.isOpen,
    })),
}));