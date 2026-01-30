import { useCart } from "../zustand/useCart";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuth";
import { SearchFilter } from "./SearchFilter";
import { useState } from "react";
import { CategoryFilter } from "./CategoryFilter";
import { OrderFilter } from "./OrderFilter";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

import {
    ShoppingBagIcon,
    ShoppingCartIcon,
    AdjustmentsHorizontalIcon, // Icono de filtros
} from "@heroicons/react/24/outline";

export const StoreHeader = () => {
    const navigate = useNavigate();
    const { allStock } = useCart();
    const { user, logOut } = useAuthContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);

    const [closerFilters, setCloserFilters] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Solo escondemos automáticamente si el usuario baja de 80px
        // No forzamos "true" si el usuario lo cerró manualmente (opcional)
        if (latest > 80) {
            if (isFiltersVisible) setIsFiltersVisible(false);
        } else {
            if (!isFiltersVisible) { setIsFiltersVisible(true); setCloserFilters(false); };
        }
    });

    const handleLogout = () => {
        setIsProfileOpen(false);
        logOut();
        navigate("/login");
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 h-20 mb-40 md:mb-25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md relative z-20">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group shrink-0">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg">
                            <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-900">
                            Mi<span className="text-blue-600">Store</span>
                        </span>
                    </Link>

                    {/* Search - Desktop */}
                    <div className="hidden sm:block flex-1 max-w-lg mx-8">
                        <SearchFilter />
                    </div>

                    {/* Acciones */}
                    <div className="flex items-center gap-2 md:gap-4">

                        {/* BOTÓN DE FILTROS: Aparece solo cuando los filtros están ocultos */}
                        <AnimatePresence>
                            {!isFiltersVisible ? (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => { setIsFiltersVisible(true); setCloserFilters(true); }}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-1"
                                    title="Mostrar filtros"
                                >
                                    <AdjustmentsHorizontalIcon className="w-6 h-6" />
                                    <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Filtros</span>
                                </motion.button>
                            ) : closerFilters && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setIsFiltersVisible(false)}
                                    className="p-2 text-gray-600 hover:bg-blue-50 rounded-full transition-colors flex items-center gap-1"
                                    title="Ocultar filtros"
                                >
                                    <AdjustmentsHorizontalIcon className="w-6 h-6" />
                                    <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Filtros</span>
                                </motion.button>
                            )
                            }
                        </AnimatePresence>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {allStock() > 0 && (
                                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {allStock()}
                                </span>
                            )}
                        </Link>

                        {/* User Profile */}
                        <div className="relative">
                            {user ? (
                                <>
                                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center p-1">
                                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-8 h-8 rounded-full border border-gray-200" alt="user" />
                                    </button>
                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel de Filtros Flotante */}
            <AnimatePresence>
                {isFiltersVisible && (
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md shadow-md z-10 border-t border-gray-100"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                            <div className="flex flex-col md:flex-row gap-4">
                                <CategoryFilter className="w-full md:w-48" />
                                <OrderFilter className="w-full md:w-48" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};