import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTemeMode = create(
    persist(
        (set) => ({
            isDark: true,
            toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),
            setDarkMode: (value) => set({ isDark: value }),
        }),
        {
            name: 'teme-mode',
        }
    )
);
