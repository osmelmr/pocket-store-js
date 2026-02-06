/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router";
import { useAuthContext } from "../../hooks/useAuth";
import { SearchFilter } from "../SearchFilter";
import { useState, useRef, useEffect } from "react";

import {
    ShoppingBagIcon,

    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import { TemeChange2 } from "../TemeChange";
import { useTemeMode } from "../../zustand/useDarkMode";

export const AdminHeader = ({ isSidebarOpen, setIsSidebarOpen, isSidebarMobileOpen, setIsSidebarMobileOpen }) => {
    const navigate = useNavigate();
    const { user, logOut } = useAuthContext();
    const [isProfileOpen, setIsProfileOpen] = useState(false);



    const profileRef = useRef(null);


    const { toggleDarkMode } = useTemeMode();


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
        <header className='sticky top-0 z-50 h-20 transition-all duration-300 
                            bg-white/80 backdrop-blur-md dark:backdrop-blur-none 
                            dark:bg-slate-900 dark:border-b dark:border-slate-800'
        >

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex justify-between items-center h-20">


                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group shrink-0">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl shadow-lg">
                        <ShoppingBagIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                        Mi<span className="text-blue-600 ">Store</span>
                    </span>
                </Link>

                {/* Search - Desktop */}
                <div className="hidden sm:block flex-1 max-w-lg mx-8">
                    <SearchFilter />
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-2 md:gap-4">
                    <button className=" flex rounded-full " onClick={toggleDarkMode}>
                        {/* <IoToggle className="dark:text-white text-2xl dark:rotate-180 text-slate-800 " /> */}
                        <TemeChange2 />
                    </button>

                    <Link to="/admin" className=" text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors ">
                        Admin
                    </Link>
                    {/* User Profile */}
                    <div className="relative" ref={profileRef}>
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

                    {/* Sidebar Buttons */}
                    <button
                        onClick={() => { setIsSidebarOpen(!isSidebarOpen) }}
                        className=" hidden md:block p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        {isSidebarOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>

                    <button
                        onClick={() => { setIsSidebarMobileOpen(!isSidebarMobileOpen) }}
                        className=" md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                    >
                        {isSidebarMobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>

            </div>
        </header >
    );
};