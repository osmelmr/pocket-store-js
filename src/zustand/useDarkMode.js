import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTemeMode = create(
    persist(
        (set, get) => ({
            isDark: false,
            toggleDarkMode: () => set((state) => ({ isDark: !state.isDark })),
            setDarkMode: (value) => set({ isDark: value }),
            activeDarkMode: () => {
                document.documentElement.classList.add('dark');
                get().setDarkMode(true);
            },
            activeLightMode: () => {
                document.documentElement.classList.remove('dark');
                get().setDarkMode(false);
            }
        }),
        {
            name: 'teme-mode',
        }
    )
);
