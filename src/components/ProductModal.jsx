import { motion, AnimatePresence } from 'framer-motion';
// Asumo que tienes estos iconos o similares
// import { XMarkIcon, StarIcon, MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export const ProductModal = ({ isOpen, onClose, product, quantityP, addToCart, lessFromCart }) => {
    // Mock de prueba basado en tu primer insert si no hay producto seleccionado
    const p = product || {
        id: 'mock-1',
        name: 'Laptop Gamer Pro',
        description: 'Laptop de alto rendimiento para gaming con RTX 4070, 32GB RAM, 1TB SSD. Ideal para creadores de contenido y jugadores exigentes que buscan portabilidad sin sacrificar potencia.',
        price: 1299.99,
        stock: 15,
        rating: 4.7,
        category_name: 'Computación',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80'
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                {/* Overlay con Blur (Mantenido por petición) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                />

                {/* Contenedor del Modal */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white dark:bg-slate-900 rounded-3xl shadow-2xl flex flex-col md:flex-row border border-gray-100 dark:border-slate-800"
                >
                    {/* Botón Cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors"
                    >
                        {/* <XMarkIcon className="w-6 h-6" /> */}
                        <span className="text-xl font-bold leading-none">×</span>
                    </button>

                    {/* Lado Izquierdo: Imagen */}
                    <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 dark:bg-slate-800">
                        <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Lado Derecho: Info */}
                    <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col overflow-y-auto custom-scrollbar">
                        <div className="flex-1">
                            {/* Categoría y Rating */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                                    {p.category_name || "Tecnología"}
                                </span>
                                <div className="flex items-center text-yellow-500 font-bold text-sm">
                                    {/* <StarIcon className="w-4 h-4 mr-1 fill-current" /> */}
                                    ★ {p.rating}
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
                                {p.name}
                            </h2>

                            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                                {p.description}
                            </p>

                            {/* Detalles de Stock */}
                            <div className="mb-8">
                                {p.stock > 0 ? (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold">
                                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        {p.stock} Unidades disponibles
                                    </div>
                                ) : (
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold">
                                        ✗ Agotado temporalmente
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer del Modal: Precio y Acciones */}
                        <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="text-center sm:text-left">
                                <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider">Precio Total</span>
                                <span className="text-3xl font-black text-gray-900 dark:text-blue-400">${p.price}</span>
                            </div>

                            {/* Controles de Carrito */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                {quantityP(p.id) < 1 ? (
                                    <button
                                        disabled={!p.stock}
                                        onClick={() => addToCart(p.id)}
                                        className="flex-1 sm:flex-none px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 dark:disabled:bg-slate-800 text-white font-bold transition-all active:scale-95 shadow-lg shadow-blue-200 dark:shadow-none"
                                    >
                                        Agregar al carrito
                                    </button>
                                ) : (
                                    <div className="flex items-center bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-2xl p-1 shadow-inner">
                                        <button
                                            onClick={() => lessFromCart(p.id)}
                                            className="w-12 h-12 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            {quantityP(p.id) === 1 ? '🗑️' : <span className="text-2xl">−</span>}
                                        </button>
                                        <span className="w-10 text-center font-black text-lg text-gray-900 dark:text-white">
                                            {quantityP(p.id)}
                                        </span>
                                        <button
                                            disabled={quantityP(p.id) >= p.stock}
                                            onClick={() => addToCart(p.id)}
                                            className="w-12 h-12 flex items-center justify-center text-blue-600 dark:text-blue-400 disabled:opacity-30"
                                        >
                                            <span className="text-2xl">+</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};