import { create } from 'zustand';
export const useVisibleFilters = create((set) => ({
    isFiltersVisible: true,
    showFilters: () => set({ isFiltersVisible: true }),
    hideFilters: () => set({ isFiltersVisible: false }),
    toggleFilters: () => set((state) => ({ isFiltersVisible: !state.isFiltersVisible })),
}));