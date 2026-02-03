import { useEffect } from 'react';
import { useTemeMode } from './zustand/useDarkMode';

export const TemeProvider = ({ children }) => {
    const { isDark } = useTemeMode();

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    return children;
}