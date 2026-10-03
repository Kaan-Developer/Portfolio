import { create } from "zustand";

interface menuTypes {
    isOpen: boolean;
    toggle: () => void;
}

export const useMenuStore = create<menuTypes>((set) => ({
    isOpen: false,

    toggle: () =>
        set((state) => ({
            isOpen: !state.isOpen,
        })),
}));