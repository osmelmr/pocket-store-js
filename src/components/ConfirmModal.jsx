/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

export const ConfirmModal = ({ show, message, onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-gray-300/75 z-50 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel} // 👉 cerrar al tocar fuera
                >
                    <motion.div
                        className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-2xl p-6 w-96 text-center relative border border-gray-100"
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Botón de cierre más elegante */}
                        <button
                            onClick={onCancel}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-colors duration-200"
                            aria-label="Cerrar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Ícono decorativo opcional */}
                        <div className="mb-4 flex justify-center">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                        </div>

                        {/* Título con mejor tipografía */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{message}</h2>
                        <p className="text-gray-500 text-sm mb-6">Esta acción no se puede deshacer</p>

                        {/* Botones con mejores estilos */}
                        <div className="flex justify-center gap-3">
                            <button
                                onClick={onCancel}
                                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-sm"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
                            >
                                Confirmar
                            </button>
                        </div>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
};
