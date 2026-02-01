/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../zustand/useCart';
import { TrashIcon, XMarkIcon, StarIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useEffect } from 'react';

export const ProductModal = ({ isOpen, onClose, product: p }) => {
    const { quantityP, lessFromCart, addToCart } = useCart();
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!p) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                // Cambia esto en tu div principal de fondo
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-dvh">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 dark:bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="relative w-full max-w-85 sm:max-w-2xl bg-white dark:bg-gray-900 rounded-4xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
                    >
                        {/* Botón Cerrar más pequeño en móvil */}
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 z-20 p-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 text-gray-500 backdrop-blur-md hover:scale-110 transition-all"
                        >
                            <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        <div className="flex flex-col sm:flex-row">

                            {/* SECCIÓN IMAGEN: Altura fija pequeña en móvil */}
                            <div className="w-full sm:w-1/2 bg-gray-50 dark:bg-gray-800/40 p-4 sm:p-8 flex items-center justify-center relative h-40 sm:h-auto">
                                <img
                                    src={p.image || "https://placehold.co/400x400"}
                                    alt={p.name}
                                    className="h-full w-auto object-contain drop-shadow-lg dark:brightness-90"
                                />
                                <div className="absolute bottom-2 right-4 sm:bottom-4 sm:left-4 flex items-center gap-1 px-2 py-0.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg border border-gray-100 dark:border-gray-700">
                                    <StarIcon className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-[10px] font-bold dark:text-gray-200">{p.rating || "4.8"}</span>
                                </div>
                            </div>

                            {/* SECCIÓN CONTENIDO: Padding reducido */}
                            <div className="w-full sm:w-1/2 p-5 sm:p-8 flex flex-col justify-between">
                                <div className="space-y-1">
                                    <div className="flex justify-between items-start">
                                        <span className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                                            {p.category_name || "Colección"}
                                        </span>
                                    </div>
                                    <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                                        {p.name}
                                    </h2>

                                    {/* Descripción: Solo 1 línea en móvil para ahorrar altura */}
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1 sm:line-clamp-4 font-medium">
                                        {p.description}
                                    </p>

                                    <div className="flex items-center gap-3 pt-2">
                                        <span className="text-xl sm:text-3xl font-black text-gray-900 dark:text-white">${p.price}</span>
                                        {p.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through font-bold">${p.originalPrice}</span>
                                        )}
                                    </div>
                                </div>

                                {/* ACCIONES: Ajustadas para ser delgadas */}
                                <div className="mt-4 sm:mt-8">
                                    {quantityP(p.id) < 1 ? (
                                        <button
                                            disabled={!p.stock}
                                            onClick={() => addToCart(p.id)}
                                            className="w-full py-3 sm:py-4 bg-gray-900 dark:bg-blue-600 hover:bg-black dark:hover:bg-blue-700 disabled:bg-gray-100 dark:disabled:bg-gray-800 text-white rounded-xl sm:rounded-2xl font-bold flex items-center justify-center gap-2 text-sm sm:text-base transition-all active:scale-[0.97]"
                                        >
                                            <ShoppingCartIcon className="w-4 h-4 sm:w-5" />
                                            <span>{p.stock ? 'Añadir' : 'Agotado'}</span>
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-1 rounded-xl sm:rounded-2xl border border-gray-100 dark:border-gray-700">
                                            <button
                                                onClick={() => lessFromCart(p.id)}
                                                className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-lg sm:rounded-xl shadow-sm hover:text-red-500"
                                            >
                                                {quantityP(p.id) === 1 ? <TrashIcon className="w-4 h-4" /> : <MinusIcon className="w-4 h-4" />}
                                            </button>

                                            <span className="text-base sm:text-xl font-black text-gray-900 dark:text-white">
                                                {quantityP(p.id)}
                                            </span>

                                            <button
                                                disabled={quantityP(p.id) >= p.stock}
                                                onClick={() => addToCart(p.id)}
                                                className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-gray-900 dark:bg-blue-600 text-white rounded-lg sm:rounded-xl shadow-md disabled:opacity-20 active:scale-90"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};