import { create } from "zustand";

interface menuTypes {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
}

export const useMenuStore = create<menuTypes>((set) => ({
    isOpen: false,
    close: () => set({ isOpen: false }),

    toggle: () =>
        set((state) => ({
            isOpen: !state.isOpen,
        })),
}));
