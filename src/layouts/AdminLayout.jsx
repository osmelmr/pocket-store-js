import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(true);

    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const { user, logOut } = useAuthContext()

    const handleLogout = () => {
        logOut()
        setShowDropdown(false);
        navigate("/");
    };

    return (
        <div className={`min-h-screen bg-gray-100 `}>
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300`}>
                <div className="p-4 h-full flex flex-col">
                    <div className="flex items-center justify-around mb-8">
                        <h1 className="text-2xl font-bold ">Admin Store</h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-2xl hover:text-red-500 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <nav className="space-y-2 flex-1">
                        <Link
                            to="/admin"
                            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors w-full text-left">
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Dashboard
                        </Link>

                        <Link
                            to="products"
                            className="flex items-center p-3 rounded hover:bg-gray-700 transition-colors w-full text-left">
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            Productos
                        </Link>

                        <Link
                            to="/"
                            className="w-full flex items-center p-3 rounded hover:bg-gray-700 transition-colors text-left">
                            <svg
                                className="w-5 h-5 mr-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            Ver Tienda
                        </Link>
                    </nav>

                    {/* Botón de cerrar sesión en sidebar (opcional) */}
                    <div className="mt-auto">
                        {user && (
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full p-3 rounded hover:bg-gray-700 transition-colors"
                            >
                                <svg
                                    className="w-5 h-5 mr-3"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Cerrar Sesión
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${isOpen && "ml-64"} transition-all duration-300`}>
                {/* Top Bar */}
                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            {!isOpen && (
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="p-2 text-xl text-gray-800 rounded hover:bg-gray-100 transition-colors"
                                >
                                    ☰
                                </button>
                            )}
                            <h2 className="text-lg font-semibold text-gray-800 ml-4">
                                Panel de Administración
                            </h2>
                        </div>

                        {/* Área de usuario en el header */}
                        <div className="flex items-center space-x-4">
                            {user ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="flex items-center space-x-3 focus:outline-none"
                                    >
                                        <span className="text-gray-600 hidden md:block">
                                            Bienvenido, {user.name}
                                        </span>
                                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-colors">
                                            <img
                                                src="https://ui-avatars.com/api/?name=Admin&background=3B82F6&color=fff&bold=true&size=128"
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </button>

                                    {/* Dropdown de usuario */}
                                    {showDropdown && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setShowDropdown(false)}
                                            ></div>
                                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                </div>
                                                <Link
                                                    to="/admin/profile"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Mi Perfil
                                                </Link>
                                                <Link
                                                    to="/admin/settings"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    Configuración
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-100"
                                                >
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="w-4 h-4 mr-2"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                            />
                                                        </svg>
                                                        Cerrar Sesión
                                                    </div>
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Iniciar Sesión
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};