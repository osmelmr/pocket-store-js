/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CubeIcon,
    ShoppingBagIcon,
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export const AdminSidebar = ({ isSidebarOpen, onClose }) => {

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <>
                    {/* Overlay - Ahora con onClick para cerrar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose} // <-- Cierra al tocar el blur
                        className="fixed inset-0 bg-gray-900/20 dark:bg-slate-950/40 backdrop-blur-md md:backdrop-blur-none z-40"
                    />

                    {/* Sidebar con Drag para Mobile */}
                    <motion.nav
                        // --- MAGIA DEL DRAG (Solo afecta móviles por el touch-none) ---
                        drag="x"
                        dragDirectionLock
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={{ left: 0, right: 0.8 }}
                        onDragEnd={(event, info) => {
                            // Si arrastras más de 100px a la derecha o vas rápido, se cierra
                            if (info.offset.x > 100 || info.velocity.x > 500) {
                                onClose();
                            }
                        }}
                        // -----------------------------------------------------------
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                        className="fixed top-20 right-0 h-[calc(100vh-80px)] w-[85vw] md:w-95 z-50 flex flex-col shadow-2xl
                        touch-none select-none /* Evita scrolls extraños mientras arrastras */
                        bg-white/95 dark:bg-slate-900/90 backdrop-blur-lg md:backdrop-blur-none 
                        border-l border-gray-100 dark:border-slate-800"
                    >
                        {/* TIRADOR VISUAL (Opcional, ayuda al usuario a saber que se puede arrastrar) */}
                        <div className="absolute inset-y-0 left-0 w-1.5 flex items-center justify-center sm:hidden">
                            <div className="w-1 h-12 bg-gray-300 dark:bg-slate-700 rounded-full" />
                        </div>

                        {/* Header del Sidebar */}
                        <div className="flex items-center justify-between p-6 pl-8 border-b border-gray-100 dark:border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl shadow-md">
                                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="font-bold text-gray-900 dark:text-white tracking-tight text-lg">
                                    Admin <span className="text-blue-600 dark:text-blue-400">Store</span>
                                </h2>
                            </div>
                        </div>

                        {/* Cuerpo de Navegación */}
                        <div className="flex-1 overflow-y-auto p-4 pl-8 custom-scrollbar">
                            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">
                                Gestión
                            </p>
                            <nav className="space-y-1">
                                <Link
                                    to="products"
                                    onClick={onClose} // Cerramos al navegar en mobile
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all group
                                    text-gray-700 dark:text-gray-300 
                                    hover:bg-blue-50 dark:hover:bg-blue-900/20 
                                    hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                        <CubeIcon className="w-4 h-4" />
                                    </div>
                                    Productos
                                </Link>

                                <Link
                                    to="/"
                                    onClick={onClose}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all group
                                    text-gray-700 dark:text-gray-300 
                                    hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-slate-700 transition-colors">
                                        <ShoppingBagIcon className="w-4 h-4" />
                                    </div>
                                    Ver Tienda
                                </Link>
                            </nav>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pl-8 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/20">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Estado</span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Modo Admin Activo
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
};