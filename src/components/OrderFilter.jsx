/* eslint-disable no-unused-vars */
import { useFilters } from "../zustand/productsStore"
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const orderOptions = [
    { value: "newest", label: "Más recientes" },
    { value: "name", label: "Nombre (A-Z)" },
    { value: "price", label: "Precio (menor a mayor)" },
    { value: "rating", label: "Mejor valorados" }
];

export const OrderFilter = () => {
    const order = useFilters(state => state.order)
    const setOrder = useFilters(state => state.setOrder)
    const [isOpen, setIsOpen] = useState(false);

    // Obtener el label de la opción seleccionada
    const currentOrderLabel = orderOptions.find(opt => opt.value === order)?.label || "Más recientes";

    const handleSelect = (val) => {
        setOrder(val);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full">
            {/* Botón Principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 transition-all outline-none
            bg-white dark:bg-slate-800 
            border border-gray-200 dark:border-slate-700 
            rounded-xl text-sm font-semibold 
            text-gray-700 dark:text-gray-200 
            hover:border-blue-500 dark:hover:border-blue-400 
            hover:shadow-sm"
            >
                <span className="truncate">{currentOrderLabel}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay para cerrar al hacer click fuera */}
                        <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute z-20 mt-2 w-full overflow-hidden shadow-xl
                        bg-white dark:bg-slate-800 
                        border border-gray-100 dark:border-slate-700 
                        rounded-xl"
                        >
                            <div className="py-1">
                                {orderOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${order === option.value
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}