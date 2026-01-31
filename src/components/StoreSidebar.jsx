/* eslint-disable no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import {
    ShieldCheckIcon,
    UserIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export const StoreSidebar = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-900/20 backdrop-blur-md z-40"
                    />

                    {/* Sidebar con Drag Global */}
                    <motion.nav
                        drag="x"
                        dragDirectionLock
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={{ left: 0.05, right: 1 }}
                        onDragEnd={(event, info) => {
                            // Umbrales para cierre: distancia o velocidad
                            if (info.offset.x > 70 || info.velocity.x > 300) {
                                onClose();
                            }
                        }}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                        className="fixed top-20 right-0 h-[calc(100vh-80px)] w-[85vw] md:w-[380px] bg-white/95 backdrop-blur-lg z-50 flex flex-col shadow-2xl border-l border-gray-100 touch-none select-none"
                    >
                        {/* TIRADOR LATERAL IZQUIERDO (Handle) */}
                        <div className="absolute inset-y-0 left-0 w-6 flex items-center justify-center pointer-events-none">
                            <div className="w-1.5 h-12 bg-gray-200 rounded-full" />
                        </div>

                        {/* Área de agarre extendida (Invisible pero funcional) */}
                        <div className="absolute inset-y-0 -left-4 w-10 cursor-grab active:cursor-grabbing z-30" />

                        {/* Header del Sidebar */}
                        <div className="flex items-center justify-between p-6 pl-8 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-600 rounded-xl shadow-md">
                                    <ShieldCheckIcon className="w-5 h-5 text-white" />
                                </div>
                                <h2 className="font-bold text-gray-900 tracking-tight text-lg">
                                    Panel <span className="text-blue-600">Gestión</span>
                                </h2>
                            </div>
                        </div>

                        {/* Cuerpo */}
                        <div className="flex-1 overflow-y-auto p-4 pl-8 custom-scrollbar pointer-events-auto">
                            <p className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                                Navegación
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        to="/admin"
                                        onClick={onClose}
                                        onPointerDown={(e) => e.stopPropagation()}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-semibold hover:bg-blue-50 hover:text-blue-600 transition-all group"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                            <UserIcon className="w-4 h-4" />
                                        </div>
                                        Admin Panel
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Footer */}
                        <div className="p-6 pl-8 border-t border-gray-100 bg-gray-50/50">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sistema</span>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        Online v1.0
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
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