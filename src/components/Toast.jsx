/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../zustand/useToast";

export const Toast = () => {
    const { isVisible: show, hideToast: onClose, message, duration, type } = useToast();

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                if (onClose) onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center fixed bottom-4 right-4 w-60 h-14 ${type == "success" ? 'bg-green-600' : 'bg-red-600'} text-white px-4 py-2 rounded shadow-lg`}
                >
                    <p>{message}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
