import { useCart } from "../zustand/useCart";
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../hooks/useAuth";
import { SearchFilter } from "./SearchFilter";
import { useState } from "react";

// Importación corregida para Heroicons v2
import {

    ArrowLeftOnRectangleIcon,
    ShoppingBagIcon,
    Cog6ToothIcon,
    Bars3Icon,
    XMarkIcon,
    ShoppingCartIcon
} from "@heroicons/react/24/outline";



export const StoreHeader = () => {
    const navigate = useNavigate();
    const { allStock } = useCart();
    const { user, logOut } = useAuthContext();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        setIsProfileOpen(false);
        logOut();
        navigate("/login");
    };

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Area */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                                {/* Icono de tienda corregido */}
                                <ShoppingBagIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="hidden sm:block font-bold text-lg tracking-tight text-gray-900">
                                Mi<span className="text-blue-600">Store</span>
                            </span>
                        </Link>
                    </div>

                    {/* Search - Desktop */}
                    <div className=" flex-1 max-w-lg mx-8">
                        <SearchFilter />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-4">

                        <Link to="/admin" className="hidden sm:block text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors">
                            Admin
                        </Link>

                        {/* Cart */}
                        <Link to="/cart" className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all">

                            <ShoppingCartIcon className="w-6 h-6" />
                            {allStock() > 0 && (
                                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                                    {allStock()}
                                </span>
                            )}
                        </Link>

                        <div className="relative">
                            {user ? (
                                <>
                                    <button
                                        onClick={() => { setIsProfileOpen(!isProfileOpen); setIsMenuOpen(false); }}
                                        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-50 transition-all focus:outline-none"
                                    >
                                        <img
                                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3B82F6&color=fff`}
                                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                            alt="avatar"
                                        />
                                    </button>

                                    {isProfileOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsProfileOpen(false)}
                                            >
                                                Mi Perfil
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                                            >
                                                <div className="flex items-center">
                                                    <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-2" />
                                                    Cerrar Sesión
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link to="/login" className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                                    Login
                                </Link>
                            )}
                        </div>

                        <button
                            onClick={() => { setIsMenuOpen(!isMenuOpen); setIsProfileOpen(false); }}
                            className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mx-4 mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl md:hidden">
                    <div className="flex flex-col p-2 space-y-1">
                        <Link
                            to="/admin"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex items-center justify-end gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            <span className="font-medium">Panel Administración</span>
                            <Cog6ToothIcon className="w-5 h-5 text-gray-400" />
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};