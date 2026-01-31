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
        <div className="relative w-full hover:shadow-sm">
            {/* Botón Principal */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-500 hover:shadow-sm transition-all focus:outline-none"
            >
                <span className="truncate">{currentOrderLabel}</span>
                <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
                            className="absolute z-20 mt-2 w-full bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                        >
                            <div className="py-1">
                                {orderOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSelect(option.value)}
                                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${order === option.value
                                            ? 'bg-blue-50 text-blue-600 font-bold'
                                            : 'text-gray-600 hover:bg-gray-50'
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