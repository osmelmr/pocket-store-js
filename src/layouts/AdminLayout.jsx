import { useState } from "react";
import { Outlet, Link } from "react-router";

export const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className={`min-h-screen bg-gray-100 `}>
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-4">
                    <div className="flex items-center justify-around mb-8">
                        <h1 className="text-2xl font-bold ">Admin Store</h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-2xl hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                    <nav className="space-y-2">
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

                    <div className="absolute bottom-4 left-0 right-0 p-4">
                        <button className="flex items-center w-full p-3 rounded hover:bg-gray-700 transition-colors">
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
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={`${isOpen && "ml-64"}`}>
                {/* Top Bar */}
                <header className="bg-white shadow-sm">
                    <div className="px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center">
                            {
                                !isOpen &&
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="top-4 left-4 z-50 p-2 text-xl text-gray-800 rounded"
                                >
                                    ☰
                                </button>
                            }
                            <h2 className="text-lg font-semibold text-gray-800">
                                Panel de Administración
                            </h2></div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">Bienvenido, Admin</span>
                            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                </header>

                {/* Page Content - Contenido de ejemplo */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};