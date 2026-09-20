import { create } from 'zustand';

interface followBoxType {
    followOpen: boolean;
    toggle: () => void;
}

export const useToggleStore = create<followBoxType>((set) => ({
    followOpen: false,

    toggle: () =>
         set((state) => 
         ({
        followOpen: !state.followOpen
    }))
})
)