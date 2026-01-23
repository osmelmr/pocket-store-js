import { create } from 'zustand'

export const useToast = create((set) => ({
    message: '',
    type: 'info',
    isVisible: false,
    duration: 2000,
    showToast: (message, type = 'success', duration = 2000) => {
        set({ message, type, isVisible: true, duration });
    },
    hideToast: () => set({ isVisible: false }),
}));