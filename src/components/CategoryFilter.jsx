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
                className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-blue-500 hover:shadow-sm transition-all focus:outline-none"
            >
                <span className="truncate">{currentCategoryName}</span>
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
                            <div className="max-h-64 overflow-y-auto py-1 custom-scrollbar">
                                {/* OPCIÓN INICIAL: TODAS */}
                                <button
                                    onClick={() => handleSelect("all")}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${category === "all"
                                        ? 'bg-blue-50 text-blue-600 font-bold'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    Todas las categorías
                                </button>

                                {/* DIVISOR SUTIL */}
                                <div className="border-t border-gray-50 my-1" />

                                {/* LISTA DINÁMICA POR ID */}
                                {data?.map((c) => {
                                    const isSelected = String(category) === String(c.id);
                                    return (
                                        <button
                                            key={c.id}
                                            onClick={() => handleSelect(String(c.id))}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${isSelected
                                                ? 'bg-blue-50 text-blue-600 font-bold'
                                                : 'text-gray-600 hover:bg-gray-50'
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