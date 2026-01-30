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
} from "@heroicons/react/24/outline";

export const StoreHeader = () => {
    const navigate = useNavigate();
    const { allStock } = useCart();
    const { user, logOut } = useAuthContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Estado de visibilidad basado en posición fija
    const [isFiltersVisible, setIsFiltersVisible] = useState(true);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        // Punto de corte simple: si bajas de 80px, desaparecen
        if (latest > 80) {
            if (isFiltersVisible) setIsFiltersVisible(false);
        } else {
            if (!isFiltersVisible) setIsFiltersVisible(true);
        }
    });

    return (
        /* IMPORTANTE: El header tiene una altura fija total para que el scroll sea estable.
           h-20 (header) + py-4 (filtros) = aproximadamente h-40 o un margen manual abajo.
        */
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 h-20 mb-40 md:mb-25">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md relative z-20">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
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

                    {/* Cart & User */}
                    <div className="flex items-center gap-4">
                        <Link to="/cart" className="relative p-2 text-gray-600">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {allStock() > 0 && (
                                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                    {allStock()}
                                </span>
                            )}
                        </Link>
                        {user ? (
                            <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} className="w-8 h-8 rounded-full border" alt="user" />
                            </button>
                        ) : (
                            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg">Login</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* FILTROS EN POSICIÓN ABSOLUTA: 
                No ocupan espacio en el flujo del DOM (top-20 lo pone justo debajo del header).
            */}
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