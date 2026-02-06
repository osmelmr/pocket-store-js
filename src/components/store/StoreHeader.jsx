/* eslint-disable no-unused-vars */
import { useCart } from "../../zustand/useCart";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuth";
import { SearchFilter } from "../SearchFilter";
import { useState, useRef, useEffect } from "react";
import { CategoryFilter } from "../CategoryFilter";
import { OrderFilter } from "../OrderFilter";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { HeaderFilters } from "./HeaderFilters";
import { useVisibleFilters } from "../../zustand/useVisibleFilers";
import { useTemeMode } from "../../zustand/useDarkMode";

import { IoToggle } from "react-icons/io5";

import {
    ShoppingBagIcon,
    ShoppingCartIcon,
    AdjustmentsHorizontalIcon, // Icono de filtros
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    SunIcon
} from "@heroicons/react/24/outline";
import { useSidebar } from "../../zustand/useSidebar";
import { TemeChange, TemeChange2 } from "../TemeChange";

export const StoreHeader = () => {
    const navigate = useNavigate();
    const { allStock } = useCart();
    const { user, logOut } = useAuthContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const isFiltersVisible = useVisibleFilters(state => state.isFiltersVisible);
    const showFilters = useVisibleFilters(state => state.showFilters);
    const hideFilters = useVisibleFilters(state => state.hideFilters);

    const profileRef = useRef(null);

    const isSidebarOpen = useSidebar(state => state.isSidebarOpen);
    const toggleSidebar = useSidebar(state => state.toggleSidebar);
    const [closerFilters, setCloserFilters] = useState(false);
    const [openFilters, setOpenFilters] = useState(false);
    const [isManuallyOpenedOnMobile, setIsManuallyOpenedOnMobile] = useState(false);

    const { toggleDarkMode } = useTemeMode();

    const { scrollY } = useScroll();

    useEffect(() => {
        // Resetear el estado cuando se abre el sidebar (móvil)
        if (!isSidebarOpen && closerFilters) {
            showFilters();
        }
        if ((!openFilters && !closerFilters) && !isSidebarOpen) {
            showFilters();
        }

    }, [isSidebarOpen]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        // No aplicar scroll automático si los filtros fueron abiertos manualmente en móvil
        if (isManuallyOpenedOnMobile) {
            if (latest < 80) {
                setIsManuallyOpenedOnMobile(prev => !prev)
                setCloserFilters(false)
            };
            return
        };

        // Solo escondemos automáticamente si el usuario baja de 80px
        // No forzamos "true" si el usuario lo cerró manualmente (opcional)
        if (latest > 80) {
            if (isFiltersVisible) {
                hideFilters();
                setOpenFilters(true);

            };
        } else {
            if (!isFiltersVisible) {
                showFilters();
                setOpenFilters(false);
            };
        }
        setCloserFilters(false);
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        if (!isProfileOpen) {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileOpen]);

    const handleLogout = () => {
        setIsProfileOpen(false);
        logOut();
        navigate("/login");
    };

    return (
        <header className={`sticky top-0 z-50 h-20 transition-all duration-300 
            ${!isFiltersVisible ? "shadow-sm" : ""} 
            bg-white/80 backdrop-blur-md dark:backdrop-blur-none 
            dark:bg-slate-900 dark:border-b dark:border-slate-800`}
        >


            <div className="flex justify-between items-center h-20 sm:px-6 lg:px-8 relative z-20">

                {/* Logo */}
                <div className="flex flex-none pl-2">
                    <Link to="/" className="flex flex-none items-center gap-2 group shrink-0">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg">
                            <ShoppingBagIcon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg text-gray-900 dark:text-white ">
                            Mi<span className="text-blue-600 ">Store</span>
                        </span>
                    </Link>
                </div>

                {/* Search - Desktop */}
                <div className="hidden sm:block flex-1 max-w-lg mx-8">
                    <SearchFilter />
                </div>

                {/* Acciones */}
                <div className="flex flex-none items-center gap-2 md:gap-4">

                    {/* Filtros Toggle */}
                    {(openFilters || closerFilters) && !isSidebarOpen && (
                        <div

                            onClick={() => {
                                if (openFilters) {
                                    showFilters(); setCloserFilters(true); setOpenFilters(false); setIsManuallyOpenedOnMobile(true);
                                } else {
                                    hideFilters(); setOpenFilters(true); setCloserFilters(false); setIsManuallyOpenedOnMobile(false);
                                }
                            }}
                            className={`p-2 rounded-full transition-colors flex items-center gap-1 ${openFilters
                                ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800"
                                : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800"
                                }`}
                        >
                            <AdjustmentsHorizontalIcon className="w-6 h-6" />
                            <span className="hidden md:block text-xs font-bold uppercase tracking-wider">Filtros</span>
                        </div>
                    )}

                    <button className=" flex rounded-full " onClick={toggleDarkMode}>
                        {/* <IoToggle className="dark:text-white text-2xl dark:rotate-180 text-slate-800 " /> */}
                        <TemeChange2 />
                    </button>

                    <Link to="/admin" className="hidden sm:block text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors ">
                        Admin
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all">
                        <ShoppingCartIcon className="w-6 h-6" />
                        {allStock() > 0 && (
                            <span className="absolute top-1 right-1 bg-red-600 dark:bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center dark:border-2 dark:border-slate-900">
                                {allStock()}
                            </span>
                        )}
                    </Link>

                    {/* User Profile */}
                    <div className="relative flex shrink-0" ref={profileRef}>
                        {user ? (
                            <>
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center p-1 outline-none">
                                    <img
                                        src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3B82F6&color=fff`}
                                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700"
                                        alt="user"
                                    />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl py-2 z-50 border border-gray-100 dark:border-slate-700">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                                        </div>

                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 border-t border-gray-100 dark:border-slate-700">
                                            <div className="flex items-center">
                                                <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
                                                Cerrar Sesión
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => { toggleSidebar(); setIsProfileOpen(false); hideFilters(); }}
                        className="sm:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

        </header>
    );
};