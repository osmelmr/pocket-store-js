// src/zustand/useUiStore.js
import { create } from 'zustand';

export const useSidebar = create((set) => ({
    isSidebarOpen: false,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }),
}));