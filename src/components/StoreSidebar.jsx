/* eslint-disable no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
    XMarkIcon,
    ShieldCheckIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export const StoreSidebar = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay: Mismo desenfoque que el Header (backdrop-blur-md) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-900/20 backdrop-blur-md z-40 transition-opacity"
                    />

                    {/* Sidebar: Alineado al diseño de MiStore */}
                    <motion.nav
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-20 right-0 h-[calc(100vh-80px)] w-[80vw] md:w-[380px] bg-white/90 backdrop-blur-lg z-50 flex flex-col shadow-2xl border-l border-gray-100"
                    >
                        {/* Header del Sidebar - Estilo consistente con el Logo */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl shadow-md">
                                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="font-bold text-gray-900 tracking-tight text-lg">
                                    Panel <span className="text-blue-600">Gestión</span>
                                </h2>
                            </div>

                        </div>

                        {/* Cuerpo - Enlaces con estilo de lista moderna */}
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                                Navegación
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        to="/admin"
                                        onClick={onClose}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        Admin Panel
                                    </Link>
                                </li>
                                {/* Puedes agregar más links aquí */}
                            </ul>
                        </div>

                        {/* Footer - Mismo estilo que el indicador de stock */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sistema</span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Online v1.0
                                    </div>
                                </div>
                                <button
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                    title="Ayuda"
                                >
                                    <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.nav>
                </>
            )}
        </AnimatePresence>
    );
};