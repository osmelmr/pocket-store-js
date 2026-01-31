/* eslint-disable no-unused-vars */
import { useAllCategories } from "../hooks/useCategories";
import { useFilters } from "../zustand/productsStore";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export const CategoryFilter = () => {
    const { data } = useAllCategories();
    const category = useFilters(state => state.category);
    const setCategory = useFilters(state => state.setCategory);

    const [isOpen, setIsOpen] = useState(false);

    // Comparación robusta por ID (convirtiendo a String)
    const currentCategoryName = category === "all"
        ? "Todas las categorías"
        : data?.find(c => String(c.id) === String(category))?.name || "Todas las categorías";

    const handleSelect = (val) => {
        console.log("Categoría seleccionada:", val);
        setCategory(val);
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
                <span className="truncate">{currentCategoryName}</span>
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
                            <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
                                {/* OPCIÓN INICIAL: TODAS */}
                                <button
                                    onClick={() => handleSelect("all")}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${category === "all"
                                            ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                                        }`}
                                >
                                    Todas las categorías
                                </button>

                                {/* DIVISOR SUTIL */}
                                <div className="border-t border-gray-50 dark:border-slate-700 my-1" />

                                {/* LISTA DINÁMICA */}
                                {data?.map((c) => {
                                    const isSelected = String(category) === String(c.id);
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelect(String(c.id))}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${isSelected
                                                    ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold'
                                                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50'
                                                }`}
                                        >
                                            {c.name}
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};