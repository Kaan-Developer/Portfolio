import { create } from 'zustand';

interface contactBoxType {
    contactOpen: boolean;
    toggle: () => void;
}

export const useToggleStore = create<contactBoxType>((set) => ({
    contactOpen: false,

    toggle: () =>
         set((state) => 
         ({
        contactOpen: !state.contactOpen
    }))
})
)