/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../zustand/useCart';
import { TrashIcon, XMarkIcon, StarIcon, PlusIcon, MinusIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export const ProductModal = ({ isOpen, onClose, product: p }) => {
    const { quantityP, lessFromCart, addToCart } = useCart();

    if (!p) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Overlay con desenfoque suave */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 dark:bg-black/70 backdrop-blur-[2px]"
                    />

                    {/* Contenedor Principal */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
                    >
                        {/* Indicador de arrastre para móviles (Visual) */}
                        <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-3 sm:hidden" />

                        {/* Botón Cerrar (Posicionado para no estorbar) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        <div className="flex flex-col p-5 sm:p-8">
                            {/* Cabecera: Imagen y Título en fila para ahorrar espacio vertical en móvil */}
                            <div className="flex gap-4 items-center mb-4">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-50 dark:bg-gray-800 rounded-2xl p-2 overflow-hidden border border-gray-100 dark:border-gray-700">
                                    <img
                                        src={p.image || "https://placehold.co/200x200"}
                                        alt={p.name}
                                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="flex items-center gap-0.5 px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                            <StarIcon className="w-3.5 h-3.5 text-yellow-600 dark:text-yellow-400 fill-current" />
                                            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{p.rating || "4.8"}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider truncate">
                                            {p.category_name || "General"}
                                        </span>
                                    </div>
                                    <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight truncate">
                                        {p.name}
                                    </h2>
                                    <div className="mt-1 flex items-center gap-1.5">
                                        <span className="text-2xl font-black text-gray-900 dark:text-white">${p.price}</span>
                                        {p.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">${p.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Descripción colapsada/truncada para evitar scroll */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-6">
                                {p.description || "Detalles premium seleccionados para ti."}
                            </p>

                            {/* Estado de Stock */}
                            <div className="flex items-center justify-between mb-6 px-1">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Disponibilidad</span>
                                {p.stock > 0 ? (
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                                        {p.stock} unidades
                                    </span>
                                ) : (
                                    <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-md">Agotado</span>
                                )}
                            </div>

                            {/* Botón de Acción Principal (Footer del Modal) */}
                            <div className="mt-auto">
                                {quantityP(p.id) < 1 ? (
                                    <button
                                        disabled={!p.stock}
                                        onClick={() => addToCart(p.id)}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-[0.98]"
                                    >
                                        <ShoppingCartIcon className="w-5 h-5" />
                                        {p.stock ? "Añadir al carrito" : "Agotado"}
                                    </button>
                                ) : (
                                    <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 p-2 rounded-2xl border border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={() => lessFromCart(p.id)}
                                            className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-xl shadow-sm hover:text-red-500 transition-colors"
                                        >
                                            {quantityP(p.id) === 1 ? <TrashIcon className="w-5 h-5" /> : <MinusIcon className="w-6 h-6" />}
                                        </button>

                                        <div className="flex-1 text-center">
                                            <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-tighter">En carrito</span>
                                            <span className="text-xl font-black text-gray-900 dark:text-white">{quantityP(p.id)}</span>
                                        </div>

                                        <button
                                            disabled={quantityP(p.id) >= p.stock}
                                            onClick={() => addToCart(p.id)}
                                            className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-md disabled:bg-gray-300 dark:disabled:bg-gray-600 transition-all active:scale-90"
                                        >
                                            <PlusIcon className="w-6 h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};